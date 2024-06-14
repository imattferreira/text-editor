import Cursor from "./cursor";

class Input {
  #element: HTMLDivElement;
  #cursor: Cursor;

  constructor(placeholder: string) {
    this.#element = this.#createElement(placeholder);
    this.#cursor = Cursor.create(this.#element);
  }

  static create(placeholder: string): Input {
    return new Input(placeholder);
  }

  #createElement(placeholder: string): HTMLDivElement {
    const el = document.createElement("div");

    el.setAttribute("data-text-editor", "true");
    el.setAttribute("contenteditable", "true");
    el.innerText = placeholder;

    el.addEventListener("focus", () => {
      if (el.innerHTML.trim() === placeholder) {
        el.innerText = "";
      }
    });

    el.addEventListener("blur", () => {
      if (el.innerText.trim().length === 0) {
        el.innerText = placeholder;
      }
    });

    el.addEventListener("keydown", (event) => {
      event.preventDefault();

      const { key } = event;

      // For new, don't allow special keys
      if (key.length > 1) {
        return;
      }

      el.innerText += key;
      this.#cursor.setPosition(el.innerText.length);
    });

    return el;
  }

  getElement(): HTMLElement {
    return this.#element;
  }
}

export default Input;
