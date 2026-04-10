'use client';

import { UrlInputCard } from '@/components/UrlInputCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { ResultCard } from '@/components/ResultCard';
import { useTokenStore } from '@/store/tokenStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { isLoading, result, reset } = useTokenStore();
  const router = useRouter();

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-[family-name:var(--font-geist-sans)]">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500/10 dark:bg-purple-900/20 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 -right-4 w-96 h-96 bg-blue-500/10 dark:bg-blue-900/20 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 py-20 flex flex-col items-center">
        <div className="mb-20 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-500 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              StyleSync Beta
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white mb-6">
              Instant Website <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-600">
                Design Extractor
              </span>
            </h1>
        </div>

        <UrlInputCard />

        <div className="w-full flex justify-center py-12">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <LoadingSkeleton />
                </motion.div>
              ) : result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full flex flex-col items-center gap-12"
                >
                  <div className="flex gap-4">
                    <button 
                      onClick={() => router.push('/dashboard')}
                      className="px-8 py-4 bg-purple-600 text-white rounded-2xl font-bold hover:bg-purple-700 active:scale-[0.98] transition-all shadow-xl shadow-purple-500/20 flex items-center gap-3"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                      Open in Dashboard
                    </button>
                    <button 
                      onClick={() => reset()}
                      className="px-8 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl font-bold hover:bg-zinc-50 transition-all"
                    >
                      New Analysis
                    </button>
                  </div>
                  <ResultCard data={result} />
                </motion.div>
              ) : null}
            </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
