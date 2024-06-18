import Node, { JsonNode } from "./node";

type TextNodeData = {
  text: string;
};

class TextNode extends Node<TextNodeData, Text> {
  constructor(text: string) {
    super({ text });
  }

  static getType(): string {
    return "text";
  }

  static fromJson(node: JsonNode<TextNodeData>): TextNode {
    return TextNode.create(node.data.text);
  }

  static fromHtml(node: Element): TextNode {
    return TextNode.create(node.childNodes[0].textContent || "");
  }

  static create(text: string): TextNode {
    return new TextNode(text);
  }

  toHtml() {
    return document.createTextNode(this.data.text);
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
