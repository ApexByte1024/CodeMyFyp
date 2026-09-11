import type { Issue } from "../types/api";
import { IssueCard } from "./IssueCard";

interface IssueListProps {
  issues: Issue[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
}

export function IssueList({ issues, selectedIds, onToggleSelect }: IssueListProps) {
  if (issues.length === 0) {
    return <p className="empty-state">No issues found. Run an analysis first.</p>;
  }

  return (
    <div className="issue-list">
      {issues.map((issue) => (
        <IssueCard
          key={issue.id}
          issue={issue}
          selected={selectedIds.includes(issue.id)}
          onToggleSelect={onToggleSelect}
        />
      ))}
    </div>
  );
}
