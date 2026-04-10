'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeSchema } from '@/lib/validators';
import { useTokenStore } from '@/store/tokenStore';
import axios, { isAxiosError } from 'axios';
import { z } from 'zod';

type FormData = z.infer<typeof analyzeSchema>;

export const UrlInputCard = () => {
  const { isLoading, setLoading, setResult, setTokens, setError, error: storeError, setUrl: setStoreUrl } = useTokenStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(analyzeSchema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setStoreUrl(data.url);
    try {
      const response = await axios.post('/api/analyze', { url: data.url });
      setResult(response.data);
      if (response.data.tokens) {
        setTokens(response.data.tokens);
      }
    } catch (err: unknown) {
      console.error(err);
      const errorMessage = isAxiosError(err) 
        ? err.response?.data?.error 
        : 'Something went wrong. Please try again.';
      setError(errorMessage || 'Something went wrong. Please try again.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-8 border border-zinc-200 dark:border-zinc-800"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 mb-2">
          Analyze Website Design
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Paste a website URL to extract its design system tokens and style guides.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="relative group">
          <input
            {...register('url')}
            type="text"
            placeholder="https://example.com"
            autoComplete="off"
            disabled={isLoading}
            className={`w-full px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border text-lg focus:outline-none focus:ring-4 transition-all duration-300 ${
              errors.url 
                ? 'border-red-400 focus:ring-red-100 dark:focus:ring-red-900/20' 
                : 'border-zinc-200 dark:border-zinc-800 focus:border-purple-500 focus:ring-purple-100 dark:focus:ring-purple-900/20 group-hover:border-purple-300 dark:group-hover:border-zinc-700'
            }`}
          />
          <AnimatePresence>
            {errors.url && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-500 text-sm mt-2 ml-2"
              >
                {errors.url.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-center relative overflow-hidden ${
            isLoading 
              ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed border border-zinc-200 dark:border-zinc-700' 
              : 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-zinc-400 border-t-zinc-600 dark:border-zinc-600 dark:border-t-zinc-400 rounded-full animate-spin" />
              <span>Analyzing...</span>
            </div>
          ) : (
            'Analyze Design'
          )}
        </button>

        <AnimatePresence>
          {storeError && !isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-4 p-4 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 text-center text-sm font-medium"
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {storeError}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
};
