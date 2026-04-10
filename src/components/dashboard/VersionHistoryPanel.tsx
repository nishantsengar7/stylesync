'use client';

import { useTokenStore } from '@/store/tokenStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';


import { Version } from '@/types';

export const VersionHistoryPanel = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const { url, restoreVersion, versionHistory, setVersionHistory } = useTokenStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const fetchHistory = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/history?url=${encodeURIComponent(url)}`);
      setVersionHistory(response.data.history);
    } catch (err) {
      console.error('Failed to fetch history', err);
    } finally {
      setIsLoading(false);
    }
  }, [url, setVersionHistory]);

  useEffect(() => {
    setIsMounted(true);
    if (isOpen && url) {
      fetchHistory();
    }
  }, [isOpen, url, fetchHistory]);

  const handleRestore = (version: Version) => {
    restoreVersion(version.tokens);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-80 bg-white dark:bg-zinc-900 shadow-2xl z-50 border-l border-zinc-200 dark:border-zinc-800 flex flex-col"
          >
            <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-900/50">
              <h2 className="text-lg font-bold flex items-center gap-2">
                 <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
                 History
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-40 gap-4 opacity-50">
                  <div className="w-6 h-6 border-2 border-zinc-300 border-t-purple-600 rounded-full animate-spin" />
                  <span className="text-xs font-medium">Fetching history...</span>
                </div>
              ) : versionHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-center space-y-2 opacity-40">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span className="text-xs italic">No versions saved yet.</span>
                </div>
              ) : (
                versionHistory.map((v: Version) => (
                  <motion.div
                    key={v.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-purple-200 dark:hover:border-purple-900 group transition-all"
                  >
                    <div className="flex justify-between items-start mb-2">
                       <span className="text-xs font-bold px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-500">
                         v{v.version}
                       </span>
                       <span className="text-[10px] text-zinc-400">
                         {isMounted ? new Date(v.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '...'}
                       </span>
                    </div>
                    <p className="text-[10px] text-zinc-400 mb-4 font-mono truncate">
                      Snapshot taken on {isMounted ? new Date(v.createdAt).toLocaleDateString() : '...'}
                    </p>
                    <button
                      onClick={() => handleRestore(v)}
                      className="w-full py-2 bg-zinc-900 dark:bg-zinc-800 text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all hover:bg-purple-600 active:scale-95 shadow-lg shadow-purple-500/10"
                    >
                      Restore Version
                    </button>
                  </motion.div>
                ))
              )}
            </div>
            
            <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 text-center">
               <p className="text-[10px] text-zinc-400 italic">
                 Last 10 snapshots are tracked for the active URL.
               </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
