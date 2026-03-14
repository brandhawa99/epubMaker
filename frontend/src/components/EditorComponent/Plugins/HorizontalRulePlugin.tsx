import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $insertNodeToNearestRoot } from "@lexical/utils";
import { COMMAND_PRIORITY_EDITOR } from "lexical";
import { $createHorizontalRuleNode, INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/extension";

/**
 * Registers the INSERT_HORIZONTAL_RULE_COMMAND handler so that the toolbar
 * button works when using HorizontalRuleNode from @lexical/extension directly
 * (without the full LexicalExtensionComposer setup).
 */
export function HorizontalRulePlugin(): null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      INSERT_HORIZONTAL_RULE_COMMAND,
      () => {
        $insertNodeToNearestRoot($createHorizontalRuleNode());
        return true;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);

  return null;
}
