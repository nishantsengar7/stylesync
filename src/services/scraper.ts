import { ScraperResponse } from '@/types';
import puppeteer from 'puppeteer';

export async function scrapeWebsite(url: string): Promise<ScraperResponse> {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    
    // Set a realistic viewport
    await page.setViewport({ width: 1280, height: 800 });
    
    // Navigate with timeout
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    const data = await page.evaluate(() => {
      // Helper to get computed styles
      const getStyle = (el: Element | null, prop: string) => {
        if (!el) return '';
        return window.getComputedStyle(el).getPropertyValue(prop);
      };

      // Extract basic info
      const title = document.title || '';
      const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';

      // Style extraction
      const backgroundColor = getStyle(document.body, 'background-color');
      const fontFamily = getStyle(document.body, 'font-family').split(',')[0].replace(/['"]/g, '');
      
      // Heuristic for primary button color
      const buttons = Array.from(document.querySelectorAll('button, a[role="button"], .btn, .button'));
      let primaryButtonColor = '#6C3EF4'; // Default fallback
      
      if (buttons.length > 0) {
        // Try to find the first button that isn't transparent
        for (const btn of buttons) {
          const bg = window.getComputedStyle(btn).backgroundColor;
          if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent' && bg !== 'rgb(255, 255, 255)') {
            primaryButtonColor = bg;
            break;
          }
        }
      }

      // Heading font size (primary H1)
      const h1 = document.querySelector('h1');
      const headingFontSize = h1 ? getStyle(h1, 'font-size') : getStyle(document.body, 'font-size');

      // Stylesheets count
      const stylesheets = document.querySelectorAll('link[rel="stylesheet"]').length;

      return {
        site: {
          title,
          description,
        },
        styles: {
          backgroundColor,
          fontFamily,
          primaryButtonColor,
          headingFontSize,
          stylesheetsCount: stylesheets
        }
      };
    });

    return { success: true, site: data.site, styles: data.styles };
  } catch (error: unknown) {
    console.error('Scraping error:', error);
    const message = error instanceof Error ? error.message : 'Failed to analyze website';
    return { 
      success: false, 
      error: message 
    };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
