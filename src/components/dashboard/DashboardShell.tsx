'use client';

import { useTokenStore } from '@/store/tokenStore';
import { ReactNode, useMemo } from 'react';

interface DashboardShellProps {
  children: ReactNode;
}

export const DashboardShell = ({ children }: DashboardShellProps) => {
  const { tokens } = useTokenStore();

  const cssVariables = useMemo(() => {
    if (!tokens) return {};

    const variables: Record<string, string> = {};

    // Colors
    Object.entries(tokens.colors).forEach(([key, value]) => {
      variables[`--color-${key}`] = value;
    });

    // Typography
    variables[`--font-family`] = tokens.typography.fontFamily;
    variables[`--font-size-h1`] = tokens.typography.h1;
    variables[`--font-size-h2`] = tokens.typography.h2;
    variables[`--font-size-h3`] = tokens.typography.h3;
    variables[`--font-size-body`] = tokens.typography.body;
    variables[`--font-size-caption`] = tokens.typography.caption;
    variables[`--line-height`] = tokens.typography.lineHeight;

    // Spacing
    Object.entries(tokens.spacing).forEach(([key, value]) => {
      variables[`--spacing-${key}`] = value;
    });

    // Radius
    Object.entries(tokens.radius).forEach(([key, value]) => {
      variables[`--radius-${key}`] = value;
    });

    // Shadows
    Object.entries(tokens.shadows).forEach(([key, value]) => {
      variables[`--shadow-${key}`] = value;
    });

    return variables;
  }, [tokens]);

  return (
    <div 
      className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-500"
      style={cssVariables as React.CSSProperties}
    >
      {children}
    </div>
  );
};
