import TextEditor from "./text-editor";
import BreakLineNode from "./text-editor/nodes/break-line";
import TextNode from "./text-editor/nodes/text-node";
import "./text-editor/styles.css";

function main() {
  const textEditor = TextEditor.create({
    placeholder: "Hello World!",
    register: {
      nodes: [TextNode, BreakLineNode],
    },
    rootEl: () => document.querySelector("body")!,
  });

  textEditor.render();

  // textEditor.getState().toJson();
  // textEditor.getState().toText();
  // textEditor.getState().toHtml();
  // textEditor.getState().addListener('focus', () => {});
  // textEditor.getState().addListener('click', () => {});
}

main();
