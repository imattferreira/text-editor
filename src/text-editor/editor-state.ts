import Node from "./nodes/node";
import Tree from "./tree/tree";

class EditorState {
  #tree: Tree;
  #nodes: (typeof Node)[];

  constructor(nodes: (typeof Node)[]) {
    this.#tree = Tree.create();
    this.#nodes = nodes;
  }

  toHtml() {}

  toJson() {}

  // TODO: confirm if is correct
  toText(): string {
    const result: string[] = [];

    for (const treeNode of this.#tree) {
      const text = treeNode.getNode().toText();

      result.push(text);
    }

    return result.join(" ");
  }

  fromHtml() {}

  fromJson() {}

  cleanup() {
    this.#tree = Tree.create();
  }
}

export default EditorState;
