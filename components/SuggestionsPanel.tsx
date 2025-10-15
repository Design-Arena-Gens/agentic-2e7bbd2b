"use client";
import { useState } from 'react';
import type { Suggestion } from '@/lib/grammar';

export default function SuggestionsPanel({ suggestions, onApply }: { suggestions: Suggestion[]; onApply: (fixedText: string) => void; }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const apply = (s: Suggestion) => {
    if (!s.fixedText) return;
    onApply(s.fixedText);
  };

  return (
    <div aria-live="polite" aria-atomic="false">
      <h2 style={{ fontSize: '1rem', margin: '0.25rem 0 0.75rem' }}>Suggestions</h2>
      {suggestions.length === 0 ? (
        <p className="placeholder" style={{ padding: '0 0.5rem 0.75rem' }}>No suggestions yet. Start typing to see guidance.</p>
      ) : (
        <ul role="list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {suggestions.map((s) => (
            <li key={s.id} className="suggestion-item" style={{ padding: '0.5rem 0.25rem' }}>
              <div className="suggestion-header">
                <div>
                  <div className="suggestion-title">{s.message}</div>
                  <div className="suggestion-type" aria-label={`Type: ${s.type}`}>{s.type}</div>
                </div>
                <div className="suggestion-actions">
                  {s.fixedText && (
                    <button className="apply-button" onClick={() => apply(s)} aria-label="Apply fix">Apply</button>
                  )}
                  <button
                    className="icon-button"
                    aria-expanded={expandedId === s.id}
                    aria-controls={`exp-${s.id}`}
                    onClick={() => setExpandedId(expandedId === s.id ? null : s.id)}
                  >
                    {expandedId === s.id ? 'Hide' : 'Explain'}
                  </button>
                </div>
              </div>
              {expandedId === s.id && (
                <div id={`exp-${s.id}`} style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  {s.explanation}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
