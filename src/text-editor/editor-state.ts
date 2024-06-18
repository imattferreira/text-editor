import Node, { type JsonNode } from "./nodes/node";
import Tree from "./tree";
import {
  extractEditorNodeTypeAttr,
  findEditorNodeFromType,
} from "./utils/node";
import { Maybe } from "./utils/types";

class EditorState {
  #tree: Tree;

  constructor() {
    this.#tree = Tree.create();
  }

  static create(): EditorState {
    return new EditorState();
  }

  toHtml(): HTMLCollection {
    return this.#tree.getRoot().toHtml();
  }

  toJson(): JsonNode[] {
    return this.#tree.getRoot().toJson();
  }

  toText(): string {
    return this.#tree.getRoot().toText();
  }

  insert(_node: Node): void {
    throw new Error("methods not implemented yet!");
  }

  insertAtPosition(_node: Node, _position: number): void {
    throw new Error("methods not implemented yet!");
  }

  fromHtml(html: Document) {
    const traverse = (htmlNode: Element): Maybe<Node> => {
      const editorNodeTypeAttr = extractEditorNodeTypeAttr(htmlNode);

      if (!editorNodeTypeAttr) {
        return null;
      }

      const EditorNode = findEditorNodeFromType(editorNodeTypeAttr);

      if (!EditorNode) {
        return null;
      }

      const transformed = EditorNode.fromHtml(htmlNode);

      for (const child of htmlNode.children) {
        const transformedChild = traverse(child);

        if (!transformedChild) {
          continue;
        }

        // TODO: change it
        transformed.setChild(transformedChild);
      }

      return transformed;
    };

    for (const htmlNode of html.body.children) {
      const child = traverse(htmlNode);

      if (!child) {
        continue;
      }

      this.#tree.getRoot().setChild(child);
    }
  }

  fromJson(json: JsonNode[]) {
    const traverse = (jsonNode: JsonNode): Maybe<Node> => {
      const EditorNode = findEditorNodeFromType(jsonNode.type);

      if (!EditorNode) {
        return null;
      }

      const transformed = EditorNode.fromHtml(jsonNode as any);

      for (const child of jsonNode.nodes) {
        const transformedChild = traverse(child);

        if (!transformedChild) {
          continue;
        }

        transformed.setChild(transformedChild);
      }

      return transformed;
    };

    for (const node of json) {
      const child = traverse(node);

      if (!child) {
        continue;
      }

      this.#tree.getRoot().setChild(child);
    }
  }

  cleanup() {
    this.#tree = Tree.create();
  }
}

export default EditorState;
