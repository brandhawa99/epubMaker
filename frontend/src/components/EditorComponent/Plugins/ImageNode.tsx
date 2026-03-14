import {
  DecoratorNode,
  type NodeKey,
  type EditorConfig,
  type LexicalNode,
  type SerializedLexicalNode,
  type Spread,
} from "lexical";
import { type JSX, Suspense, lazy } from "react";

const ImageComponent = lazy(() => import("./ImageComponent"));

export interface ImagePayload {
  altText: string;
  src: string;
  width?: number;
  height?: number;
  key?: NodeKey;
}

export type SerializedImageNode = Spread<
  {
    altText: string;
    src: string;
    width?: number;
    height?: number;
    type: "image";
    version: 1;
  },
  SerializedLexicalNode
>;

export class ImageNode extends DecoratorNode<JSX.Element> {
  __src: string;
  __altText: string;
  __width: number | "inherit";
  __height: number | "inherit";

  static getType(): string {
    return "image";
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(
      node.__src,
      node.__altText,
      node.__width,
      node.__height,
      node.__key
    );
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const { src, altText, width, height } = serializedNode;
    const node = $createImageNode({
      altText,
      src,
      width,
      height,
    });
    return node;
  }

  exportJSON(): SerializedImageNode {
    return {
      altText: this.getAltText(),
      src: this.getSrc(),
      width: this.__width === "inherit" ? undefined : this.__width,
      height: this.__height === "inherit" ? undefined : this.__height,
      type: "image",
      version: 1,
    };
  }

  constructor(
    src: string,
    altText: string,
    width?: number | "inherit",
    height?: number | "inherit",
    key?: NodeKey
  ) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__width = width || "inherit";
    this.__height = height || "inherit";
  }

  exportDOM(): { element: HTMLElement } {
    const element = document.createElement("img");
    element.setAttribute("src", this.__src);
    element.setAttribute("alt", this.__altText);
    if (this.__width !== "inherit") {
      element.setAttribute("width", this.__width.toString());
    }
    if (this.__height !== "inherit") {
      element.setAttribute("height", this.__height.toString());
    }
    return { element };
  }

  static importDOM(): null {
    return null;
  }

  getSrc(): string {
    return this.__src;
  }

  getAltText(): string {
    return this.__altText;
  }

  setWidthAndHeight(width: number | "inherit", height: number | "inherit"): void {
    const writable = this.getWritable();
    writable.__width = width;
    writable.__height = height;
  }

  createDOM(config: EditorConfig): HTMLElement {
    const span = document.createElement("span");
    const theme = config.theme;
    const className = theme.image;
    if (className !== undefined) {
      span.className = className;
    }
    return span;
  }

  updateDOM(): false {
    return false;
  }

  decorate(): JSX.Element {
    return (
      <Suspense fallback={null}>
        <ImageComponent
          src={this.__src}
          altText={this.__altText}
          width={this.__width}
          height={this.__height}
          nodeKey={this.getKey()}
        />
      </Suspense>
    );
  }
}

export function $createImageNode({
  src,
  altText,
  width,
  height,
  key,
}: ImagePayload): ImageNode {
  return new ImageNode(src, altText, width, height, key);
}

export function $isImageNode(node: LexicalNode | null | undefined): node is ImageNode {
  return node instanceof ImageNode;
}
