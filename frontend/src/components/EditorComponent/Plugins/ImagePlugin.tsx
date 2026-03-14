import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  createCommand,
  type LexicalCommand,
} from "lexical";
import { useEffect, type JSX } from "react";
import { $createImageNode, ImageNode, type ImagePayload } from "./ImageNode";
import { mergeRegister } from "@lexical/utils";

export const INSERT_IMAGE_COMMAND: LexicalCommand<ImagePayload> =
  createCommand("INSERT_IMAGE_COMMAND");

export default function ImagePlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error("ImagePlugin: ImageNode not registered on editor");
    }

    return mergeRegister(
      editor.registerCommand<ImagePayload>(
        INSERT_IMAGE_COMMAND,
        (payload) => {
          const imageNode = $createImageNode(payload);
          const selection = $getSelection();

          if ($isRangeSelection(selection)) {
            selection.insertNodes([imageNode]);
          }
          return true;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand<DragEvent>(
        createCommand("DROP_COMMAND"),
        (event) => {
          const files = event.dataTransfer?.files;
          if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
              const file = files[i];
              if (file.type.startsWith("image/")) {
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
            }
            event.preventDefault();
            return true;
          }
          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand<ClipboardEvent>(
        createCommand("PASTE_COMMAND"),
        (event) => {
          const items = event.clipboardData?.items;
          if (items) {
            for (let i = 0; i < items.length; i++) {
              const item = items[i];
              if (item.type.startsWith("image/")) {
                const file = item.getAsFile();
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
              }
            }
          }
          return false;
        },
        COMMAND_PRIORITY_LOW
      )
    );
  }, [editor]);

  return null;
}
