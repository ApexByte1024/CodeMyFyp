# Code Review Copilot — Frontend

## Setup
```bash
npm install
npm run dev
```
Runs on http://localhost:5173. Works fully offline right now — it's wired to `mockApi.ts`, not a real backend.

## Structure
```
src/
  api/
    mockApi.ts    # hardcoded responses matching API_CONTRACT.md — used until backend is ready
    client.ts      # real fetch calls to FastAPI backend
    index.ts        # <- the ONE file to edit to switch mock -> real
  types/api.ts      # shared types, mirrors the Pydantic models exactly
  components/
    CodeInput.tsx        # Monaco editor + file upload + "Analyze" button
    IssueList.tsx         # renders Issue[]
    IssueCard.tsx          # single issue, expandable explanation, checkbox to select
    DiffViewer.tsx          # renders unified diff from /apply-fix
    TestResultPanel.tsx      # red/green pass-fail box
    ScoreDisplay.tsx          # before -> after score, top right of header
  App.tsx            # wires the full analyze -> select issues -> generate tests -> apply fix -> score flow
  App.css             # layout + component styles
  styles/tokens.css    # design tokens (colors, type, spacing) — single source of truth
```

## Switching from mock data to the real backend
Once Person A's FastAPI server is running on `http://localhost:8000`:

1. Open `src/api/index.ts`
2. Change `const USE_REAL_API = false` to `true`
3. That's it — every component already imports from `api/index.ts`, not the mock or client directly, so nothing else changes.

If the backend runs on a different port, set `VITE_API_URL` in a `.env` file:
```
VITE_API_URL=http://localhost:8001
```

## Flow implemented
1. Paste or upload Python code → `Analyze code`
2. Issues appear as cards (category color-coded, click to expand explanation)
3. Check the issues you want fixed → `Generate tests` (shows red ❌ pre-fix result)
4. `Apply AI fix` → shows diff + green ✅ post-fix result + updates the header score

## Known gaps (fine for the 48hr scope, fix later if time)
- No GitHub repo import — paste/upload only
- Diff viewer is a plain colored-line renderer, not a real diff library
- No loading skeletons, just disabled buttons + "…" label text
- No error states wired up yet (mock never fails) — add a try/catch + error banner once hitting the real API
