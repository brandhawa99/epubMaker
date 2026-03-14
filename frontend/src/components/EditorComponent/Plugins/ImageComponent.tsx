import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection";
import { mergeRegister } from "@lexical/utils";
import {
  $getNodeByKey,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  type NodeKey,
} from "lexical";
import { type JSX, useEffect, useRef } from "react";
import { $isImageNode } from "./ImageNode";
import ImageResizer from "./ImageResizer";

export default function ImageComponent({
  src,
  altText,
  nodeKey,
  width,
  height,
}: {
  src: string;
  altText: string;
  nodeKey: NodeKey;
  width: number | "inherit";
  height: number | "inherit";
}): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(nodeKey);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand<MouseEvent>(
        CLICK_COMMAND,
        (payload) => {
          const event = payload;
          if (event.target === imageRef.current) {
            if (!event.shiftKey) {
              clearSelection();
            }
            setSelected(!isSelected);
            return true;
          }
          return false;
        },
        COMMAND_PRIORITY_LOW
      )
    );
  }, [editor, isSelected, nodeKey, setSelected, clearSelection]);

  const onResizeEnd = (nextWidth: number, nextHeight: number) => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if ($isImageNode(node)) {
        node.setWidthAndHeight(nextWidth, nextHeight);
      }
    });
  };

  const onResizeStart = () => {
  };

  return (
    <div className="relative inline-block leading-0">
      <img
        ref={imageRef}
        src={src}
        alt={altText}
        className={`max-w-full h-auto rounded-lg select-none cursor-pointer ${isSelected ? "ring-2 ring-blue-500" : ""
          }`}
        style={{
          width: width === "inherit" ? "auto" : `${width}px`,
          height: height === "inherit" ? "auto" : `${height}px`,
        }}
      />
      {isSelected && (
        <ImageResizer
          imageRef={imageRef}
          onResizeStart={onResizeStart}
          onResizeEnd={onResizeEnd}
        />
      )}
    </div>
  );
}
