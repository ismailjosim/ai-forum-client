/* eslint-disable @typescript-eslint/no-explicit-any */

'use server'

import { cookies } from 'next/headers'

export interface IThread {
	_id: string
	title: string
	content: string
	category: string
	author:
		| string
		| {
				_id: string
				name?: string
				email?: string
				picture?: string | null
		  }
	tags: string[]
	isPinned: boolean
	isLocked: boolean
	isClosed: boolean
	isDeleted: boolean
	views: number
	postCount: number
	isSpam: boolean
	lastActivity: string
	createdAt: string
	updatedAt: string
	__v?: number
}

export async function getThreads(page = 1, limit = 5, searchTerm = '') {
	try {
		const cookieStore = await cookies()
		const accessToken = cookieStore.get('accessToken')?.value

		const headers: HeadersInit = {
			'Content-Type': 'application/json',
		}

		if (accessToken) {
			headers['Authorization'] = `Bearer ${accessToken}`
		}

		const res = await fetch(
			`${process.env.BACKEND_URL}/thread?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
			{
				method: 'GET',
				headers,
				cache: 'no-store',
			},
		)

		if (!res.ok) {
			throw new Error('Failed to fetch threads')
		}

		const data = await res.json()
		return {
			success: true,
			data: data.data || [],
			meta: data.meta || {},
		}
	} catch (error: any) {
		console.error('Get threads error:', error)
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Failed to fetch threads',
			data: [],
			meta: {},
		}
	}
}
