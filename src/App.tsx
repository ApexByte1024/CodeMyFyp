import { useState } from "react";
import { api } from "./api";
import type {
  AnalyzeResponse,
  GenerateTestsResponse,
  ApplyFixResponse,
  ScoreResponse,
} from "./types/api";
import { CodeInput } from "./components/CodeInput";
import { IssueList } from "./components/IssueList";
import { DiffViewer } from "./components/DiffViewer";
import { TestResultPanel } from "./components/TestResultPanel";
import { ScoreDisplay } from "./components/ScoreDisplay";
import "./styles/tokens.css";
import "./App.css";

type Stage = "idle" | "analyzing" | "analyzed" | "testing" | "fixing" | "done";

export default function App() {
  const [stage, setStage] = useState<Stage>("idle");
  const [analysis, setAnalysis] = useState<AnalyzeResponse | null>(null);
  const [selectedIssueIds, setSelectedIssueIds] = useState<string[]>([]);
  const [testResult, setTestResult] = useState<GenerateTestsResponse | null>(null);
  const [fixResult, setFixResult] = useState<ApplyFixResponse | null>(null);
  const [score, setScore] = useState<ScoreResponse | null>(null);

  async function handleAnalyze(code: string, filename: string) {
    setStage("analyzing");
    setAnalysis(null);
    setTestResult(null);
    setFixResult(null);
    setScore(null);
    setSelectedIssueIds([]);
    const result = await api.analyze({ code, filename });
    setAnalysis(result);
    setStage("analyzed");
  }

  function toggleIssueSelect(id: string) {
    setSelectedIssueIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  async function handleGenerateTests() {
    if (!analysis || selectedIssueIds.length === 0) return;
    setStage("testing");
    const result = await api.generateTests({
      analysis_id: analysis.analysis_id,
      issue_ids: selectedIssueIds,
    });
    setTestResult(result);
    setStage("analyzed");
  }

  async function handleApplyFix() {
    if (!analysis || !testResult) return;
    setStage("fixing");
    const result = await api.applyFix({
      analysis_id: analysis.analysis_id,
      issue_ids: selectedIssueIds,
      test_id: testResult.test_id,
    });
    setFixResult(result);
    const scoreResult = await api.getScore(analysis.analysis_id);
    setScore(scoreResult);
    setStage("done");
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1>Code Review Copilot</h1>
        <ScoreDisplay score={score} />
      </header>

      <main className="app__body">
        <section className="app__panel">
          <CodeInput onAnalyze={handleAnalyze} isAnalyzing={stage === "analyzing"} />
        </section>

        <section className="app__panel">
          <div className="app__panel-header">
            <h2>Issues</h2>
            {analysis && (
              <button
                className="btn btn--primary"
                disabled={selectedIssueIds.length === 0 || stage === "testing"}
                onClick={handleGenerateTests}
              >
                {stage === "testing" ? "Generating…" : "Generate tests"}
              </button>
            )}
          </div>

          <IssueList
            issues={analysis?.issues ?? []}
            selectedIds={selectedIssueIds}
            onToggleSelect={toggleIssueSelect}
          />

          {testResult && (
            <div className="app__test-fix">
              <TestResultPanel label="Before fix" result={testResult.pre_fix_result} />

              <button
                className="btn btn--primary"
                disabled={stage === "fixing"}
                onClick={handleApplyFix}
              >
                {stage === "fixing" ? "Applying fix…" : "Apply AI fix"}
              </button>

              {fixResult && (
                <>
                  <DiffViewer diff={fixResult.diff} />
                  <TestResultPanel label="After fix" result={fixResult.post_fix_result} />
                </>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
