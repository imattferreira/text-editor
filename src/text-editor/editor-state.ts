import type { JsonNode } from "./nodes/node";
import Node from "./nodes/node";
import Tree from "./tree/tree";
import TreeNode from "./tree/tree-node";
import {
  extractEditorNodeTypeAttr,
  findEditorNodeFromType,
} from "./utils/node";
import { Maybe } from "./utils/types";

class EditorState {
  #tree: Tree;

  constructor() {
    this.#tree = Tree.create();
  }

  static create(): EditorState {
    return new EditorState();
  }

  toHtml(): HTMLCollection {
    return this.#tree.getRoot().toHtml();
  }

  toJson(): JsonNode[] {
    return this.#tree.getRoot().toJson();
  }

  toText(): string {
    return this.#tree.getRoot().toText();
  }

  insert(_node: Node): void {
    throw new Error("methods not implemented yet!");
  }

  insertAtPosition(_node: Node, _position: number): void {
    throw new Error("methods not implemented yet!");
  }

  fromHtml(html: Document) {
    const traverse = (htmlNode: Element): Maybe<Node> => {
      const editorNodeTypeAttr = extractEditorNodeTypeAttr(htmlNode);

      if (!editorNodeTypeAttr) {
        return null;
      }

      const EditorNode = findEditorNodeFromType(editorNodeTypeAttr);

      if (!EditorNode) {
        return null;
      }

      const transformed = EditorNode.fromHtml(htmlNode);

      for (const child of htmlNode.children) {
        const transformedChild = traverse(child);

        if (!transformedChild) {
          continue;
        }

        // TODO: change it
        transformed.setChild(transformedChild);
      }

      return transformed;
    };

    for (const htmlNode of html.body.children) {
      const child = traverse(htmlNode);

      if (!child) {
        continue;
      }

      this.#tree.getRoot().setChild(TreeNode.create(child));
    }
  }

  // TODO: rewrite it completely?
  _fromHtml(html: Element[]) {
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

  // TODO: rewrite it completely?
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

  cleanup() {
    this.#tree = Tree.create();
  }
}

export default EditorState;
