interface DiffViewerProps {
  diff: string;
}

export function DiffViewer({ diff }: DiffViewerProps) {
  const lines = diff.split("\n");

  return (
    <pre className="diff-viewer mono">
      {lines.map((line, i) => {
        let className = "diff-viewer__line";
        if (line.startsWith("+") && !line.startsWith("+++")) {
          className += " diff-viewer__line--add";
        } else if (line.startsWith("-") && !line.startsWith("---")) {
          className += " diff-viewer__line--remove";
        }
        return (
          <div key={i} className={className}>
            {line}
          </div>
        );
      })}
    </pre>
  );
}
