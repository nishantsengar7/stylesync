'use client';

import { useTokenStore } from '@/store/tokenStore';
import { LockToggle } from './LockToggle';

export const SpacingRadiusEditor = () => {
  const { tokens, updateSpacing, updateRadius, lockedTokens } = useTokenStore();

  if (!tokens) return null;

  const spacingKeys = ['xs', 'sm', 'md', 'lg', 'xl'];

  return (
    <div className="space-y-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 pb-12">
      <div className="space-y-6">
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Spacing Scale</h3>
        <div className="space-y-4">
          {spacingKeys.map((key) => {
            const path = `spacing.${key}`;
            const isLocked = lockedTokens[path];
            
            return (
              <div key={key} className={`flex flex-col gap-2 p-1 rounded-2xl transition-all ${isLocked ? 'bg-amber-500/5 ring-1 ring-amber-500/10' : ''}`}>
                <div className="flex justify-between items-center px-1">
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">{key.toUpperCase()}</label>
                    <span className="text-[10px] font-mono text-zinc-400">{tokens.spacing[key]}</span>
                  </div>
                  <LockToggle path={path} />
                </div>
                <input
                  type="range"
                  min="0"
                  max="64"
                  step="4"
                  value={parseInt(tokens.spacing[key]) || 0}
                  onChange={(e) => updateSpacing(key, `${e.target.value}px`)}
                  className="w-full accent-blue-600 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full appearance-none cursor-pointer"
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Border Radius</h3>
        <div className="grid grid-cols-3 gap-4">
          {(['sm', 'md', 'lg'] as const).map((key) => {
            const path = `radius.${key}`;
            const isLocked = lockedTokens[path];

            return (
              <div key={key} className={`flex flex-col gap-2 p-1 rounded-2xl transition-all ${isLocked ? 'bg-amber-500/5 ring-1 ring-amber-500/10' : ''}`}>
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 ml-1">{key.toUpperCase()}</label>
                  <LockToggle path={path} />
                </div>
                <input
                  type="text"
                  value={tokens.radius[key]}
                  onChange={(e) => updateRadius(key, e.target.value)}
                  className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-purple-500 transition-colors text-center font-mono"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
