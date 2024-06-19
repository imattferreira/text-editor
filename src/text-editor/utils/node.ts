import BoldNode from "../nodes/bold-node";
import BreakLineNode from "../nodes/break-line";
import ItalicNode from "../nodes/italic-node";
import ParagraphNode from "../nodes/paragraph-node";
import TextNode from "../nodes/text-node";
import type { Maybe } from "./types";

const REGISTERED_EDITOR_NODES = [
  BoldNode,
  BreakLineNode,
  ItalicNode,
  ParagraphNode,
  TextNode,
];

export const findEditorNodeFromType = (type: string) =>
  REGISTERED_EDITOR_NODES.find((n) => n.getType() === type) || null;

export const extractEditorNodeTypeAttr = (
  el: Element | ChildNode
  // @ts-ignore
): Maybe<string> => el.getAttribute("data-node-type") || null;
