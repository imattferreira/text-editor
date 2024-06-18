import Node, { JsonNode } from "./node";

class RootNode extends Node<{}, HTMLCollection, JsonNode[]> {
  #nodes: Node[];

  constructor() {
    super({}, "root");
    this.#nodes = [];
  }

  static create(): RootNode {
    return new RootNode();
  }

  toHtml() {
    const dom = new Document();

    for (const child of this.#nodes) {
      const html = child.toHtml() as Element;

      dom.body.appendChild(html);
    }

    return dom.body.children;
  }

  toJson() {
    const result = [];

    for (const child of this.#nodes) {
      const json = child.toJson();

      result.push(json);
    }

    return result;
  }

  toText(): string {
    const plainHtml = [];

    for (const child of this.#nodes) {
      const html = child.toText();

      plainHtml.push(html);
    }

    return plainHtml.join("");
  }

  setChild(node: Node) {
    this.#nodes.push(node);
  }

  getChildren(): Node<{}, unknown, JsonNode<{}>>[] {
    return this.#nodes;
  }
}

export default RootNode;
