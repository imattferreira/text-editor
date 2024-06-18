import Node from "./nodes/node";
import RootNode from "./nodes/root-node";
import type { Maybe } from "./utils/types";

class Tree {
  #root: RootNode;

  constructor() {
    this.#root = RootNode.create();
  }

  static create(): Tree {
    return new Tree();
  }

  getRoot(): RootNode {
    return this.#root;
  }

  append(node: Node): void;

  append(node: Node, parentKey: string): void;

  append(node: Node, parentKey?: string): void {
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

  #find(key: string): Maybe<Node | RootNode> {
    if (key === this.#root.getKey()) {
      return this.#root;
    }

    let founded = false;
    let target = null;

    function traverse(currNode: Node | RootNode) {
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
    const stack: (Node | RootNode)[] = [this.#root];

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
