class Cursor {
  #el: HTMLDivElement;

  constructor(el: HTMLDivElement) {
    this.#el = el;
  }

  static create(el: HTMLDivElement): Cursor {
    return new Cursor(el);
  }

  setPosition(position: number): void {
    const range = document.createRange();
    const { childNodes } = this.#el;

    let remainingChars = position;

    for (const node of childNodes) {
      if (this.#isText(node)) {
        if (node.length < remainingChars) {
          remainingChars -= node.length;
          continue;
        }

        range.setStart(node, remainingChars);
        range.setEnd(node, remainingChars);
        break;
      }

      if (node.childNodes.length > 0) {
        remainingChars -= node.textContent?.length || 0;
        continue;
      }

      range.setStart(node, 0);
      range.setEnd(node, 0);
    }

    this.#applyCaretPosition(range);
  }

  #isText(node: ChildNode): node is Text {
    return node.nodeType === Node.TEXT_NODE;
  }

  #applyCaretPosition(range: Range) {
    const selection = window.getSelection();

    if (!selection) {
      return;
    }

    selection.removeAllRanges();
    selection.addRange(range);
  }
}

export default Cursor;
