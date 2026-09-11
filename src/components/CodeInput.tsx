import { useRef, useState } from "react";
import Editor from "@monaco-editor/react";

interface CodeInputProps {
  onAnalyze: (code: string, filename: string) => void;
  isAnalyzing: boolean;
}

const SAMPLE_CODE = `def foo(x):
    return x+1

def run_command(user_input):
    eval(user_input)
`;

export function CodeInput({ onAnalyze, isAnalyzing }: CodeInputProps) {
  const [code, setCode] = useState(SAMPLE_CODE);
  const [filename, setFilename] = useState("example.py");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setCode(String(reader.result ?? ""));
      setFilename(file.name);
    };
    reader.readAsText(file);
  }

  return (
    <div className="code-input">
      <div className="code-input__header">
        <span className="code-input__filename mono">{filename}</span>
        <div className="code-input__actions">
          <button
            className="btn btn--ghost"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload file
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".py"
            hidden
            onChange={handleFileUpload}
          />
          <button
            className="btn btn--primary"
            onClick={() => onAnalyze(code, filename)}
            disabled={isAnalyzing || !code.trim()}
          >
            {isAnalyzing ? "Analyzing…" : "Analyze code"}
          </button>
        </div>
      </div>

      <Editor
        height="420px"
        defaultLanguage="python"
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value ?? "")}
        options={{
          fontFamily: "JetBrains Mono, SF Mono, Menlo, monospace",
          fontSize: 13,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          padding: { top: 12 },
        }}
      />
    </div>
  );
}
