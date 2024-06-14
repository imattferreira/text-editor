import Node, { JsonNode } from "./node";

type TextNodeData = {
  text: string;
};

class TextNode extends Node<TextNodeData> {
  constructor(text: string) {
    super({ text });
  }

  static getType(): string {
    return "text";
  }

  static fromJson(node: JsonNode<TextNodeData>): TextNode {
    return TextNode.create(node.data.text);
  }

  static fromHtml(node: HTMLElement): TextNode {
    return TextNode.create(node.childNodes[0].textContent || "");
  }

  static create(text: string): TextNode {
    return new TextNode(text);
  }

  toHtml(): HTMLElement {
    const el = document.createElement("span");
    const text = document.createTextNode(this.data.text);

    el.appendChild(text);

    return el;
  }

  toJson(): JsonNode {
    return {
      type: TextNode.getType(),
      nodes: [],
      data: {
        text: this.data.text,
      },
    };
  }

  toText(): string {
    return this.data.text;
  }
}

export default TextNode;
