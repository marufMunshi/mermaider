import Editor from "@monaco-editor/react";
import { memo } from "react";

const MemoizedCodeEditor = memo(function CodeEditor({
  writtenCode,
  handleCodeChange,
}: {
  writtenCode?: string;
  handleCodeChange: (val: string) => Promise<void>;
}) {
  return (
    <Editor
      height="100%"
      width="100%"
      defaultLanguage="markdown"
      value={writtenCode}
      theme="light"
      onChange={(val) => handleCodeChange(val || "")}
    />
  );
});

export default MemoizedCodeEditor;
