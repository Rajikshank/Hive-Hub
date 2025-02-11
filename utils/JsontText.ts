/* eslint-disable @typescript-eslint/no-explicit-any */
export function extractTextFromTiptap(json: any): string {
    if (!json || typeof json !== "object") return "";
  
    let text = "";
  
    if (Array.isArray(json.content)) {
      json.content.forEach((node: any) => {
        text += extractTextFromTiptap(node) + " ";
      });
    }
  
    if (json.type === "text" && json.text) {
      text += json.text;
    }
  
    return text.trim();
  }