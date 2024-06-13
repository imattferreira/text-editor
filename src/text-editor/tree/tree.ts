import TextNode from "../nodes/text-node";
import type { Maybe } from "../utils/types";
import TreeNode from "./tree-node";

class Tree {
  #root: Maybe<TreeNode>;

  constructor() {
    this.#root = null;
  }

  static create(): Tree {
    return new Tree();
  }

  getRoot(): Maybe<TreeNode> {
    return this.#root;
  }

  append(node: TreeNode): void;

  append(node: TreeNode, parentKey: string): void;

  append(node: TreeNode, parentKey?: string): void {
    if (!this.#root) {
      this.#root = node;
      return;
    }

    if (!parentKey) {
      throw new Error("`parentKey` should be provided");
    }

    const parent = this.#find(parentKey);

    if (!parent) {
      throw new Error("node not found from given `parentKey`");
    }

    parent.setChild(node);
  }

  #find(key: string): Maybe<TreeNode> {
    if (!this.#root) {
      return null;
    }

    if (this.#root.getKey() === key) {
      return this.#root;
    }

    let founded = false;
    let target = null;

    function traverse(currNode: TreeNode) {
      for (const child of currNode.getChildren()) {
        if (founded) {
          break;
        }

        if (child.getKey() === key) {
          target = child;
          founded = true;
          break;
        }

        traverse(child);
      }
    }

    traverse(this.#root);

    return target;
  }

  // TODO: finish iterator implementation
  [Symbol.iterator]() {
    return {
      next: () => ({
        value: TreeNode.create(TextNode.create("")),
        done: false,
      }),
    };
  }
}

export default Tree;
