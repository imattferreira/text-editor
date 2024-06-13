import Node from "../nodes/node";

class TreeNode {
  #node: Node;

  constructor(node: Node) {
    this.#node = node;
  }

  static create(node: Node) {
    return new TreeNode(node);
  }

  getNode(): Node {
    return this.#node;
  }
}

export default TreeNode;
