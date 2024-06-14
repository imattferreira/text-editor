/**
 * TODO:
 * - create tree structure
 * - create cursor (selection)
 * - handle with internal errors
 * - nodes (bold, italic, img, video)
 * - listeners (focus, click, blur)
 */
import EditorState from "./editor-state";
import Input from "./input";
import type { NodeRegister } from "./nodes/node";

interface Config {
  rootEl: () => HTMLElement;
  placeholder: string;
  register: {
    nodes: unknown[];
  };
}

class TextEditor {
  #state: EditorState;
  #rootEl: HTMLElement;
  #input: Input;

  constructor(
    rootEl: HTMLElement,
    placeholder: string,
    register: Pick<Config, "register">["register"]
  ) {
    for (const node of register.nodes) {
      if (!this.#isNodeValid(node)) {
        throw new Error("was registered a invalid node");
      }
    }

    this.#state = EditorState.create(register.nodes as NodeRegister[]);
    this.#input = Input.create(placeholder);
    this.#rootEl = rootEl;
  }

  static create({ placeholder, rootEl, register }: Config) {
    return new TextEditor(rootEl(), placeholder, register);
  }

  #isNodeValid(node: unknown): boolean {
    const props = ["getType", "fromJson", "fromHtml"];

    for (const prop of props) {
      if (prop in (node as object)) {
        continue;
      }

      return false;
    }

    return true;
  }

  getState(): EditorState {
    return this.#state;
  }

  render(): void {
    this.#rootEl.appendChild(this.#input.getElement());
  }

  onBlur(callback: () => void): void {
    this.#input.getElement().addEventListener("blur", callback);
  }

  onFocus(callback: () => void): void {
    this.#input.getElement().addEventListener("focus", callback);
  }
}

export default TextEditor;
