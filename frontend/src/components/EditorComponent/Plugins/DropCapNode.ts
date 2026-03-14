import {
  ParagraphNode,
  type EditorConfig,
  type LexicalNode,
  type SerializedParagraphNode,
  $applyNodeReplacement,
} from "lexical";

export type SerializedDropCapNode = SerializedParagraphNode;

export class DropCapNode extends ParagraphNode {
  static getType(): string {
    return "dropcap";
  }

  static clone(node: DropCapNode): DropCapNode {
    return new DropCapNode(node.__key);
  }

  createDOM(config: EditorConfig): HTMLElement {
    const dom = super.createDOM(config);
    dom.classList.add("editor-dropcap");
    return dom;
  }

  updateDOM(prevNode: DropCapNode, dom: HTMLElement, config: EditorConfig): boolean {
    const updated = super.updateDOM(prevNode, dom, config);
    dom.classList.add("editor-dropcap");
    return updated;
  }

  static importJSON(serializedNode: SerializedDropCapNode): DropCapNode {
    const node = $createDropCapNode();
    node.setFormat(serializedNode.format);
    node.setIndent(serializedNode.indent);
    node.setDirection(serializedNode.direction);
    return node;
  }

  exportJSON(): SerializedDropCapNode {
    return {
      ...super.exportJSON(),
      type: "dropcap",
      version: 1,
    };
  }
}

export function $createDropCapNode(): DropCapNode {
  return $applyNodeReplacement(new DropCapNode());
}

export function $isDropCapNode(node: LexicalNode | null | undefined): node is DropCapNode {
  return node instanceof DropCapNode;
}
