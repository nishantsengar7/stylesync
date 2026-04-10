'use client';

import { DesignTokens } from '@/types/designTokens';
import { LockToggle } from './LockToggle';
import { useTokenStore } from '@/store/tokenStore';

export const ColorEditor = () => {
  const { tokens, updateColor, lockedTokens } = useTokenStore();

  if (!tokens) return null;

  const colorFields: Array<{ key: keyof DesignTokens['colors']; label: string }> = [
    { key: 'primary', label: 'Primary Brand' },
    { key: 'secondary', label: 'Secondary' },
    { key: 'accent', label: 'Accent' },
    { key: 'background', label: 'Background' },
    { key: 'textPrimary', label: 'Text Primary' },
    { key: 'textSecondary', label: 'Text Secondary' },
    { key: 'border', label: 'Border' },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">Colors</h3>
      <div className="grid gap-4">
        {colorFields.map(({ key, label }) => {
          const path = `colors.${key}`;
          const isLocked = lockedTokens[path];
          
          return (
            <div key={key} className={`flex flex-col gap-2 p-1 rounded-2xl transition-all ${isLocked ? 'bg-amber-500/5 ring-1 ring-amber-500/10 shadow-sm shadow-amber-500/5' : ''}`}>
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 ml-1">{label}</label>
                <LockToggle path={path} />
              </div>
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={tokens.colors[key]}
                    onChange={(e) => updateColor(key, e.target.value)}
                    className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <div className="relative group overflow-hidden w-10 h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm cursor-pointer">
                  <input
                    type="color"
                    value={tokens.colors[key]?.startsWith('#') ? tokens.colors[key] : '#6C3EF4'}
                    onChange={(e) => updateColor(key, e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div 
                    className="w-full h-full transition-transform group-hover:scale-110" 
                    style={{ backgroundColor: tokens.colors[key] }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
