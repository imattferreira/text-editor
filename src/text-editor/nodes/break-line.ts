import Node, { JsonNode } from "./node";

class BreakLineNode extends Node<{}, HTMLElement, JsonNode> {
  constructor() {
    super({});
  }

  static getType(): string {
    return "break-line";
  }

  static fromJson(): BreakLineNode {
    return BreakLineNode.create();
  }

  static fromHtml(): BreakLineNode {
    return BreakLineNode.create();
  }

  static create(): BreakLineNode {
    return new BreakLineNode();
  }

  toHtml(): HTMLElement {
    const el = document.createElement("br");

    el.setAttribute("data-node-type", BreakLineNode.getType());

    return el;
  }

  toJson(): JsonNode {
    return {
      type: BreakLineNode.getType(),
      nodes: [],
      data: {},
    };
  }

  toText(): string {
    return "\n";
  }

  setChild(_node: Node) {}

  getChildren(): Node[] {
    return [];
  }
}

export default BreakLineNode;
