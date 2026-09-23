"use client";

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import { FontFamily } from "@tiptap/extension-font-family";
import { FONT_OPTIONS } from "@/lib/richTextFonts";

export function RichTextEditor({
  name,
  defaultValue,
  rows = 4,
}: {
  name: string;
  defaultValue?: string | null;
  rows?: number;
}) {
  const [html, setHtml] = useState(defaultValue || "");
  const [activeFont, setActiveFont] = useState("");
  const [marks, setMarks] = useState({ bold: false, italic: false, underline: false });

  const syncToolbarState = (editorInstance: NonNullable<ReturnType<typeof useEditor>>) => {
    setActiveFont(editorInstance.getAttributes("textStyle").fontFamily || "");
    setMarks({
      bold: editorInstance.isActive("bold"),
      italic: editorInstance.isActive("italic"),
      underline: editorInstance.isActive("underline"),
    });
  };

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit, TextStyle, FontFamily],
    content: defaultValue || "",
    editorProps: {
      attributes: {
        class: "input rich-text",
        style: `min-height: ${rows * 1.6}em`,
      },
    },
    onUpdate: ({ editor }) => {
      setHtml(editor.getHTML());
      syncToolbarState(editor);
    },
    onSelectionUpdate: ({ editor }) => {
      syncToolbarState(editor);
    },
  });

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-wrap items-center gap-1 rounded-lg border border-border bg-muted/40 p-1">
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`rounded px-2 py-1 text-sm font-bold ${marks.bold ? "bg-accent/30" : "hover:bg-muted"}`}
        >
          N
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`rounded px-2 py-1 text-sm italic ${marks.italic ? "bg-accent/30" : "hover:bg-muted"}`}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          className={`rounded px-2 py-1 text-sm underline ${marks.underline ? "bg-accent/30" : "hover:bg-muted"}`}
        >
          S
        </button>
        <select
          className="ml-1 rounded border border-border bg-card px-2 py-1 text-sm"
          value={activeFont}
          onChange={(e) => {
            const value = e.target.value;
            if (value) {
              editor?.chain().focus().setFontFamily(value).run();
            } else {
              editor?.chain().focus().unsetFontFamily().run();
            }
            if (editor) syncToolbarState(editor);
          }}
        >
          {FONT_OPTIONS.map((font) => (
            <option key={font.label} value={font.value}>
              {font.label}
            </option>
          ))}
        </select>
      </div>
      <EditorContent editor={editor} />
      <input type="hidden" name={name} value={html} />
    </div>
  );
}
