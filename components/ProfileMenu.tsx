"use client";
import { useEffect, useRef, useState } from 'react';

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!open) return;
      if (menuRef.current && !menuRef.current.contains(e.target as Node) && buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="menu">
      <button
        ref={buttonRef}
        className="menu-button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
      >
        Profile ▾
      </button>
      {open && (
        <div ref={menuRef} className="menu-items" role="menu" aria-label="User menu">
          <button className="menu-item" role="menuitem" tabIndex={0}>My account</button>
          <button className="menu-item" role="menuitem" tabIndex={0}>Settings</button>
          <button className="menu-item" role="menuitem" tabIndex={0}>Sign out</button>
        </div>
      )}
    </div>
  );
}
