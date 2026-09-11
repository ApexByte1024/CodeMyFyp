export type Category = "bug" | "smell" | "security" | "performance" | "style";
export type Severity = "low" | "medium" | "high" | "critical";
export type Source = "ruff" | "openai";

export interface Issue {
  id: string;
  source: Source;
  category: Category;
  severity: Severity;
  line: number;
  message: string;
  explanation: string | null;
}

export interface AnalyzeRequest {
  code: string;
  filename: string;
}

export interface AnalyzeResponse {
  analysis_id: string;
  filename: string;
  quality_score_before: number;
  issues: Issue[];
}

export interface TestResult {
  passed: boolean;
  output: string;
}

export interface GenerateTestsRequest {
  analysis_id: string;
  issue_ids: string[];
}

export interface GenerateTestsResponse {
  test_id: string;
  test_code: string;
  pre_fix_result: TestResult;
}

export interface ApplyFixRequest {
  analysis_id: string;
  issue_ids: string[];
  test_id: string;
}

export interface ApplyFixResponse {
  fixed_code: string;
  diff: string;
  post_fix_result: TestResult;
}

export interface ScoreResponse {
  analysis_id: string;
  score_before: number;
  score_after: number;
  issues_resolved: number;
  issues_remaining: number;
}
