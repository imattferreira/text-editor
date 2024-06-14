import Node, { JsonNode } from "./node";

class ParagraphNode extends Node {
  #nodes: Node[];

  constructor() {
    super({});
    this.#nodes = [];
  }

  static getType(): string {
    return "paragraph";
  }

  static fromJson(_node: JsonNode): Node {
    return new ParagraphNode();
  }

  static fromHtml(_node: HTMLElement): Node {
    return new ParagraphNode();
  }

  static create() {
    return new ParagraphNode();
  }

  toHtml(): HTMLElement {
    const el = document.createElement("p");

    for (const node of this.#nodes) {
      el.appendChild(node.toHtml());
    }

    return el;
  }

  toJson(): JsonNode {
    const nodes = [];

    for (const node of this.#nodes) {
      nodes.push(node.toJson());
    }

    return {
      type: ParagraphNode.getType(),
      nodes,
      data: {},
    };
  }

  toText(): string {
    let result = [];

    for (const node of this.#nodes) {
      result.push(node.toText());
    }

    return result.join("");
  }
}

export default ParagraphNode;