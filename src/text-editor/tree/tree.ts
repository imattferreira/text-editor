import TextNode from "../nodes/text-node";
import TreeNode from "./tree-node";

class Tree {
  #root: TreeNode | null;

  constructor() {
    this.#root = null;
  }

  getRoot() {
    return this.#root;
  }

  append() {}

  delete() {}

  current() {}

  // TODO: finish iterator implementation
  [Symbol.iterator]() {
    return {
      next: () => ({
        value: new TreeNode(TextNode.create("")),
        done: false,
      }),
    };
  }
}

export default Tree;
