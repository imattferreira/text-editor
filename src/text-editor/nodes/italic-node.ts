import {
  extractEditorNodeTypeAttr,
  findEditorNodeFromType,
} from "../utils/node";
import Node, { JsonNode } from "./node";

class ItalicNode extends Node {
  #nodes: Node[];

  constructor(children: Node[]) {
    super({});
    this.#nodes = children;
  }

  static getType(): string {
    return "italic";
  }

  static fromJson(json: JsonNode): ItalicNode {
    const children = [];

    for (const child of json.nodes) {
      const EditorNode = findEditorNodeFromType(child.type);

      if (!EditorNode) {
        continue;
      }

      children.push(EditorNode.fromJson(child as any));
    }

    return ItalicNode.create(children);
  }

  static fromHtml(node: Element): ItalicNode {
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

    return ItalicNode.create(children);
  }

  static create(children: Node[]): ItalicNode {
    return new ItalicNode(children);
  }

  toHtml(): HTMLElement {
    const el = document.createElement("b");

    for (const child of this.#nodes) {
      el.appendChild(child.toHtml() as Element);
    }

    el.setAttribute("data-node-type", ItalicNode.getType());

    return el;
  }

  toJson(): JsonNode {
    const children = [];

    for (const child of this.#nodes) {
      children.push(child.toJson());
    }

    return {
      type: ItalicNode.getType(),
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

export default ItalicNode;
