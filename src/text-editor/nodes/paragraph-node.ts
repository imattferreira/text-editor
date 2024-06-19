import Node, { JsonNode } from "./node";

class ParagraphNode extends Node<{}, HTMLElement, JsonNode> {
  #nodes: Node[];

  constructor(children: Node[]) {
    super({});
    this.#nodes = children;
  }

  static getType(): string {
    return "paragraph";
  }

  static fromJson(_json: JsonNode): Node {
    return ParagraphNode.create([]);
  }

  static fromHtml(_node: Element): Node {
    return ParagraphNode.create([]);
  }

  static create(children: Node[]) {
    return new ParagraphNode(children);
  }

  toHtml(): HTMLElement {
    const el = document.createElement("p");

    for (const child of this.#nodes) {
      el.appendChild(child.toHtml() as Element);
    }

    el.setAttribute("data-node-type", ParagraphNode.getType());

    return el;
  }

  toJson(): JsonNode {
    const children = [];

    for (const node of this.#nodes) {
      children.push(node.toJson());
    }

    return {
      type: ParagraphNode.getType(),
      nodes: children,
      data: {},
    };
  }

  toText(): string {
    let result = [];

    for (const child of this.#nodes) {
      result.push(child.toText());
    }

    return result.join("");
  }

  setChild(node: Node) {
    this.#nodes.push(node);
  }

  getChildren(): Node[] {
    return this.#nodes;
  }
}

export default ParagraphNode;
