import Node, { JsonNode } from "./node";

type BoldNodeData = {
  text: string;
};

class BoldNode extends Node<BoldNodeData> {
  constructor(text: string) {
    super({ text });
  }

  static getType(): string {
    return "bold";
  }

  static fromJson(node: JsonNode<BoldNodeData>): BoldNode {
    return BoldNode.create(node.data.text);
  }

  static fromHtml(node: HTMLElement): BoldNode {
    return BoldNode.create(node.childNodes[0].textContent || "");
  }

  static create(text: string): BoldNode {
    return new BoldNode(text);
  }

  toHtml(): HTMLElement {
    const el = document.createElement("b");
    const text = document.createTextNode(this.data.text);

    el.appendChild(text);

    return el;
  }

  toJson(): JsonNode {
    return {
      type: BoldNode.getType(),
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

export default BoldNode;
