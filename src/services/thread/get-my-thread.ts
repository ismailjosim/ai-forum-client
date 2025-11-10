/* eslint-disable @typescript-eslint/no-explicit-any */

'use server'

import { cookies } from 'next/headers'
import { IThread } from './get-threads'

export async function getMyThreads(page = 1, limit = 5, searchTerm = '') {
	try {
		const cookieStore = await cookies()
		const accessToken = cookieStore.get('accessToken')?.value

		const headers: HeadersInit = {
			'Content-Type': 'application/json',
		}

		if (accessToken) {
			headers['Authorization'] = `${accessToken}`
		}
		const res = await fetch(
			`${process.env.BACKEND_URL}/thread/my-thread?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
			{
				method: 'GET',
				headers,
				cache: 'no-store',
			},
		)

		if (!res.ok) {
			throw new Error('Failed to fetch user threads')
		}

		const data = await res.json()

		return {
			success: true,
			data: (data.data || []) as IThread[],
			meta: data.meta || {},
		}
	} catch (error: any) {
		console.error('Get my threads error:', error)
		return {
			success: false,
			error:
				error instanceof Error ? error.message : 'Failed to fetch user threads',
			data: [] as IThread[],
			meta: {},
		}
	}
}
