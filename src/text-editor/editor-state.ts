class EditorState {
  #root;

  // toHtml() {}
  // toJson() {}
  // toText() {}

  // fromHtml() {}
  // fromJson() {}

  cleanup() {
    this.#root = null;
  }
}

export default EditorState;
