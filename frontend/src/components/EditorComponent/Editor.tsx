import { type JSX } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ParagraphNode, type EditorThemeClasses } from "lexical";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { HorizontalRuleNode } from "@lexical/extension";
import { DropCapNode } from "./Plugins/DropCapNode";
import { HorizontalRulePlugin } from "./Plugins/HorizontalRulePlugin";
import ToolbarPlugin from "./Plugins/ToolbarPlugin";
import { ImageNode } from "./Plugins/ImageNode";
import ImagePlugin from "./Plugins/ImagePlugin";
import "./editor.css";

interface Props { }

function onChange() {

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
  },
  heading: {
    h1: "editor-h1",
    h2: "editor-h2",
    h3: "editor-h3",
  },
  quote: "editor-quote",
  dropcap: "editor-dropcap",
}


export default function Editor({ }: Props): JSX.Element {
  const initialConfig = {
    namespace: "OtterBooks",
    theme,
    onError,
    nodes: [HeadingNode, ParagraphNode, QuoteNode, DropCapNode, HorizontalRuleNode, ImageNode]
  }
  return (
    <div className="relative border-black border-2 rounded-2xl mb-5">
      <LexicalComposer initialConfig={initialConfig}>
        <ToolbarPlugin />
        <RichTextPlugin
          contentEditable={<ContentEditable className="min-h-100 border-none focus:outline-none p-4 px-7 " />}
          placeholder={<div className="absolute top-[66px] left-8 pointer-events-none text-gray-500">Start your story...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={onChange} />
        <AutoFocusPlugin />
        <HistoryPlugin />
        <HorizontalRulePlugin />
        <ImagePlugin />
      </LexicalComposer>
    </div>
  )

}
