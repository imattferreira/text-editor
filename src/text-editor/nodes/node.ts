export interface JsonNode<T extends Record<string, unknown> = {}> {
  type: string;
  data: T;
  nodes: JsonNode[];
}

export type NodeRegister = typeof Node;

abstract class Node<
  T extends Record<string, unknown> = {},
  H = unknown,
  J = JsonNode
> {
  protected data: T;
  #key: string;

  constructor(data: T, key?: string) {
    this.#key = key || crypto.randomUUID();
    this.data = data;
  }

  static getType(): string {
    return "node";
  }

  static fromJson(_node: JsonNode<{}>): Node {
    throw new Error("[node] method `fromJson` should be override");
  }

  static fromHtml(_node: Element): Node {
    throw new Error("[node] method `fromHtml` should be override");
  }

  getKey(): string {
    return this.#key;
  }

  // getParent(): void;
  // setParent(): void;
  abstract setChild(node: Node): void;

  abstract getChildren(): Node[];

  abstract toHtml(): H;

  abstract toJson(): J;

  abstract toText(): string;
}

export default Node;
