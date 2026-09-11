import type { ScoreResponse } from "../types/api";

interface ScoreDisplayProps {
  score: ScoreResponse | null;
}

export function ScoreDisplay({ score }: ScoreDisplayProps) {
  if (!score) return null;

  return (
    <div className="score-display">
      <div className="score-display__numbers">
        <span className="score-display__before mono">{score.score_before}</span>
        <span className="score-display__arrow">→</span>
        <span className="score-display__after mono">{score.score_after}</span>
      </div>
      <div className="score-display__meta">
        {score.issues_resolved} resolved · {score.issues_remaining} remaining
      </div>
    </div>
  );
}
