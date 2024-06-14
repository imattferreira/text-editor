export interface JsonNode<T extends Record<string, unknown> = {}> {
  type: string;
  data: T;
  nodes: JsonNode[];
}

export type NodeRegister = typeof Node;

abstract class Node<T extends Record<string, unknown> = {}> {
  protected data: T;

  constructor(data: T) {
    this.data = data;
  }

  static getType(): string {
    return "node";
  }

  static fromJson(_node: JsonNode<{}>): Node {
    throw new Error("[node] method `fromJson` should be override");
  }

  static fromHtml(_node: HTMLElement): Node {
    throw new Error("[node] method `fromHtml` should be override");
  }

  abstract toHtml(): HTMLElement;

  abstract toJson(): JsonNode;

  abstract toText(): string;
}

export default Node;
