/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import jwt from 'jsonwebtoken'

export interface ThreadData {
	title: string
	content: string
	category: string
}

export const createThread = async (data: ThreadData) => {
	try {
		// Get access token from cookies
		const cookieStore = await cookies()
		const accessToken = cookieStore.get('accessToken')?.value

		if (!accessToken) {
			// Redirect to login if no token
			redirect('/login')
		}

		// Decode JWT to get userId
		const decoded = jwt.verify(
			accessToken,
			process.env.JWT_ACCESS_SECRET as string,
		) as any

		const threadPayload = {
			...data,
			author: decoded.userId,
		}

		// Make API call with authorization header
		const res = await fetch(`${process.env.BACKEND_URL}/thread/create-thread`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${accessToken}`,
			},
			body: JSON.stringify(threadPayload),
			cache: 'no-store',
		})

		if (!res.ok) {
			const errorData = await res.json().catch(() => ({}))
			throw new Error(
				errorData?.message || 'Failed to create thread. Please try again.',
			)
		}

		const threadData = await res.json()
		console.log(threadData)
		return {
			success: true,
			data: threadData,
		}
	} catch (error: any) {
		// Allow Next.js redirects to propagate
		if (error?.digest?.startsWith('NEXT_REDIRECT')) {
			throw error
		}

		console.error('Create thread error:', error)
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Failed to create thread',
		}
	}
}
