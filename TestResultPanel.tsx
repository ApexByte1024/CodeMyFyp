import type { TestResult } from "../types/api";

interface TestResultPanelProps {
  label: string;
  result: TestResult | null;
}

export function TestResultPanel({ label, result }: TestResultPanelProps) {
  if (!result) {
    return (
      <div className="test-panel test-panel--pending">
        <span className="test-panel__label">{label}</span>
        <span className="test-panel__status">—</span>
      </div>
    );
  }

  return (
    <div
      className={`test-panel ${
        result.passed ? "test-panel--pass" : "test-panel--fail"
      }`}
    >
      <div className="test-panel__header">
        <span className="test-panel__label">{label}</span>
        <span className="test-panel__status">
          {result.passed ? "✅ passed" : "❌ failed"}
        </span>
      </div>
      <pre className="test-panel__output mono">{result.output}</pre>
    </div>
  );
}
