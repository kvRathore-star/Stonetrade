// Server-side Gemini AI client — API key is NEVER exposed to the browser
import { GoogleGenAI } from '@google/genai';

let _genAI: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI | null {
    if (!process.env.GEMINI_API_KEY) {
        console.warn('GEMINI_API_KEY not set — AI features will return fallback responses.');
        return null;
    }
    if (!_genAI) {
        _genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }
    return _genAI;
}

export async function generateAIResponse(prompt: string, systemInstruction?: string): Promise<string> {
    const genAI = getGenAI();
    if (!genAI) {
        return 'AI features are not configured yet. Please set the GEMINI_API_KEY environment variable.';
    }

    try {
        const response = await genAI.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: prompt,
            config: {
                systemInstruction: systemInstruction || 'You are StoneTrade AI, an expert assistant for the natural stone industry in India. Help users find marble, granite, sandstone, and other stones for their projects.',
                maxOutputTokens: 1024,
                temperature: 0.7,
            },
        });
        return response.text || 'I apologize, I could not generate a response at this time.';
    } catch (error) {
        console.error('Gemini API error:', error);
        return 'I apologize, the AI service is temporarily unavailable. Please try again.';
    }
}
