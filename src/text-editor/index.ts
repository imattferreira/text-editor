import EditorState from "./editor-state";
import Input from "./input";
import type { JsonNode } from "./nodes/node";

interface Config {
  rootEl: () => HTMLElement;
  placeholder: string;
}

class TextEditor {
  #state: EditorState;
  #rootEl: HTMLElement;
  #input: Input;

  constructor(rootEl: HTMLElement, placeholder: string) {
    this.#state = EditorState.create();
    this.#input = Input.create(placeholder);
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

  fromHtml(html: Document): void {
    this.#state.fromHtml(html);
    this.#input.sync(this.#state.toHtml());
  }

  fromJson(json: JsonNode[]): void {
    this.#state.fromJson(json);
    this.#input.sync(this.#state.toHtml());
  }

  onBlur(callback: () => void): void {
    this.#input.getElement().addEventListener("blur", callback);
  }

  onFocus(callback: () => void): void {
    this.#input.getElement().addEventListener("focus", callback);
  }
}

export default TextEditor;
