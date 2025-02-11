"use client"

import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import { EditorContent,   JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export function JsonToHtml({json}: JSONContent) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Typography,
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm   sm:prose lg:prose-lg xl:prose-xl     dark:prose-invert",
      },
    },
    content: json,
    editable:false
  });


 
  return <EditorContent  editor={editor} />;
}


 