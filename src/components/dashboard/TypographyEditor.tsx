'use client';

import { useTokenStore } from '@/store/tokenStore';
import { DesignTokens } from '@/types/designTokens';
import { LockToggle } from './LockToggle';

export const TypographyEditor = () => {
  const { tokens, updateTypography, lockedTokens } = useTokenStore();

  if (!tokens) return null;

  const fontSizes: Array<{ key: keyof DesignTokens['typography']; label: string }> = [
    { key: 'h1', label: 'H1 Size' },
    { key: 'h2', label: 'H2 Size' },
    { key: 'body', label: 'Body Text' },
    { key: 'caption', label: 'Caption' },
  ];

  return (
    <div className="space-y-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
      <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">Typography</h3>
      
      <div className={`flex flex-col gap-2 mb-4 p-1 rounded-2xl transition-all ${lockedTokens['typography.fontFamily'] ? 'bg-amber-500/5 ring-1 ring-amber-500/10' : ''}`}>
        <div className="flex justify-between items-center px-1">
          <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 ml-1">Font Family</label>
          <LockToggle path="typography.fontFamily" />
        </div>
        <select
          value={tokens.typography.fontFamily}
          onChange={(e) => updateTypography('fontFamily', e.target.value)}
          className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-purple-500 transition-colors"
        >
          <option value="Inter">Inter (Sans)</option>
          <option value="Roboto">Roboto</option>
          <option value="Outfit">Outfit</option>
          <option value="Playfair Display">Playfair (Serif)</option>
          <option value="ui-sans-serif, system-ui">System Sans</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {fontSizes.map(({ key, label }) => {
          const path = `typography.${key}`;
          const isLocked = lockedTokens[path];
          
          return (
            <div key={key} className={`flex flex-col gap-2 p-1 rounded-2xl transition-all ${isLocked ? 'bg-amber-500/5 ring-1 ring-amber-500/10' : ''}`}>
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 ml-1">{label}</label>
                <LockToggle path={path} />
              </div>
              <input
                type="text"
                value={tokens.typography[key as keyof DesignTokens['typography']] as string}
                onChange={(e) => updateTypography(key, e.target.value)}
                className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 ml-1">Line Height</label>
        <input
          type="range"
          min="1"
          max="2"
          step="0.1"
          value={tokens.typography.lineHeight}
          onChange={(e) => updateTypography('lineHeight', e.target.value)}
          className="w-full accent-purple-600"
        />
        <div className="flex justify-between text-[10px] text-zinc-400 font-mono mt-1">
          <span>1.0</span>
          <span>{tokens.typography.lineHeight}</span>
          <span>2.0</span>
        </div>
      </div>
    </div>
  );
};
