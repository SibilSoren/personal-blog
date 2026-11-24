/**
 * Turns GitHub's note syntax into a callout the site can style:
 *
 *   > [!NOTE]
 *   > Only the active server handles traffic.
 *
 * remark-gfm doesn't support it, so the marker used to render as literal text
 * ("[!NOTE]"). This strips the marker and tags the blockquote with
 * data-callout="note" (or tip, important, warning, caution). The blockquote
 * component in mdx-components.tsx renders it as the post's red-pencil note.
 *
 * Written against the mdast shape directly, so it needs no extra dependency.
 */

const MARKER = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\][ \t]*\n?/

interface MdastNode {
  type: string
  value?: string
  children?: MdastNode[]
  data?: { hProperties?: Record<string, unknown> }
}

function walk(node: MdastNode, visit: (node: MdastNode) => void) {
  visit(node)
  node.children?.forEach((child) => walk(child, visit))
}

export function remarkNoteCallouts() {
  return (tree: MdastNode) => {
    walk(tree, (node) => {
      if (node.type !== "blockquote") return

      const paragraph = node.children?.[0]
      const text = paragraph?.type === "paragraph" ? paragraph.children?.[0] : undefined
      if (!paragraph || text?.type !== "text" || !text.value) return

      const match = text.value.match(MARKER)
      if (!match) return

      text.value = text.value.slice(match[0].length)
      // The marker often sits on its own line, which leaves the paragraph
      // starting with an empty text node or a line break; drop those.
      while (
        paragraph.children?.length &&
        ((paragraph.children[0].type === "text" && paragraph.children[0].value === "") ||
          paragraph.children[0].type === "break")
      ) {
        paragraph.children.shift()
      }

      node.data = {
        ...node.data,
        hProperties: { ...node.data?.hProperties, "data-callout": match[1].toLowerCase() },
      }
    })
  }
}
