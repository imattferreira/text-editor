import Node from "../nodes/node";
import type { Maybe } from "../utils/types";
import TreeNodeChildren from "./tree-node-children";

class TreeNode {
  #node: Node;
  #parent: Maybe<TreeNode> = null;
  #children: TreeNodeChildren;

  constructor(node: Node, parentTreeNode: Maybe<TreeNode> = null) {
    this.#node = node;
    this.#parent = parentTreeNode;
    this.#children = new TreeNodeChildren();
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

  getChildren(): TreeNodeChildren {
    return this.#children;
  }
}

export default TreeNode;
