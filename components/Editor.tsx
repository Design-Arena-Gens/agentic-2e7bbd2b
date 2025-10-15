"use client";
import { useId } from 'react';

export default function Editor({ value, onChange, isLoading }: { value: string; onChange: (v: string) => void; isLoading: boolean; }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="visually-hidden">Editor</label>
      <textarea
        id={id}
        className="editor-textarea"
        aria-label="Writing editor"
        placeholder="Start writing here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {isLoading && (
        <div role="status" aria-live="polite" style={{ padding: '0 1rem 0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Generating suggestions…
        </div>
      )}
    </div>
  );
}
