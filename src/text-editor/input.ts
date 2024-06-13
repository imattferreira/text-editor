class Input {
  #element: HTMLDivElement;

  constructor(placeholder: string) {
    this.#element = this.#createElement(placeholder);
  }

  #createElement(placeholder: string): HTMLDivElement {
    const el = document.createElement("div");

    el.setAttribute("data-text-editor", "true");
    el.setAttribute("contenteditable", "true");
    el.innerHTML = placeholder;

    el.addEventListener("focus", () => {
      if (el.innerHTML.trim() === placeholder) {
        el.innerHTML = "";
      }
    });

    el.addEventListener("blur", () => {
      if (el.innerHTML.trim().length === 0) {
        el.innerHTML = placeholder;
      }
    });

    return el;
  }

  getElement(): HTMLElement {
    return this.#element;
  }
}

export default Input;
