import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { url, tokens, changes } = await req.json();

    if (!url || !tokens) {
      return NextResponse.json({ error: 'URL and tokens are required' }, { status: 400 });
    }

    // Get current version count for this site
    const count = await prisma.versionHistory.count({
      where: { siteUrl: url },
    });

    const version = await prisma.versionHistory.create({
      data: {
        siteUrl: url,
        version: count + 1,
        tokens: tokens,
        changes: changes || {},
      },
    });

    return NextResponse.json({ success: true, version });
  } catch (error: unknown) {
    console.error('History Save Error:', error);
    return NextResponse.json({ error: 'Failed to save version' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const history = await prisma.versionHistory.findMany({
      where: { siteUrl: url },
      orderBy: { version: 'desc' },
      take: 10,
    });

    return NextResponse.json({ success: true, history });
  } catch (error: unknown) {
    console.error('History Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
  }
}
