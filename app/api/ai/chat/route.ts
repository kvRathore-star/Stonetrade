import { NextResponse } from 'next/server';
import { generateAIResponse } from '@/lib/gemini';

export async function POST(request: Request) {
    try {
        const { prompt, systemInstruction } = await request.json();

        if (!prompt || typeof prompt !== 'string') {
            return NextResponse.json({ error: 'Invalid prompt' }, { status: 400 });
        }

        // Basic rate limiting check (in production, use a proper rate limiter)
        const response = await generateAIResponse(prompt, systemInstruction);

        return NextResponse.json({ response });
    } catch (error) {
        console.error('AI Chat API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
