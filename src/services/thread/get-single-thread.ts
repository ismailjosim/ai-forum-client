/* eslint-disable @typescript-eslint/no-explicit-any */
// src/services/thread/get-single-thread.ts
'use server'

import { cookies } from 'next/headers'

export interface IAuthorInterface {
	_id: string
	picture: string
	name: string
	role: string
	isVerified: boolean
}

export interface Thread {
	_id: string
	title: string
	content: string
	category: string
	author: IAuthorInterface
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
}

export interface ThreadPost {
	_id: string
	thread: string
	content: string
	author: IAuthorInterface
	parentPost: string | null
	isDeleted: boolean
	createdAt: string
	updatedAt: string
}

export interface ThreadData {
	thread: Thread
	threadPost: ThreadPost[]
}

export interface ThreadResponse {
	success: boolean
	statusCode: number
	message: string
	data: ThreadData
}

export async function getSingleThread(id: string) {
	try {
		const cookieStore = await cookies()
		const accessToken = cookieStore.get('accessToken')?.value

		const headers: HeadersInit = {
			'Content-Type': 'application/json',
		}

		if (accessToken) {
			headers['Authorization'] = `${accessToken}`
		}

		const res = await fetch(`${process.env.BACKEND_URL}/thread/${id}`, {
			method: 'GET',
			headers,
			cache: 'no-store',
		})

		if (!res.ok) {
			throw new Error('Failed to fetch thread')
		}

		const data: ThreadResponse = await res.json()
		return {
			success: true,
			data: data.data,
		}
	} catch (error: any) {
		console.error('Get single thread error:', error)
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Failed to fetch thread',
			data: null,
		}
	}
}
