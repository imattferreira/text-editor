import {
  extractEditorNodeTypeAttr,
  findEditorNodeFromType,
} from "../utils/node";
import Node, { JsonNode } from "./node";

class BoldNode extends Node {
  #nodes: Node[];

  constructor(children: Node[]) {
    super({});
    this.#nodes = children;
  }

  static getType(): string {
    return "bold";
  }

  static fromJson(json: JsonNode): BoldNode {
    const children = [];

    for (const child of json.nodes) {
      const EditorNode = findEditorNodeFromType(child.type);

      if (!EditorNode) {
        continue;
      }

      children.push(EditorNode.fromJson(child as any));
    }

    return BoldNode.create(children);
  }

  static fromHtml(node: Element): BoldNode {
    const children = [];

    for (const child of node.children) {
      const editorNodeTypeAttr = extractEditorNodeTypeAttr(child);

      if (!editorNodeTypeAttr) {
        continue;
      }

      const EditorNode = findEditorNodeFromType(editorNodeTypeAttr);

      if (!EditorNode) {
        continue;
      }

      children.push(EditorNode.fromHtml(child));
    }

    return BoldNode.create(children);
  }

  static create(children: Node[]): BoldNode {
    return new BoldNode(children);
  }

  toHtml(): HTMLElement {
    const el = document.createElement("b");

    for (const child of this.#nodes) {
      el.appendChild(child.toHtml() as Element);
    }

    el.setAttribute("data-node-type", BoldNode.getType());

    return el;
  }

  toJson(): JsonNode {
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
}

export default BoldNode;
