import type { NodeRegister, JsonNode } from "./nodes/node";
import Tree from "./tree/tree";
import { Maybe } from "./utils/types";

class EditorState {
  #tree: Tree;
  #registeredNodes: NodeRegister[];

  constructor(registeredNodes: NodeRegister[]) {
    this.#tree = Tree.create();
    this.#registeredNodes = registeredNodes;
  }

  static create(registeredNodes: NodeRegister[]): EditorState {
    return new EditorState(registeredNodes);
  }

  toHtml(): Maybe<HTMLElement> {
    return this.#tree.getRoot()?.getNode().toHtml() || null;
  }

  toJson(): Maybe<JsonNode> {
    return this.#tree.getRoot()?.getNode().toJson() || null;
  }

  toText(): string {
    return this.#tree.getRoot()?.getNode().toText() || "";
  }

  fromHtml() {}

  fromJson() {}

  cleanup() {
    this.#tree = Tree.create();
  }
}

export default EditorState;
