'use client';

import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { ColorEditor } from '@/components/dashboard/ColorEditor';
import { TypographyEditor } from '@/components/dashboard/TypographyEditor';
import { SpacingRadiusEditor } from '@/components/dashboard/SpacingRadiusEditor';
import { PreviewPanel } from '@/components/dashboard/PreviewPanel';
import { useTokenStore } from '@/store/tokenStore';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { ExportDropdown } from '@/components/dashboard/ExportDropdown';
import { VersionHistoryPanel } from '@/components/dashboard/VersionHistoryPanel';
import axios from 'axios';

export default function DashboardPage() {
  const { tokens, url, reset } = useTokenStore();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-save version history on token change (debounced 5s to avoid too many versions)
  useEffect(() => {
    if (!tokens || !url) return;

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await axios.post('/api/history', {
          url,
          tokens,
          changes: { type: 'auto-save' }
        });
      } catch (err) {
        console.error('Failed to auto-save version', err);
      }
    }, 5000); // 5s debounce for history snapshots

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [tokens, url]);

  if (!tokens) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-10 border border-zinc-200 dark:border-zinc-800 text-center"
        >
          <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4">No Tokens Found</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8">
            Please analyze a website first to extract its design tokens before using the dashboard.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center justify-center w-full py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Go Back Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <DashboardShell>
      <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
        
        {/* Left Panel: Editor */}
        <aside className="w-full lg:w-[400px] xl:w-[450px] bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col h-full z-20 shadow-xl">
          <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:opacity-80 transition-opacity flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                BACK
              </Link>
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsHistoryOpen(true)}
                  className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors text-zinc-500"
                  title="View Version History"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>
            <h1 className="text-xl font-black tracking-tight flex items-center gap-3">
              Design System <span className="text-purple-600">Editor</span>
            </h1>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-2">
            <ColorEditor />
            <TypographyEditor />
            <SpacingRadiusEditor />
          </div>

          <div className="p-6 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
             <button 
                onClick={() => reset()}
                className="w-full py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 rounded-xl font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all text-xs uppercase tracking-widest"
              >
                Reset System
              </button>
          </div>
        </aside>

        {/* Right Panel: Preview */}
        <main className="flex-1 flex flex-col relative overflow-hidden h-full">
            <div className="absolute top-0 left-0 right-0 h-16 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md z-10 border-b border-zinc-100 dark:border-zinc-800 flex items-center px-8 justify-between">
              <h2 className="text-sm font-bold flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Live Playground
              </h2>
              <div className="flex items-center gap-4">
                 <ExportDropdown />
                 <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 hidden md:block" />
                 <div className="hidden md:flex gap-4">
                    <div className="w-3 h-3 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                    <div className="w-3 h-3 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                    <div className="w-3 h-3 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                 </div>
              </div>
            </div>
            <PreviewPanel />
        </main>
      </div>

      <VersionHistoryPanel 
        isOpen={isHistoryOpen} 
        onClose={() => setIsHistoryOpen(false)} 
      />
    </DashboardShell>
  );
}
