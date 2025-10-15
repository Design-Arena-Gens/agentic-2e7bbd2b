import { NextRequest, NextResponse } from 'next/server';
import { analyzeText } from '../../../lib/grammar';

export async function POST(req: NextRequest) {
  try {
    const { text, options } = await req.json();
    const result = analyzeText(String(text || ''), {
      tone: String(options?.tone || 'Neutral'),
      style: String(options?.style || 'Concise'),
      audience: String(options?.audience || 'General'),
    });
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ suggestions: [] }, { status: 400 });
  }
}
