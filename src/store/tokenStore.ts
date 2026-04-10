import { create } from 'zustand';
import { AnalysisState, AnalysisResponse, Version } from '@/types';
import { DesignTokens } from '@/types/designTokens';

interface TokenStore extends AnalysisState {
  tokens: DesignTokens | null;
  lockedTokens: Record<string, boolean>;
  versionHistory: Version[];
  setLoading: (isLoading: boolean) => void;
  setResult: (result: AnalysisResponse | null) => void;
  setTokens: (tokens: DesignTokens | null) => void;
  setVersionHistory: (history: Version[]) => void;
  setError: (error: string | null) => void;
  setUrl: (url: string) => void;
  lockToken: (path: string) => void;
  unlockToken: (path: string) => void;
  updateColor: (key: keyof DesignTokens['colors'], value: string) => void;
  updateTypography: (key: keyof DesignTokens['typography'], value: string | number) => void;
  updateSpacing: (key: string, value: string) => void;
  updateRadius: (key: keyof DesignTokens['radius'], value: string) => void;
  restoreVersion: (tokens: DesignTokens) => void;
  reset: () => void;
}

export const useTokenStore = create<TokenStore>((set) => ({
  url: '',
  isLoading: false,
  result: null,
  tokens: null,
  lockedTokens: {},
  versionHistory: [],
  error: null,
  setLoading: (isLoading) => set({ isLoading }),
  setResult: (result) => set({ result, isLoading: false, error: null }),
  setTokens: (newTokens) => set((state) => {
    if (!state.tokens || !newTokens) return { tokens: newTokens };
    
    // Merge only if not locked
    const mergedTokens = { ...newTokens };
    
    // Helper to merge nested objects while respecting locks
    const mergeWithLocks = <T extends Record<string, unknown>>(target: T, source: T, prefix: keyof DesignTokens) => {
      Object.keys(source).forEach(key => {
        const path = `${prefix}.${key}`;
        if (state.lockedTokens[path] && state.tokens) {
          const currentTokens = state.tokens[prefix] as Record<string, unknown>;
          (target as any)[key] = currentTokens[key];
        }
      });
    };

    mergeWithLocks(mergedTokens.colors as unknown as Record<string, unknown>, newTokens.colors as unknown as Record<string, unknown>, 'colors');
    mergeWithLocks(mergedTokens.typography as unknown as Record<string, unknown>, newTokens.typography as unknown as Record<string, unknown>, 'typography');
    mergeWithLocks(mergedTokens.spacing, newTokens.spacing, 'spacing');
    mergeWithLocks(mergedTokens.radius as unknown as Record<string, unknown>, newTokens.radius as unknown as Record<string, unknown>, 'radius');

    return { tokens: mergedTokens };
  }),
  setVersionHistory: (versionHistory) => set({ versionHistory }),
  setError: (error) => set({ error, isLoading: false }),
  setUrl: (url) => set({ url }),
  lockToken: (path) => set((state) => ({
    lockedTokens: { ...state.lockedTokens, [path]: true }
  })),
  unlockToken: (path) => set((state) => ({
    lockedTokens: { ...state.lockedTokens, [path]: false }
  })),
  updateColor: (key, value) => set((state) => ({
    tokens: state.tokens ? {
      ...state.tokens,
      colors: { ...state.tokens.colors, [key]: value }
    } : null
  })),
  updateTypography: (key, value) => set((state) => ({
    tokens: state.tokens ? {
      ...state.tokens,
      typography: { ...state.tokens.typography, [key]: value }
    } : null
  })),
  updateSpacing: (key, value) => set((state) => ({
    tokens: state.tokens ? {
      ...state.tokens,
      spacing: { ...state.tokens.spacing, [key]: value }
    } : null
  })),
  updateRadius: (key, value) => set((state) => ({
    tokens: state.tokens ? {
      ...state.tokens,
      radius: { ...state.tokens.radius, [key]: value }
    } : null
  })),
  restoreVersion: (tokens) => set({ tokens }),
  reset: () => set({ url: '', isLoading: false, result: null, tokens: null, lockedTokens: {}, versionHistory: [], error: null }),
}));
