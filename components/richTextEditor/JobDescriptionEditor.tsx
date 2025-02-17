/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import { useEffect, useState } from "react";
import { MenuBar } from "./MenuBar";
import { useFormContext } from "react-hook-form";
import {   SparklesIcon    } from "lucide-react";

interface JobDescriptionEditorProps {
  field: any;
  control: any;
}

export default function JobDescriptionEditor({
  field,
}: JobDescriptionEditorProps) {
  const { setValue } = useFormContext();
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
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[300px] p-4 max-w-none dark:prose-invert",
      },
    },
    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()));
      setValue(
        "VectorStore_plaitext",
        editor.getText().replace(/(\r\n|\n|\r)/gm, "")
      );
    },
    content: field.value ? JSON.parse(field.value) : "",
    immediatelyRender: false,
  });

  // Update editor content when form value changes externally
  useEffect(() => {
    if (editor && field.value && editor.getHTML() !== field.value) {
      editor.commands.setContent(JSON.parse(field.value));
    }
  }, [editor, field.value]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <div className="w-full">
      <div className="border rounded-lg overflow-hidden bg-card">
        <MenuBar editor={editor} setIsLoading={setIsLoading} />
       {isLoading ? <div className="text-center p-6"> <SparklesIcon className="text-muted-foreground h-[300px] text-center justify-self-center animate-pulse " size={70}/> </div>  :<EditorContent editor={editor}   />}
      </div>
    </div>
  );
}
