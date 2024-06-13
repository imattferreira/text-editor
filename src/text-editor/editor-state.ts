import Tree from "./tree/tree";

class EditorState {
  #tree: Tree;

  constructor() {
    this.#tree = new Tree();
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
    this.#tree = new Tree();
  }
}

export default EditorState;
