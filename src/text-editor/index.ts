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
import Node from "./nodes/node";

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
    // TODO: verify if all nodes are correct and send it to editor-state
    register: Pick<Config, "register">["register"]
  ) {
    for (const node of register.nodes) {
      if (!this.#isNodeValid(node)) {
        throw new Error("was registered a invalid node");
      }
    }

    this.#state = new EditorState(register.nodes as (typeof Node)[]);
    this.#input = new Input(placeholder);
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
}

export default TextEditor;
