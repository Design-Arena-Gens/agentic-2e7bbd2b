"use client";

export default function ProgressTracker({ wordCount, goal }: { wordCount: number; goal: number; }) {
  const percent = Math.min(100, goal > 0 ? Math.round((wordCount / goal) * 100) : 0);
  const label = goal > 0 ? `${percent}% of ${goal} words` : `${wordCount} words`;
  return (
    <div className="progress" aria-label="Progress tracker">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <strong>Progress</strong>
        <span style={{ color: 'var(--text-muted)' }}>{wordCount} words</span>
      </div>
      <div className="progress-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} aria-label={label}>
        <span style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
