import { ColorTokens } from "@/types/designTokens";

export const classifyColors = (rawColors: string[]): ColorTokens => {
    // Normalize and filter unique colors
    const uniqueColors = Array.from(new Set(rawColors.filter(c => c && c !== 'transparent' && c !== 'rgba(0, 0, 0, 0)')));
    
    // Default fallback
    const tokens: ColorTokens = {
        primary: "#6C3EF4",
        secondary: "#ffffff",
        accent: "#F59E0B",
        background: "#F9FAFB",
        textPrimary: "#111827",
        textSecondary: "#6B7280",
        border: "#E5E7EB"
    };

    if (uniqueColors.length === 0) return tokens;

    // Advanced classification would involve frequency analysis and contrast checking
    // For Phase 1, we'll pick the most frequent for primary and background
    
    // Heuristic: Most frequent "brand-looking" color (non-white/black/gray)
    const isGray = (color: string) => {
        const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if(!match) return false;
        const [r, g, b] = [parseInt(match[1]), parseInt(match[1]), parseInt(match[1])];
        return Math.abs(r - g) < 20 && Math.abs(g - b) < 20;
    };

    const brandColors = uniqueColors.filter(c => !isGray(c));
    if (brandColors.length > 0) {
        tokens.primary = brandColors[0];
        tokens.accent = brandColors[1] || tokens.primary;
    }

    // Background is usually the most frequent light/dark color
    const lightColors = uniqueColors.filter(c => {
        const match = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if(!match) return false;
        const sum = parseInt(match[1]) + parseInt(match[2]) + parseInt(match[3]);
        return sum > 600; // Light colors
    });

    if (lightColors.length > 0) {
        tokens.background = lightColors[0];
    }
    
    return tokens;
};
