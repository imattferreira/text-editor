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

    // el.addEventListener("click", this.#onClick);

    return el;
  }

  // #addEventListener<K extends keyof HTMLElementEventMap>(
  //   event: K,
  //   listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => void
  // ): void {
  //   this.#element.addEventListener(event, listener);
  // }

  // #onClick() {
  //   console.log("clicked");
  // }

  getElement(): HTMLElement {
    return this.#element;
  }
}

export default Input;
