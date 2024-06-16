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

  fromHtml(html: HTMLElement) {
    const type = html.getAttribute("data-node-type");

    if (!type) {
      return;
    }

    const nodeType = this.#getNodeFromType(type);

    if (!nodeType) {
      return;
    }

    const transformed = nodeType.fromHtml(html);
    const treeNode = TreeNode.create(transformed);

    // TODO: how I can iterate over children to store and sync the tree?
    this.#tree.append(treeNode);
  }

  fromJson(json: JsonNode) {
    const nodeType = this.#getNodeFromType(json.type);

    if (!nodeType) {
      return;
    }

    const transformed = nodeType.fromJson(json);
    const treeNode = TreeNode.create(transformed);

    // TODO: how I can iterate over children to store and sync the tree?
    this.#tree.append(treeNode);
  }

  #getNodeFromType(type: string): Maybe<NodeRegister> {
    return this.#registeredNodes.find((n) => n.getType() === type) || null;
  }

  cleanup() {
    this.#tree = Tree.create();
  }
}

export default EditorState;
