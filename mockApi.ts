import type {
  AnalyzeRequest,
  AnalyzeResponse,
  GenerateTestsRequest,
  GenerateTestsResponse,
  ApplyFixRequest,
  ApplyFixResponse,
  ScoreResponse,
} from "../types/api";

// Simulates network latency so loading states are visible while testing.
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function analyze(req: AnalyzeRequest): Promise<AnalyzeResponse> {
  await delay(500);
  return {
    analysis_id: "a1b2c3",
    filename: req.filename,
    quality_score_before: 62,
    issues: [
      {
        id: "issue-1",
        source: "ruff",
        category: "style",
        severity: "low",
        line: 2,
        message: "Missing whitespace around operator",
        explanation: null,
      },
      {
        id: "issue-2",
        source: "openai",
        category: "bug",
        severity: "high",
        line: 1,
        message: "Function does not validate input type",
        explanation:
          "If x is a string, x+1 will raise a TypeError at runtime. Add a type check or type hint with validation.",
      },
      {
        id: "issue-3",
        source: "openai",
        category: "security",
        severity: "critical",
        line: 5,
        message: "User input passed directly into eval()",
        explanation:
          "This allows arbitrary code execution if the input is attacker-controlled. Replace eval() with a safe parser (e.g. ast.literal_eval) or explicit dispatch.",
      },
    ],
  };
}

export async function generateTests(
  _req: GenerateTestsRequest
): Promise<GenerateTestsResponse> {
  await delay(700);
  return {
    test_id: "t1",
    test_code:
      "import pytest\nfrom example import foo\n\n" +
      "def test_foo_rejects_string():\n    with pytest.raises(TypeError):\n        foo('a')\n",
    pre_fix_result: {
      passed: false,
      output: "TypeError: can only concatenate str (not \"int\") to str",
    },
  };
}

export async function applyFix(
  _req: ApplyFixRequest
): Promise<ApplyFixResponse> {
  await delay(900);
  return {
    fixed_code:
      "def foo(x: int) -> int:\n" +
      "    if not isinstance(x, int):\n" +
      "        raise TypeError('x must be an int')\n" +
      "    return x + 1",
    diff:
      "--- original\n+++ fixed\n@@ -1,2 +1,4 @@\n" +
      "-def foo(x):\n-    return x+1\n" +
      "+def foo(x: int) -> int:\n+    if not isinstance(x, int):\n" +
      "+        raise TypeError('x must be an int')\n+    return x + 1",
    post_fix_result: {
      passed: true,
      output: "1 passed in 0.02s",
    },
  };
}

export async function getScore(_analysisId: string): Promise<ScoreResponse> {
  await delay(400);
  return {
    analysis_id: "a1b2c3",
    score_before: 62,
    score_after: 94,
    issues_resolved: 3,
    issues_remaining: 1,
  };
}
