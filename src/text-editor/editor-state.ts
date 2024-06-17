import type { NodeRegister, JsonNode } from "./nodes/node";
import Tree from "./tree/tree";
import TreeNode from "./tree/tree-node";
import { Maybe } from "./utils/types";

class EditorState {
  #tree: Tree;
  // TODO: store only the active node (?!)
  #registeredNodes: NodeRegister[];

  constructor(registeredNodes: NodeRegister[]) {
    this.#tree = Tree.create();
    this.#registeredNodes = registeredNodes;
  }

  static create(registeredNodes: NodeRegister[]): EditorState {
    return new EditorState(registeredNodes);
  }

  toHtml(): Maybe<HTMLElement> {
    return this.#tree.getRoot()?.getNode().toHtml() || null;
  }

  toJson(): Maybe<JsonNode> {
    return this.#tree.getRoot()?.getNode().toJson() || null;
  }

  toText(): string {
    return this.#tree.getRoot()?.getNode().toText() || "";
  }

  insert(_node: Node): void {
    throw new Error("methods not implemented yet!");
  }

  insertAtPosition(_node: Node, _position: number): void {
    throw new Error("methods not implemented yet!");
  }

  fromHtml(html: Element[]) {
    const traverse = (htmlNode: Element, parentKey: string) => {
      const type = htmlNode.getAttribute("data-node-type");

      if (!type) {
        return;
      }

      const nodeType = this.#getNodeFromType(type);

      if (!nodeType) {
        return;
      }

      const transformed = nodeType.fromHtml(htmlNode);
      const treeNode = TreeNode.create(transformed);

      this.#tree.append(treeNode, parentKey);

      for (const child of htmlNode.children) {
        traverse(child, treeNode.getKey());
      }
    };

    for (const htmlNode of html) {
      traverse(htmlNode, this.#tree.getRoot().getKey());
    }
  }

  fromJson(json: JsonNode[]) {
    const traverse = (jsonNode: JsonNode, parentKey: string) => {
      const nodeType = this.#getNodeFromType(jsonNode.type);

      if (!nodeType) {
        return;
      }

      const transformed = nodeType.fromJson(jsonNode);
      const treeNode = TreeNode.create(transformed);

      this.#tree.append(treeNode, parentKey);

      for (const child of jsonNode.nodes) {
        traverse(child, treeNode.getKey());
      }
    };

    for (const jsonNode of json) {
      traverse(jsonNode, this.#tree.getRoot().getKey());
    }
  }

  #getNodeFromType(type: string): Maybe<NodeRegister> {
    return this.#registeredNodes.find((n) => n.getType() === type) || null;
  }

  cleanup() {
    this.#tree = Tree.create();
  }
}

export default EditorState;
