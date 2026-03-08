import { useEffect, type JSX } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { $getRoot, $getSelection, ParagraphNode, type EditorState, type EditorThemeClasses } from "lexical";
import { HeadingNode } from "@lexical/rich-text";
import ToolbarPlugin from "./Plugins/ToolbarPlugin";
import ImagesPlugin from "./Plugins/ImagesPlugin";
import "./editor.css";

interface Props { }

function onChange(props: { onChange: (editorState: EditorState) => void }) {

}

function onError(error) {
  console.error(error);
}

const theme: EditorThemeClasses = {
  text: {
    bold: "editor-bold",
    underline: "editor-underline",
    italic: "editor-italic",
    strikethrough: "editor-strikethrough",
    highlight: "editor-highlight",
    // underlineStrikethrough: "editor-underlineStrikethrough",
    // boldItalic: "editor-boldItalic",
  }
}


export default function Editor({ }: Props): JSX.Element {
  const initialConfig = {
    namespace: "OtterBooks",
    theme,
    onError,
    nodes: [HeadingNode, ParagraphNode]
  }
  return (
    <div className="relative">
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <RichTextPlugin
          contentEditable={<ContentEditable className="min-h-100 p-3 mx-4 border-black border-2 rounded-lg" />}
          placeholder={<div className="absolute top-16 left-8 pointer-events-none text-gray-500">Start your story...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={onChange} />
        {/* <AutoFocusPlugin /> */}
        <HistoryPlugin />
        <AutoFocusPlugin />
      </LexicalComposer>
    </div>
  )

}
