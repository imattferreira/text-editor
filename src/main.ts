/**
 * TODO:
 * - a way to render internal tree
 * - finish cursor (store and handle position internally)
 * - a way to insert text to internal tree
 * - allow copy (selection) and paste
 * - nodes (bold, italic, img, video)
 */
import TextEditor from "./text-editor";
import BreakLineNode from "./text-editor/nodes/break-line";
import ParagraphNode from "./text-editor/nodes/paragraph-node";
import TextNode from "./text-editor/nodes/text-node";
import "./text-editor/styles.css";

function main() {
  const textEditor = TextEditor.create({
    placeholder: "placeholder",
    rootEl: () => document.querySelector("body")!,
  });

  textEditor.render();

  // textEditor.onFocus(() => console.log("focused"));
  // textEditor.onBlur(() => console.log("blurred"));

  // WIP
  // textEditor.getState().insert(node);
  // textEditor.getState().insertAtPosition(node, 10);

  // WIP
  // textEditor.getState().toJson();
  // textEditor.getState().toHtml();
  // textEditor.getState().toText();

  // WIP
  // const parser = new DOMParser();
  // const dom = parser.parseFromString("", "text/html");
  // textEditor.getState().fromHtml(dom);

  // textEditor.getState().fromJson();
}

main();
