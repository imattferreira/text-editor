import Node, { JsonNode } from "./node";

type ItalicNodeData = {
  text: string;
};

class ItalicNode extends Node<ItalicNodeData> {
  constructor(text: string) {
    super({ text });
  }

  static getType(): string {
    return "italic";
  }

  static fromJson(node: JsonNode<ItalicNodeData>): ItalicNode {
    return ItalicNode.create(node.data.text);
  }

  static fromHtml(node: HTMLElement): ItalicNode {
    return ItalicNode.create(node.childNodes[0].textContent || "");
  }

  static create(text: string): ItalicNode {
    return new ItalicNode(text);
  }

  toHtml(): HTMLElement {
    const el = document.createElement("b");
    const text = document.createTextNode(this.data.text);

    el.setAttribute("data-node-type", ItalicNode.getType());
    el.appendChild(text);

    return el;
  }

  toJson(): JsonNode {
    return {
      type: ItalicNode.getType(),
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

export default ItalicNode;
