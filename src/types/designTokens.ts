export interface ColorTokens {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
}

export interface TypographyTokens {
  fontFamily: string;
  h1: string;
  h2: string;
  h3: string;
  body: string;
  caption: string;
  lineHeight: string;
  fontWeight: {
    regular: number;
    medium: number;
    bold: number;
  };
}

export interface DesignTokens {
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: Record<string, string>;
  radius: {
    sm: string;
    md: string;
    lg: string;
  };
  shadows: {
    card: string;
    button: string;
  };
}

export interface AnalysisResponseExtra extends DesignTokens {
  site: {
    title: string;
    description: string;
  };
}
