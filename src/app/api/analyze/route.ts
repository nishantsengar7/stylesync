import { NextResponse } from 'next/server';
import { analyzeSchema } from '@/lib/validators';
import { scrapeWebsite } from '@/services/scraper';
import { extractDesignTokens } from '@/services/tokenExtractor';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate request body
    const result = analyzeSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { url } = result.data;

    // Run scraper
    const analysis = await scrapeWebsite(url);
    
    if (!analysis.success) {
      return NextResponse.json(
        { success: false, error: analysis.error || 'Failed to analyze website' },
        { status: 500 }
      );
    }

    // Extract structured design tokens
    const tokens = extractDesignTokens(analysis);

    // Save to database
    try {
      await prisma.designToken.create({
        data: {
          siteUrl: url,
          tokens: tokens as unknown as import('@prisma/client').Prisma.InputJsonValue,
        }
      });
    } catch (dbError) {
      console.error('Database Save Error:', dbError);
      // Continue even if DB fails, core feature is analysis
    }

    return NextResponse.json({
      success: true,
      site: analysis.site,
      styles: analysis.styles,
      tokens
    });
  } catch (error: unknown) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
