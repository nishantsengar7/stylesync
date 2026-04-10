'use client';

import { useTokenStore } from '@/store/tokenStore';


interface LockToggleProps {
  path: string;
}

export const LockToggle = ({ path }: LockToggleProps) => {
  const { lockedTokens, lockToken, unlockToken } = useTokenStore();
  const isLocked = lockedTokens[path];

  return (
    <button
      onClick={() => isLocked ? unlockToken(path) : lockToken(path)}
      className={`p-1.5 rounded-lg transition-all ${
        isLocked 
          ? 'bg-zinc-900 text-amber-500 shadow-inner' 
          : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'
      }`}
      title={isLocked ? "Unlock token" : "Lock token"}
    >
      {isLocked ? (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-5a2 2 0 00-2-2H6a2 2 0 00-2 2v5a2 2 0 002 2z" />
        </svg>
      )}
    </button>
  );
};
