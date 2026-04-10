'use client';

import { motion } from 'framer-motion';
import { AnalysisResponse } from '@/types';

interface ResultCardProps {
  data: AnalysisResponse;
}

const StyleItem = ({ label, value, color }: { label: string; value: string; color?: string }) => (
  <div className="flex flex-col p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-purple-300 dark:hover:border-purple-900/50 transition-colors group">
    <span className="text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-bold mb-2">{label}</span>
    <div className="flex items-center justify-between">
      <span className="text-lg font-medium text-zinc-900 dark:text-zinc-100 truncate pr-4">{value}</span>
      {color && (
        <div 
          className="w-8 h-8 rounded-lg shadow-inner flex-shrink-0 group-hover:scale-110 transition-transform" 
          style={{ backgroundColor: color }}
        />
      )}
    </div>
  </div>
);

export const ResultCard = ({ data }: ResultCardProps) => {
  if (!data.success) {
    return (
      <div className="w-full max-w-4xl p-8 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-3xl text-red-600">
        Error: {data.error}
      </div>
    );
  }

  const { site, styles } = data;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-8 border border-zinc-200 dark:border-zinc-800"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-zinc-100 dark:border-zinc-800 pb-8">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">{site.title || 'Extracted Site'}</h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-xl line-clamp-2">
            {site.description || 'No description found for this website.'}
          </p>
        </div>
        <div className="px-4 py-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full text-xs font-bold border border-purple-100 dark:border-purple-900/30 uppercase tracking-widest">
          Analysis Complete
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StyleItem 
          label="Background Color" 
          value={styles.backgroundColor} 
          color={styles.backgroundColor} 
        />
        <StyleItem 
          label="Primary Brand Color" 
          value={styles.primaryButtonColor} 
          color={styles.primaryButtonColor} 
        />
        <StyleItem 
          label="Heading Font Family" 
          value={styles.fontFamily} 
        />
        <StyleItem 
          label="Heading Font Size" 
          value={styles.headingFontSize} 
        />
        <StyleItem 
          label="Buttons Detected" 
          value={styles.stylesheetsCount ? `${styles.stylesheetsCount} stylesheets` : 'Built-in'} 
        />
        <StyleItem 
            label="Base Color Style"
            value={styles.backgroundColor.includes('rgba(0,0,0,0)') ? 'Transparent' : 'Solid'}
        />
      </div>

      <div className="mt-12 flex justify-center">
        <p className="text-xs text-zinc-400 dark:text-zinc-600 italic">
          * Styles are extracted based on computed CSS properties of the homepage.
        </p>
      </div>
    </motion.div>
  );
};
