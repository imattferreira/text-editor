import Node, { JsonNode } from "./node";

class BoldNode extends Node<{}, HTMLElement, JsonNode> {
  #nodes: Node[];

  constructor(children: Node[]) {
    super({});
    this.#nodes = children;
  }

  static getType(): string {
    return "bold";
  }

  static fromJson(_json: JsonNode): BoldNode {
    return BoldNode.create([]);
  }

  static fromHtml(_node: Element): BoldNode {
    return BoldNode.create([]);
  }

  static create(children: Node[]): BoldNode {
    return new BoldNode(children);
  }

  toHtml() {
    const el = document.createElement("b");

    for (const child of this.#nodes) {
      el.appendChild(child.toHtml() as Element);
    }

    el.setAttribute("data-node-type", BoldNode.getType());

    return el;
  }

  toJson() {
    const children = [];

    for (const child of this.#nodes) {
      children.push(child.toJson());
    }

    return {
      type: BoldNode.getType(),
      nodes: children,
      data: {},
    };
  }

  toText(): string {
    const texts = [];

    for (const child of this.#nodes) {
      texts.push(child.toText());
    }

    return texts.join("");
  }

  setChild(node: Node) {
    this.#nodes.push(node);
  }

  getChildren(): Node[] {
    return this.#nodes;
  }
}

export default BoldNode;
