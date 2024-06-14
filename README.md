## TextEditor

TextEditor is a working-in-progress project that creates a minimal version of a WYSIWYG text editor for the WEB.

### Technologies

- Typescript
- Vite

### How to use it?

To instantiate a text editor, follow this snippet below:

```typescript
import TextEditor from "./text-editor";
import BreakLineNode from "./text-editor/nodes/break-line";
import TextNode from "./text-editor/nodes/text-node";

// Apply default styles
import "./text-editor/styles.css";

function main() {
  const config = {
    placeholder: "This is my placeholder!", // placeholder of input
    register: {
      nodes: [TextNode, BreakLineNode], // register nodes that can be used internally
    },
    rootEl: () => document.querySelector(".text-editor__wrapper"), // selects witch element will be the wrapper of text editor when rendered
  };
  const textEditor = TextEditor.create(config);

  // append text editor to the DOM
  textEditor.render();

  // listen to input events
  textEditor.onFocus(() => console.log("focused"));
  textEditor.onBlur(() => console.log("blurred"));

  // [WIP] export and content
  textEditor.getState().toJson();
  textEditor.getState().toText();
  textEditor.getState().toHtml();

  // [WIP] import content
  textEditor.getState().fromJson(json);
  textEditor.getState().fromHtml(dom);
}
```
