import Node from "../nodes/node";
import type { Maybe } from "../utils/types";
import TreeNodeChildren from "./tree-node-children";

class TreeNode {
  #key;
  #node: Node;
  #parent: Maybe<TreeNode>;
  #children: TreeNodeChildren;

  constructor(key: string, node: Node, parentTreeNode: Maybe<TreeNode> = null) {
    this.#key = key;
    this.#node = node;
    this.#parent = parentTreeNode;
    this.#children = TreeNodeChildren.create();
  }

  static create(node: Node): TreeNode;

  static create(node: Node, parentTreeNode: TreeNode): TreeNode;

  static create(node: Node, parentTreeNode?: TreeNode): TreeNode {
    return new TreeNode(crypto.randomUUID(), node, parentTreeNode ?? null);
  }

  getKey(): string {
    return this.#key;
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

  setChild(node: TreeNode): void {
    this.#children.enqueue(node);
  }
}

export default TreeNode;
