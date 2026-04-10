import { DesignTokens } from "@/types/designTokens";
import { normalizeFontSize } from "@/utils/typographyUtils";
import { generateSpacingScale } from "@/utils/spacingUtils";
import { classifyColors } from "./colorAnalyzer";
import { ScrapedData } from "@/types";

export const extractDesignTokens = (scrapedData: ScrapedData): DesignTokens => {
  const { styles } = scrapedData;

  // 1. Colors
  const rawColors = [
    styles.backgroundColor,
    styles.primaryButtonColor,
    // Add more if scraper gets them
  ];
  const colors = classifyColors(rawColors);

  // 2. Typography
  const typography = {
    fontFamily: styles.fontFamily || 'Inter',
    h1: normalizeFontSize(styles.headingFontSize || '32px'),
    h2: normalizeFontSize('24px'),
    h3: normalizeFontSize('20px'),
    body: normalizeFontSize('16px'),
    caption: normalizeFontSize('12px'),
    lineHeight: '1.5',
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700,
    }
  };

  // 3. Spacing
  const spacing = generateSpacingScale();

  // 4. Radius
  const radius = {
    sm: '4px',
    md: '8px',
    lg: '16px',
  };

  // 5. Shadows
  const shadows = {
    card: '0 4px 6px rgba(0,0,0,0.1)',
    button: '0 2px 4px rgba(0,0,0,0.08)',
  };

  return {
    colors,
    typography,
    spacing,
    radius,
    shadows,
  };
};
