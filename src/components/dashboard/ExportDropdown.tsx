'use client';

import { useTokenStore } from '@/store/tokenStore';
import { exportToJSON, exportToCSS, exportToTailwind, exportToSCSS } from '@/services/exportService';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ExportDropdown = () => {
  const { tokens } = useTokenStore();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  if (!tokens) return null;

  const handleExport = (format: 'JSON' | 'CSS' | 'Tailwind' | 'SCSS') => {
    let content = '';
    switch (format) {
      case 'JSON': content = exportToJSON(tokens); break;
      case 'CSS': content = exportToCSS(tokens); break;
      case 'Tailwind': content = exportToTailwind(tokens); break;
      case 'SCSS': content = exportToSCSS(tokens); break;
    }

    navigator.clipboard.writeText(content);
    setCopied(format);
    setTimeout(() => setCopied(null), 2000);
  };

  const options = ['JSON', 'CSS', 'Tailwind', 'SCSS'] as const;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-6 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-sm font-bold flex items-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        Export Tokens
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-3 w-48 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-100 dark:border-zinc-800 p-2 z-40 overflow-hidden"
            >
              {options.map((format) => (
                <button
                  key={format}
                  onClick={() => handleExport(format)}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm font-semibold transition-colors flex items-center justify-between group"
                >
                  <span className={copied === format ? 'text-green-500' : ''}>
                    {format === 'CSS' ? 'CSS Variables' : format}
                  </span>
                  {copied === format ? (
                    <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-zinc-300 group-hover:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                    </svg>
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
