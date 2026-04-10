'use client';



export const LoadingSkeleton = () => {
  return (
    <div className="w-full max-w-2xl mt-12 space-y-8 animate-pulse text-center">
      <div className="text-zinc-500 animate-bounce">
        Analyzing your website design system...
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-64 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8">
        <div className="space-y-4">
          <div className="h-6 w-1/3 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
          <div className="h-6 w-full bg-zinc-100 dark:bg-zinc-900 rounded-full" />
          <div className="h-6 w-3/4 bg-zinc-100 dark:bg-zinc-900 rounded-full" />
        </div>
        <div className="grid grid-cols-2 gap-4">
             <div className="aspect-square bg-zinc-200 dark:bg-zinc-800 rounded-2xl" />
             <div className="aspect-square bg-zinc-200 dark:bg-zinc-800 rounded-2xl" />
        </div>
      </div>
    </div>
  );
};
