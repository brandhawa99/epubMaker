import type { JSX } from "react";
import { CiTextAlignCenter, CiTextAlignJustify, CiTextAlignLeft, CiTextAlignRight } from "react-icons/ci";
import { FaBold, FaHighlighter, FaItalic, FaRedo, FaStrikethrough, FaUnderline, FaUndo } from "react-icons/fa";
import { RxDividerVertical } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { FORMAT_ELEMENT_COMMAND, FORMAT_TEXT_COMMAND, UNDO_COMMAND, REDO_COMMAND } from "lexical";


export enum RichTextAction {
  Bold = "bold",
  Italics = "italics",
  Underline = "underline",
  Strikethrough = "strikethrough",
  Highlight = "highlight",
  leftAlign = "leftAlign",
  centerAlign = "centerAlign",
  rightAlign = "rightAlign",
  justifyAlign = "justifyAlign",
  Divider = "divider",
  Undo = "undo",
  Redo = "redo",

}
export const RICH_TEXT_OPTIONS = [
  { id: RichTextAction.Bold, icon: <FaBold />, label: "Bold" },
  { id: RichTextAction.Italics, icon: <FaItalic />, label: "Italics" },
  { id: RichTextAction.Underline, icon: <FaUnderline />, label: "Underline" },
  { id: RichTextAction.Divider, icon: <RxDividerVertical />, label: "Divider" },
  { id: RichTextAction.Strikethrough, icon: <FaStrikethrough />, label: "Strikethrough" },
  { id: RichTextAction.Highlight, icon: <FaHighlighter />, label: "Highlight" },
  { id: RichTextAction.Divider, icon: <RxDividerVertical />, label: "Divider" },
  { id: RichTextAction.leftAlign, icon: <CiTextAlignLeft />, label: "Left Align" },
  { id: RichTextAction.centerAlign, icon: <CiTextAlignCenter />, label: "Center Align" },
  { id: RichTextAction.rightAlign, icon: <CiTextAlignRight />, label: "Right Align" },
  { id: RichTextAction.justifyAlign, icon: <CiTextAlignJustify />, label: "Justify Align" },
  { id: RichTextAction.Divider, icon: <RxDividerVertical />, label: "Divider" },
  { id: RichTextAction.Undo, icon: <FaUndo />, label: "Undo" },
  { id: RichTextAction.Redo, icon: <FaRedo />, label: "Redo" },
]

export default function ToolbarPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const onAction = (id: RichTextAction) => {
    switch (id) {
      case RichTextAction.Bold: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
        break;
      }
      case RichTextAction.Italics: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
        break;
      }
      case RichTextAction.Underline: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
        break;
      }
      case RichTextAction.Strikethrough: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
        break;
      }
      case RichTextAction.Highlight: {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "highlight")
        break;
      }
      case RichTextAction.leftAlign: {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")
        break;
      }
      case RichTextAction.centerAlign: {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")
        break;
      }
      case RichTextAction.rightAlign: {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")
        break;
      }
      case RichTextAction.justifyAlign: {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")
        break;
      }
      case RichTextAction.Undo: {
        editor.dispatchCommand(UNDO_COMMAND, undefined)
        break;
      }
      case RichTextAction.Redo: {
        editor.dispatchCommand(REDO_COMMAND, undefined)
        break;
      }
    }
  }
  return (
    <div className="w-full flex px-5 py-2 gap-1 flex-wrap">
      {RICH_TEXT_OPTIONS.map(({ id, label, icon }) => (
        id == RichTextAction.Divider ? <div className="mx-2 border-l border-gray-300" /> :
          <Button key={id} aria-label={label} variant="ghost" className="cursor-pointer" onClick={() => onAction(id)}>
            {icon}
          </Button>
      ))
      }

    </ div >
  );
};
