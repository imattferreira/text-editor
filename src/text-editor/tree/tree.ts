import TextNode from "../nodes/text-node";
import type { Maybe } from "../utils/types";
import TreeNode from "./tree-node";

class Tree {
  #root: Maybe<TreeNode>;

  constructor() {
    this.#root = null;
  }

  getRoot(): Maybe<TreeNode> {
    return this.#root;
  }

  append(node: TreeNode): void {}

  delete(node: TreeNode): void {}

  getTail(): Maybe<TreeNode> {
    return null;
  }

  // TODO: finish iterator implementation
  [Symbol.iterator]() {
    return {
      next: () => ({
        value: new TreeNode(TextNode.create(""), null),
        done: false,
      }),
    };
  }
}

export default Tree;
