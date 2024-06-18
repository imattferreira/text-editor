import type { Maybe } from "../utils/types";
import TreeNode, { type ITreeNode } from "./tree-node";
import TreeRootNode from "./tree-root-node";

class Tree {
  #root: TreeRootNode;

  constructor() {
    this.#root = TreeRootNode.create();
  }

  static create(): Tree {
    return new Tree();
  }

  getRoot(): TreeRootNode {
    return this.#root;
  }

  append(node: TreeNode): void;

  append(node: TreeNode, parentKey: string): void;

  append(node: TreeNode, parentKey?: string): void {
    if (!parentKey) {
      this.#root.setChild(node);
      return;
    }

    const parent = this.#find(parentKey);

    if (!parent) {
      throw new Error("node not found from given `parentKey`");
    }

    parent.setChild(node);
  }

  #find(key: string): Maybe<ITreeNode> {
    if (key === this.#root.getKey()) {
      return this.#root;
    }

    let founded = false;
    let target = null;

    function traverse(currNode: ITreeNode) {
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

  [Symbol.iterator]() {
    const stack: ITreeNode[] = [this.#root];

    return {
      next() {
        if (stack.length === 0) {
          return { done: true };
        }

        const node = stack.pop();

        if (!node) {
          return { done: true };
        }

        for (const child of node.getChildren()) {
          stack.push(child);
        }

        return { value: node, done: false };
      },
    };
  }
}

export default Tree;
