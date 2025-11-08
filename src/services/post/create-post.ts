/* eslint-disable @typescript-eslint/no-explicit-any */
// src/services/post/create-post.ts
'use server'

import { cookies } from 'next/headers'

export interface CreatePostPayload {
	content: string
	author: string
	thread: string
	parentPost?: string | null
}

export interface CreatePostResponse {
	success: boolean
	statusCode: number
	message: string
	data?: any
}

export async function createPost(payload: CreatePostPayload) {
	try {
		const cookieStore = await cookies()
		const accessToken = cookieStore.get('accessToken')?.value

		if (!accessToken) {
			return {
				success: false,
				error: 'Authentication required',
				data: null,
			}
		}

		const headers: HeadersInit = {
			'Content-Type': 'application/json',
			Authorization: `${accessToken}`,
		}

		const res = await fetch(`${process.env.BACKEND_URL}/post/create-post`, {
			method: 'POST',
			headers,
			body: JSON.stringify(payload),
			cache: 'no-store',
		})

		if (!res.ok) {
			const errorData = await res.json().catch(() => ({}))
			throw new Error(errorData.message || 'Failed to create post')
		}

		const data: CreatePostResponse = await res.json()
		return {
			success: true,
			data: data.data,
			message: data.message,
		}
	} catch (error: any) {
		console.error('Create post error:', error)
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Failed to create post',
			data: null,
		}
	}
}
