"use client";
import { ChangeEvent } from 'react';

export default function Sidebar({
  tone,
  stylePreset,
  audience,
  goalWords,
  onToneChange,
  onStyleChange,
  onAudienceChange,
  onGoalChange,
}: {
  tone: string;
  stylePreset: string;
  audience: string;
  goalWords: number;
  onToneChange: (v: string) => void;
  onStyleChange: (v: string) => void;
  onAudienceChange: (v: string) => void;
  onGoalChange: (v: number) => void;
}) {
  const onNum = (e: ChangeEvent<HTMLInputElement>) => onGoalChange(Math.max(0, Number(e.target.value) || 0));

  return (
    <form aria-labelledby="settings-title">
      <h2 id="settings-title" style={{ fontSize: '1rem', margin: '0.25rem 0 0.75rem' }}>Settings</h2>

      <div style={{ display: 'grid', gap: '0.75rem' }}>
        <fieldset>
          <legend style={{ fontWeight: 600 }}>Tone</legend>
          <select aria-label="Tone" value={tone} onChange={(e) => onToneChange(e.target.value)}>
            <option>Neutral</option>
            <option>Friendly</option>
            <option>Formal</option>
            <option>Persuasive</option>
            <option>Confident</option>
          </select>
        </fieldset>

        <fieldset>
          <legend style={{ fontWeight: 600 }}>Style</legend>
          <select aria-label="Style" value={stylePreset} onChange={(e) => onStyleChange(e.target.value)}>
            <option>Concise</option>
            <option>Descriptive</option>
            <option>Narrative</option>
            <option>Analytical</option>
          </select>
        </fieldset>

        <fieldset>
          <legend style={{ fontWeight: 600 }}>Audience</legend>
          <select aria-label="Audience" value={audience} onChange={(e) => onAudienceChange(e.target.value)}>
            <option>General</option>
            <option>Technical</option>
            <option>Executive</option>
            <option>Academic</option>
          </select>
        </fieldset>

        <fieldset>
          <legend style={{ fontWeight: 600 }}>Writing goal (words)</legend>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={goalWords}
            onChange={onNum}
            aria-label="Writing goal in words"
            style={{ width: '100%' }}
          />
        </fieldset>
      </div>
    </form>
  );
}
