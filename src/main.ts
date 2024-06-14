import TextEditor from "./text-editor";
import BreakLineNode from "./text-editor/nodes/break-line";
import ParagraphNode from "./text-editor/nodes/paragraph-node";
import TextNode from "./text-editor/nodes/text-node";
import "./text-editor/styles.css";

function main() {
  const textEditor = TextEditor.create({
    placeholder: "Hello World!",
    register: {
      nodes: [TextNode, BreakLineNode, ParagraphNode],
    },
    rootEl: () => document.querySelector("body")!,
  });

  textEditor.render();

  // textEditor.onFocus(() => console.log("focused"));
  // textEditor.onBlur(() => console.log("blurred"));

  // textEditor.getState().toJson();
  // textEditor.getState().toText();
  // textEditor.getState().toHtml();
}

main();
