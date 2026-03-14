import { useCallback, useEffect, useState, type JSX } from "react";
import { CiTextAlignCenter, CiTextAlignJustify, CiTextAlignLeft, CiTextAlignRight } from "react-icons/ci";
import { TbH1, TbH2, TbH3 } from "react-icons/tb";
import { FaBold, FaHighlighter, FaItalic, FaRedo, FaStrikethrough, FaUnderline, FaUndo, FaQuoteLeft, FaMinus, FaChevronDown, FaChevronUp, FaIndent, FaOutdent, FaImage } from "react-icons/fa";
import { RxDividerVertical } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { FORMAT_ELEMENT_COMMAND, FORMAT_TEXT_COMMAND, UNDO_COMMAND, REDO_COMMAND, $getSelection, $isRangeSelection, $createParagraphNode, INDENT_CONTENT_COMMAND, OUTDENT_CONTENT_COMMAND, KEY_TAB_COMMAND, COMMAND_PRIORITY_EDITOR, $createTabNode, $isElementNode } from "lexical";
import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/extension";
import { INSERT_IMAGE_COMMAND } from "./ImagePlugin";
import { $createHeadingNode, $createQuoteNode, $isHeadingNode, $isQuoteNode, type HeadingTagType } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection"
import { $createDropCapNode, $isDropCapNode } from "./DropCapNode";


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
  Heading1 = "h1",
  Heading2 = "h2",
  Heading3 = "h3",
  Paragraph = "paragraph",
  Quote = "quote",
  DropCap = "dropcap",
  HorizontalRule = "horizontalRule",
  Indent = "indent",
  Outdent = "outdent",
  Image = "image"
}

// Block type label shown in the dropdown trigger
const BLOCK_TYPE_LABELS: Record<string, string> = {
  paragraph: "Normal",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  quote: "Quote",
  dropcap: "Drop Cap",
};

const ALIGNMENT_ICONS: Record<string, JSX.Element> = {
  left: <CiTextAlignLeft className="mr-1" />,
  center: <CiTextAlignCenter className="mr-1" />,
  right: <CiTextAlignRight className="mr-1" />,
  justify: <CiTextAlignJustify className="mr-1" />,
};

export const RICH_TEXT_OPTIONS = [
  { id: RichTextAction.Bold, icon: <FaBold />, label: "Bold" },
  { id: RichTextAction.Italics, icon: <FaItalic />, label: "Italics" },
  { id: RichTextAction.Underline, icon: <FaUnderline />, label: "Underline" },
  { id: RichTextAction.Divider, icon: <RxDividerVertical />, label: "Divider" },
  { id: RichTextAction.Image, icon: <FaImage />, label: "Insert Image" },
  { id: RichTextAction.Strikethrough, icon: <FaStrikethrough />, label: "Strikethrough" },
  { id: RichTextAction.Highlight, icon: <FaHighlighter />, label: "Highlight" },
  { id: RichTextAction.Divider, icon: <RxDividerVertical />, label: "Divider" },
  { id: RichTextAction.Undo, icon: <FaUndo />, label: "Undo" },
  { id: RichTextAction.Redo, icon: <FaRedo />, label: "Redo" },
]

export default function ToolbarPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [blockType, setBlockType] = useState("paragraph");
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [textAlign, setTextAlign] = useState("left")

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();

      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);

      if (elementDOM !== null) {
        if ($isHeadingNode(element)) {
          setBlockType(element.getTag());
        } else if ($isQuoteNode(element)) {
          setBlockType("quote");
        } else if ($isDropCapNode(element)) {
          setBlockType("dropcap");
        } else {
          setBlockType(element.getType());
        }
      }
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));

      if ($isElementNode(element)) {
        setTextAlign(element.getFormatType() || "left");
      }
    }
  }, [editor]);

  editor.registerCommand(
    KEY_TAB_COMMAND,
    (event) => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        event.preventDefault();
        selection.insertNodes([$createTabNode()]);
        return true;
      }
      return false;
    },
    COMMAND_PRIORITY_EDITOR
  );

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    });
  }, [editor, updateToolbar]);

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
      case RichTextAction.Heading1:
      case RichTextAction.Heading2:
      case RichTextAction.Heading3: {
        const tag = id as HeadingTagType;
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () =>
              blockType === tag ? $createParagraphNode() : $createHeadingNode(tag)
            );
          }
        });
        break;
      }
      case RichTextAction.Quote: {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () =>
              blockType === "quote" ? $createParagraphNode() : $createQuoteNode()
            );
          }
        });
        break;
      }
      case RichTextAction.DropCap: {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () =>
              blockType === "dropcap" ? $createParagraphNode() : $createDropCapNode()
            );
          }
        });
        break;
      }
      case RichTextAction.HorizontalRule: {
        editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined);
        break;
      }
      case RichTextAction.Indent: {
        editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
        break;
      }
      case RichTextAction.Outdent: {
        editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
        break;
      }
      case RichTextAction.Image: {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = async () => {
          const file = input.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              const src = reader.result as string;
              editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                src,
                altText: file.name,
              });
            };
            reader.readAsDataURL(file);
          }
        };
        input.click();
        break;
      }
    }
  }

  const triggerLabel = BLOCK_TYPE_LABELS[blockType] ?? "Normal";

  const [openBlockMenu, setOpenBlockMenu] = useState(false)
  const [openAlignMenu, setOpenAlignMenu] = useState(false)
  return (
    <div className="w-full flex px-5 py-2 gap-1 shrink-0 items-center bg-gray-200 rounded-t-2xl overflow-x-auto overflow-hidden [scrollbar-gutter:stable]">

      {/* Block type dropdown */}
      <DropdownMenu onOpenChange={(open) => setOpenBlockMenu(open)}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="cursor-pointer flex items-center gap-1 text-sm font-medium min-w-28 justify-between">
            {triggerLabel}
            {!openBlockMenu ? <FaChevronDown className="text-xs opacity-60" /> : <FaChevronUp />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            className={blockType === "paragraph" ? "bg-gray-100 font-medium" : ""}
            onClick={() => onAction(RichTextAction.Paragraph)}
          >
            Normal
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className={blockType === "h1" ? "bg-gray-100 font-medium" : ""}
            onClick={() => onAction(RichTextAction.Heading1)}
          >
            <TbH1 className="mr-1" /> Heading 1
          </DropdownMenuItem>
          <DropdownMenuItem
            className={blockType === "h2" ? "bg-gray-100 font-medium" : ""}
            onClick={() => onAction(RichTextAction.Heading2)}
          >
            <TbH2 className="mr-1" /> Heading 2
          </DropdownMenuItem>
          <DropdownMenuItem
            className={blockType === "h3" ? "bg-gray-100 font-medium" : ""}
            onClick={() => onAction(RichTextAction.Heading3)}
          >
            <TbH3 className="mr-1" /> Heading 3
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className={blockType === "quote" ? "bg-gray-100 font-medium" : ""}
            onClick={() => onAction(RichTextAction.Quote)}
          >
            <FaQuoteLeft className="mr-1" /> Quote
          </DropdownMenuItem>
          <DropdownMenuItem
            className={blockType === "dropcap" ? "bg-gray-100 font-medium" : ""}
            onClick={() => onAction(RichTextAction.DropCap)}
          >
            <span className="mr-1 font-serif font-bold">D</span> Drop Cap
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onAction(RichTextAction.HorizontalRule)}>
            <FaMinus className="mr-1" /> Horizontal Rule
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="mx-1 border-l border-gray-300 h-5" />

      {/* Text align dropdown */}
      <DropdownMenu onOpenChange={(open) => setOpenAlignMenu(open)}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="cursor-pointer flex items-center gap-1 text-sm font-medium justify-between">
            <span className="flex items-center gap-1">
              {ALIGNMENT_ICONS[textAlign] ?? <CiTextAlignLeft className="mr-1" />}
              {/* {ALIGNMENT_LABELS[textAlign] ?? "Left Align"} */}
            </span>
            {!openAlignMenu ? <FaChevronDown className="text-xs opacity-60" /> : <FaChevronUp className="text-xs" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            className={textAlign === "left" ? "bg-gray-100 font-medium" : ""}
            onClick={() => onAction(RichTextAction.leftAlign)}
          >
            <CiTextAlignLeft className="mr-1" /> Left Align
          </DropdownMenuItem>
          <DropdownMenuItem
            className={textAlign === "center" ? "bg-gray-100 font-medium" : ""}
            onClick={() => onAction(RichTextAction.centerAlign)}
          >
            <CiTextAlignCenter className="mr-1" /> Center Align
          </DropdownMenuItem>
          <DropdownMenuItem
            className={textAlign === "right" ? "bg-gray-100 font-medium" : ""}
            onClick={() => onAction(RichTextAction.rightAlign)}
          >
            <CiTextAlignRight className="mr-1" /> Right Align
          </DropdownMenuItem>
          <DropdownMenuItem
            className={textAlign === "justify" ? "bg-gray-100 font-medium" : ""}
            onClick={() => onAction(RichTextAction.justifyAlign)}
          >
            <CiTextAlignJustify className="mr-1" /> Justify
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => onAction(RichTextAction.Indent)}
          >
            <FaIndent className="mr-1 text-[10px]" /> Indent
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onAction(RichTextAction.Outdent)}
          >
            <FaOutdent className="mr-1 text-[10px]" /> Outdent
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="mx-1 border-l border-gray-300 h-5" />
      {/* Flat toolbar buttons */}
      {
        RICH_TEXT_OPTIONS.map(({ id, label, icon }, index) => {
          let isActive = false;
          if (id === RichTextAction.Bold) isActive = isBold;
          else if (id === RichTextAction.Italics) isActive = isItalic;

          return (
            id === RichTextAction.Divider
              ? <div key={`divider-${index}`} className="mx-1 border-l border-gray-300 h-5" />
              : <Button key={`${id}-${index}`} aria-label={label} variant="ghost" className={`cursor-pointer ${isActive ? "bg-gray-300" : ""}`} onClick={() => onAction(id)}>
                {icon}
              </Button>
          )
        })
      }

    </div >
  );
};

