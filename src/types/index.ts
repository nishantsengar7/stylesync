export interface SiteMetadata {
  title: string;
  description: string;
}

export interface ExtractedStyles {
  backgroundColor: string;
  fontFamily: string;
  primaryButtonColor: string;
  headingFontSize: string;
  stylesheetsCount?: number;
}

import { DesignTokens } from './designTokens';

export interface Version {
  id: string;
  version: number;
  tokens: DesignTokens;
  createdAt: string;
}

export interface ScrapedData {
  site: SiteMetadata;
  styles: ExtractedStyles;
}

export type ScraperResponse = 
  | { success: true; site: SiteMetadata; styles: ExtractedStyles; error?: never }
  | { success: false; error: string; site?: never; styles?: never };

export type AnalysisResponse = ScraperResponse & {
  tokens?: DesignTokens;
};

export interface AnalysisState {
  url: string;
  isLoading: boolean;
  result: AnalysisResponse | null;
  error: string| null;
}
