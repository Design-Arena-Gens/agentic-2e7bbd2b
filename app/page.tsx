"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Editor from '../components/Editor';
import SuggestionsPanel from '../components/SuggestionsPanel';
import ProgressTracker from '../components/ProgressTracker';
import ProfileMenu from '../components/ProfileMenu';
import { Suggestion } from '../lib/grammar';

export default function HomePage() {
  const [text, setText] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [tone, setTone] = useState<string>('Neutral');
  const [style, setStyle] = useState<string>('Concise');
  const [audience, setAudience] = useState<string>('General');
  const [goalWords, setGoalWords] = useState<number>(500);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const abortRef = useRef<AbortController | null>(null);

  const words = useMemo(() => (text.trim().length ? text.trim().split(/\s+/).length : 0), [text]);

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (abortRef.current) abortRef.current.abort();
      if (!text.trim()) { setSuggestions([]); return; }
      setIsLoading(true);
      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const res = await fetch('/api/grammar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, options: { tone, style, audience } }),
          signal: controller.signal,
        });
        if (!res.ok) throw new Error('Failed to fetch suggestions');
        const data = await res.json();
        setSuggestions(data.suggestions);
      } catch (e) {
        // no-op for aborts
      } finally {
        setIsLoading(false);
      }
    }, 450);
    return () => clearTimeout(handler);
  }, [text, tone, style, audience]);

  return (
    <div className="app-shell" aria-label="CalmWrite app shell">
      <header className="app-header" role="banner">
        <button
          className="icon-button"
          aria-label={isSidebarOpen ? 'Collapse settings sidebar' : 'Expand settings sidebar'}
          aria-expanded={isSidebarOpen}
          onClick={() => setIsSidebarOpen(v => !v)}
        >
          <span aria-hidden>☰</span>
        </button>
        <h1 className="app-title">CalmWrite</h1>
        <ProfileMenu />
      </header>

      <main id="main" className="app-main" role="main">
        <aside
          className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}
          aria-label="Settings"
          aria-hidden={!isSidebarOpen}
        >
          <Sidebar
            tone={tone}
            stylePreset={style}
            audience={audience}
            goalWords={goalWords}
            onToneChange={setTone}
            onStyleChange={setStyle}
            onAudienceChange={setAudience}
            onGoalChange={setGoalWords}
          />
        </aside>

        <section className="editor-area" aria-label="Text editor with suggestions">
          <Editor value={text} onChange={setText} isLoading={isLoading} />
        </section>

        <section className="suggestions-area" aria-label="Suggestions and explanations">
          <SuggestionsPanel
            suggestions={suggestions}
            onApply={(fixed) => setText(fixed)}
          />
        </section>
      </main>

      <footer className="app-footer" role="contentinfo">
        <ProgressTracker wordCount={words} goal={goalWords} />
      </footer>
    </div>
  );
}
