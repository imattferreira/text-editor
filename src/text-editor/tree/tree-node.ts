import Node from "../nodes/node";
import type { Maybe } from "../utils/types";

class TreeNode {
  #node: Node;
  #parent: Maybe<TreeNode> = null;
  #children: TreeNode[] = [];

  constructor(node: Node, parentTreeNode: Maybe<TreeNode> = null) {
    this.#node = node;
    this.#parent = parentTreeNode;
  }

  static create(node: Node, parentTreeNode: Maybe<TreeNode> = null) {
    return new TreeNode(node, parentTreeNode);
  }

  getNode(): Node {
    return this.#node;
  }

  getParent(): Maybe<TreeNode> {
    return this.#parent;
  }

  setParent(parentNode: TreeNode): void {
    this.#parent = parentNode;
  }

  getChildren(): TreeNode[] {
    return this.#children;
  }
}

export default TreeNode;
