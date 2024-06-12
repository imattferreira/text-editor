class EditorState {
  #root;

  // toHtml() {}
  // toJson() {}
  // toText() {}

  cleanup() {
    this.#root = null;
  }
}

export default EditorState;
