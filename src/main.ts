/**
 * TODO:
 * - a way to render internal tree
 * - finish cursor (store and handle position internally)
 * - a way to insert text to internal tree
 * - allow copy (selection) and paste
 * - nodes (bold, italic, img, video)
 * - remove unused params
 * - attempt to remove typing castings
 */
import TextEditor from "./text-editor";
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

  // textEditor.getState().toJson();
  // textEditor.getState().toHtml();
  // textEditor.getState().toText();

  const parser = new DOMParser();
  const dom = parser.parseFromString(
    `<p data-node-type="paragraph">Hello Text Editor!!! <b data-node-type="bold">msg</b></p>`,
    "text/html"
  );
  textEditor.fromHtml(dom);

  // const json = JSON.parse(
  //   '[{"type":"paragraph","data":{},"nodes":[{"type":"text","data":{"text":"hello text-editor"},"nodes":[]},{"type":"bold","data":{},"nodes":[{"type":"text","data":{"text":"!!!"},"nodes":[]}]}]}]'
  // );
  // textEditor.fromJson(json);
}

main();
