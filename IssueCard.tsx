import { useState } from "react";
import type { Issue } from "../types/api";

const CATEGORY_COLOR: Record<Issue["category"], string> = {
  bug: "var(--sig-bug)",
  security: "var(--sig-security)",
  performance: "var(--sig-performance)",
  smell: "var(--sig-smell)",
  style: "var(--sig-style)",
};

interface IssueCardProps {
  issue: Issue;
  selected: boolean;
  onToggleSelect: (id: string) => void;
}

export function IssueCard({ issue, selected, onToggleSelect }: IssueCardProps) {
  const [expanded, setExpanded] = useState(false);
  const color = CATEGORY_COLOR[issue.category];

  return (
    <div className="issue-card" style={{ borderLeftColor: color }}>
      <div className="issue-card__row">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onToggleSelect(issue.id)}
        />
        <span className="issue-card__category" style={{ color }}>
          {issue.category}
        </span>
        <span className="issue-card__severity">{issue.severity}</span>
        <span className="issue-card__line mono">line {issue.line}</span>
        <span className="issue-card__source mono">{issue.source}</span>
      </div>

      <button
        className="issue-card__message"
        onClick={() => setExpanded((v) => !v)}
      >
        {issue.message}
      </button>

      {expanded && issue.explanation && (
        <p className="issue-card__explanation">{issue.explanation}</p>
      )}
    </div>
  );
}
