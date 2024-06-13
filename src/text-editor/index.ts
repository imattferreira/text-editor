import EditorState from "./editor-state";
import Input from "./input";

interface Config {
  rootEl: () => HTMLElement;
  placeholder: string;
}

class TextEditor {
  #state: EditorState;
  #rootEl: HTMLElement;
  #input: Input;

  constructor(rootEl: HTMLElement, placeholder: string) {
    this.#state = new EditorState();
    this.#input = new Input(placeholder);
    this.#rootEl = rootEl;
  }

  static create({ placeholder, rootEl }: Config) {
    return new TextEditor(rootEl(), placeholder);
  }

  getState(): EditorState {
    return this.#state;
  }

  render(): void {
    this.#rootEl.appendChild(this.#input.getElement());
  }
}

export default TextEditor;
