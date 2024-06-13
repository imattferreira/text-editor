import { Maybe } from "../utils/types";
import TreeNode from "./tree-node";

class TreeNodeChildren {
  #items: TreeNode[];

  constructor() {
    this.#items = [];
  }

  enqueue(node: TreeNode): void {
    this.#items.push(node);
  }

  dequeue(): Maybe<TreeNode> {
    return this.#items.shift() || null;
  }

  [Symbol.iterator]() {
    let i = 0;

    return {
      next: () => {
        const item = this.#items[i];
        i++;

        return {
          value: item,
          done: !item,
        };
      },
    };
  }
}

export default TreeNodeChildren;
