import Node, { JsonNode } from "./node";
import TextNode from "./text-node";

class BoldNode extends Node {
  constructor(children: TextNode[]) {
    super({});
  }

  static getType(): string {
    return "bold";
  }

  static fromJson(children: TextNode[]): BoldNode {
    return BoldNode.create(children);
  }

  static fromHtml(node: Element): BoldNode {
    return BoldNode.create(node.childNodes[0].textContent || "");
  }

  static create(children: TextNode[]): BoldNode {
    return new BoldNode(children);
  }

  toHtml(): HTMLElement {
    const el = document.createElement("b");
    const text = document.createTextNode(this.data.text);

    el.setAttribute("data-node-type", BoldNode.getType());
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
