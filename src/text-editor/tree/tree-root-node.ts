import type { JsonNode } from "../nodes/node";
import type { Maybe } from "../utils/types";
import TreeNode, { type ITreeNode } from "./tree-node";
import TreeNodeChildren from "./tree-node-children";

class TreeRootNode implements ITreeNode {
  #key;
  #children: TreeNodeChildren;

  constructor() {
    this.#key = "root";
    this.#children = TreeNodeChildren.create();
  }

  static create(): TreeRootNode {
    return new TreeRootNode();
  }

  getKey(): string {
    return this.#key;
  }

  getParent(): Maybe<TreeNode> {
    return null;
  }

  setParent(_parentNode: TreeNode): void {
    throw new Error("root cannot have a parent node");
  }

  getChildren(): TreeNodeChildren {
    return this.#children;
  }

  setChild(node: TreeNode): void {
    this.#children.enqueue(node);
  }

  toHtml(): HTMLCollection {
    const dom = new Document();

    for (const child of this.#children) {
      const html = child.getNode().toHtml();

      dom.body.appendChild(html);
    }

    return dom.body.children;
  }

  toJson(): JsonNode[] {
    const result = [];

    for (const child of this.#children) {
      const json = child.getNode().toJson();

      result.push(json);
    }

    return result;
  }

  toText(): string {
    const plainHtml = [];

    for (const child of this.#children) {
      const html = child.getNode().toText();

      plainHtml.push(html);
    }

    return plainHtml.join("");
  }
}

export default TreeRootNode;
