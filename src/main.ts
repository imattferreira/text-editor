import TextEditor from "./text-editor";
import "./text-editor/styles.css";

function main() {
  const body = document.querySelector("body");

  if (!body) {
    return;
  }

  const textEditor = TextEditor.create();

  textEditor.setRootElement(body);
  textEditor.render();
}

main();
