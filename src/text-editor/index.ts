import EditorState from "./editor-state";

class TextEditor {
  #state: EditorState;
  #rootEl: HTMLElement;
  #inputEl: HTMLDivElement;

  constructor() {
    this.#state = new EditorState();
  }

  static create() {
    return new TextEditor();
  }

  setRootElement(rootEl: HTMLElement) {
    this.#rootEl = rootEl;
  }

  // setPlaceholder() {}

  getState() {
    return this.#state;
  }

  render() {
    const inputEl = document.createElement("div");

    inputEl.setAttribute("data-text-editor", "true");

    this.#inputEl = inputEl;
    this.#rootEl.appendChild(inputEl);
  }
}

export default TextEditor;
