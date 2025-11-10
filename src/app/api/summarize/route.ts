import { GoogleGenAI } from '@google/genai'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	try {
		const { content } = await req.json()

		if (!content) {
			return NextResponse.json(
				{ error: 'Content is required' },
				{ status: 400 },
			)
		}

		const ai = new GoogleGenAI({
			apiKey: process.env.GOOGLE_AI_API_KEY,
		})

		const response = await ai.models.generateContent({
			model: 'gemini-2.5-flash',
			contents: `Please provide a concise summary of the following content in 2-3 sentences:\n\n${content}`,
		})

		return NextResponse.json({ summary: response.text })
	} catch (error) {
		console.error('Error generating summary:', error)
		return NextResponse.json(
			{ error: 'Failed to generate summary' },
			{ status: 500 },
		)
	}
}
