'use client';

import { useTokenStore } from '@/store/tokenStore';


export const PreviewPanel = () => {
  const { tokens } = useTokenStore();

  if (!tokens) return null;

  return (
    <div className="w-full flex-1 overflow-y-auto px-8 py-12 bg-zinc-50 dark:bg-zinc-950/20">
      <div className="max-w-4xl mx-auto space-y-20">
        
        {/* Buttons Section */}
        <section className="space-y-8">
          <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-800 pb-4">Buttons</h2>
          <div className="flex flex-wrap gap-6 items-center">
            <button 
              className="px-8 py-3 transition-all font-semibold active:scale-95"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-background)',
                borderRadius: 'var(--radius-sm)',
                boxShadow: 'var(--shadow-button)',
                fontFamily: 'var(--font-family)',
              }}
            >
              Primary Button
            </button>
            <button 
              className="px-8 py-3 transition-all font-semibold active:scale-95 border"
              style={{
                backgroundColor: 'var(--color-secondary)',
                color: 'var(--color-textPrimary)',
                borderColor: 'var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-family)',
              }}
            >
              Secondary Button
            </button>
            <button 
              className="px-8 py-3 transition-all font-semibold active:scale-95 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              style={{
                color: 'var(--color-primary)',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-family)',
              }}
            >
              Ghost Button
            </button>
          </div>
        </section>

        {/* Form Inputs Section */}
        <section className="space-y-8">
          <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-800 pb-4">Input Fields</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-semibold ml-1" style={{ color: 'var(--color-textSecondary)' }}>Default State</label>
              <input 
                placeholder="Enter some text..."
                className="w-full px-5 py-3 border focus:outline-none transition-all"
                style={{
                  backgroundColor: 'white',
                  borderColor: 'var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'var(--font-size-body)',
                  fontFamily: 'var(--font-family)',
                }}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold ml-1" style={{ color: 'var(--color-textSecondary)' }}>Focus State</label>
              <input 
                placeholder="Always focused..."
                className="w-full px-5 py-3 border transition-all"
                style={{
                  backgroundColor: 'white',
                  borderColor: 'var(--color-primary)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'var(--font-size-body)',
                  fontFamily: 'var(--font-family)',
                  boxShadow: '0 0 0 3px rgba(108, 62, 244, 0.1)',
                }}
              />
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className="space-y-8">
          <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-800 pb-4">Cards & Shadows</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div 
              className="p-8 border transition-all"
              style={{
                backgroundColor: 'var(--color-background)',
                borderColor: 'var(--color-border)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-card)',
                fontFamily: 'var(--font-family)',
              }}
            >
              <h3 className="mb-4 font-bold" style={{ fontSize: 'var(--font-size-h3)', color: 'var(--color-textPrimary)' }}>Design Card</h3>
              <p style={{ fontSize: 'var(--font-size-body)', color: 'var(--color-textSecondary)', lineHeight: 'var(--line-height)' }}>
                This card uses your custom font family, radii, and shadows automatically.
              </p>
              <div className="mt-8 flex gap-4" style={{ marginTop: 'var(--spacing-md)' }}>
                 <div className="w-10 h-10 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }} />
                 <div className="w-10 h-10 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }} />
              </div>
            </div>
          </div>
        </section>

        {/* Typography Scale Section */}
        <section className="space-y-8">
          <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-800 pb-4">Typography Scale</h2>
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-zinc-400">Heading 1</span>
              <h1 style={{ fontSize: 'var(--font-size-h1)', fontWeight: 700, fontFamily: 'var(--font-family)', color: 'var(--color-textPrimary)' }}>The quick brown fox</h1>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-zinc-400">Heading 2</span>
              <h2 style={{ fontSize: 'var(--font-size-h2)', fontWeight: 600, fontFamily: 'var(--font-family)', color: 'var(--color-textPrimary)' }}>Jumps over the lazy dog</h2>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-zinc-400">Body Text</span>
              <p style={{ fontSize: 'var(--font-size-body)', fontFamily: 'var(--font-family)', color: 'var(--color-textSecondary)', lineHeight: 'var(--line-height)' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
