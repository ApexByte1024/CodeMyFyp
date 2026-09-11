import type {
  AnalyzeRequest,
  AnalyzeResponse,
  GenerateTestsRequest,
  GenerateTestsResponse,
  ApplyFixRequest,
  ApplyFixResponse,
  ScoreResponse,
} from "../types/api";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

async function post<TReq, TRes>(path: string, body: TReq): Promise<TRes> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`${path} failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function analyze(req: AnalyzeRequest): Promise<AnalyzeResponse> {
  return post("/analyze", req);
}

export async function generateTests(
  req: GenerateTestsRequest
): Promise<GenerateTestsResponse> {
  return post("/generate-tests", req);
}

export async function applyFix(
  req: ApplyFixRequest
): Promise<ApplyFixResponse> {
  return post("/apply-fix", req);
}

export async function getScore(analysisId: string): Promise<ScoreResponse> {
  const res = await fetch(`${BASE_URL}/score/${analysisId}`);
  if (!res.ok) {
    throw new Error(`/score failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
