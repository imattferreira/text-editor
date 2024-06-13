import TextEditor from "./text-editor";
import "./text-editor/styles.css";

function main() {
  const textEditor = TextEditor.create({
    placeholder: "Hello World!",
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
