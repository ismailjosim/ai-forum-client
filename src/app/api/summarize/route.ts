/* eslint-disable @typescript-eslint/no-explicit-any */
import { streamText } from 'ai'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
	try {
		const body = await req.json()
		console.log('Received request body:', JSON.stringify(body, null, 2))

		const { messages } = body

		if (!messages || !Array.isArray(messages)) {
			console.error('Invalid messages format:', messages)
			return new Response('Messages are required', { status: 400 })
		}

		const formattedMessages = messages.map((msg: any) => {
			const textContent =
				msg.parts
					?.filter((part: any) => part.type === 'text')
					.map((part: any) => part.text)
					.join('\n') || ''

			return {
				role: msg.role,
				content: textContent,
			}
		})

		console.log(
			'Formatted messages:',
			JSON.stringify(formattedMessages, null, 2),
		)

		const result = streamText({
			model: 'openai/gpt-4o-mini',
			messages: formattedMessages,
		})

		// Return the streaming response
		return result.toTextStreamResponse()
	} catch (error) {
		console.error('Error in chat route:', error)
		return new Response(
			JSON.stringify({
				error: 'Failed to generate response',
				details: String(error),
			}),
			{ status: 500, headers: { 'Content-Type': 'application/json' } },
		)
	}
}
