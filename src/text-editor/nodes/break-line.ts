import Node, { JsonNode } from "./node";

class BreakLineNode extends Node {
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
    return document.createElement("br");
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
}

export default BreakLineNode;
