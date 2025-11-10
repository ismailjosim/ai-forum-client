/* eslint-disable @typescript-eslint/no-explicit-any */

'use server'

import { cookies } from 'next/headers'

export async function deleteThread(threadId: string) {
	try {
		if (!threadId) {
			throw new Error('Thread ID is required')
		}

		const cookieStore = await cookies()
		const accessToken = cookieStore.get('accessToken')?.value

		const headers: HeadersInit = {
			'Content-Type': 'application/json',
		}

		if (accessToken) {
			headers['Authorization'] = `${accessToken}`
		}

		const res = await fetch(`${process.env.BACKEND_URL}/thread/${threadId}`, {
			method: 'DELETE',
			headers,
			cache: 'no-store',
		})

		if (!res.ok) {
			const errData = await res.json().catch(() => ({}))
			throw new Error(errData.message || 'Failed to delete thread')
		}

		const data = await res.json()

		return {
			success: true,
			message: data.message || 'Thread deleted successfully',
		}
	} catch (error: any) {
		console.error('Delete thread error:', error)
		return {
			success: false,
			message:
				error instanceof Error ? error.message : 'Failed to delete thread',
		}
	}
}
