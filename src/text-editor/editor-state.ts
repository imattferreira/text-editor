import type { NodeRegister, JsonNode } from "./nodes/node";
import Tree from "./tree/tree";
import { Maybe } from "./utils/types";

class EditorState {
  #tree: Tree;
  // TODO: store only the active node (?!)
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

  insert(_node: Node): void {
    throw new Error("methods not implemented yet!");
  }

  insertAtPosition(_node: Node, _position: number): void {
    throw new Error("methods not implemented yet!");
  }

  fromHtml() {}

  fromJson() {}

  cleanup() {
    this.#tree = Tree.create();
  }
}

export default EditorState;
