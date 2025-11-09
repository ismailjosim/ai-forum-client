/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { cookies } from 'next/headers'

export interface INotification {
	_id: string
	userId: string
	type: 'reply' | 'mention' | 'like' | 'system' | 'thread_approved'
	title: string
	message?: string
	threadId?: string
	postId?: string
	triggeredBy?: {
		_id: string
		name: string
		picture?: string
	}
	isRead: boolean
	createdAt: string
	updatedAt: string
}

export interface NotificationResponse {
	success: boolean
	statusCode: number
	message: string
	data: {
		notifications: INotification[]
		unreadCount: number
	}
}

// Get user notifications
export async function getNotifications(
	skip: number = 0,
	limit: number = 20,
	unreadOnly: boolean = false,
) {
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

		const queryParams = new URLSearchParams({
			skip: skip.toString(),
			limit: limit.toString(),
			unreadOnly: unreadOnly.toString(),
		})

		const res = await fetch(
			`${process.env.BACKEND_URL}/notification?${queryParams}`,
			{
				method: 'GET',
				headers,
				cache: 'no-store',
			},
		)

		if (!res.ok) {
			const errorData = await res.json().catch(() => ({}))
			throw new Error(errorData.message || 'Failed to fetch notifications')
		}

		const data: NotificationResponse = await res.json()
		return {
			success: true,
			data: data.data,
			message: data.message,
		}
	} catch (error: any) {
		console.error('Get notifications error:', error)
		return {
			success: false,
			error:
				error instanceof Error
					? error.message
					: 'Failed to fetch notifications',
			data: null,
		}
	}
}

// Get unread count
export async function getUnreadCount() {
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

		const res = await fetch(
			`${process.env.BACKEND_URL}/notification/unread-count`,
			{
				method: 'GET',
				headers,
				cache: 'no-store',
			},
		)

		if (!res.ok) {
			const errorData = await res.json().catch(() => ({}))
			throw new Error(errorData.message || 'Failed to get unread count')
		}

		const data = await res.json()
		return {
			success: true,
			data: data.data,
			message: data.message,
		}
	} catch (error: any) {
		console.error('Get unread count error:', error)
		return {
			success: false,
			error:
				error instanceof Error ? error.message : 'Failed to get unread count',
			data: null,
		}
	}
}

// Mark notifications as read
export async function markNotificationsAsRead(notificationIds: string[]) {
	try {
		const cookieStore = await cookies()
		const accessToken = cookieStore.get('accessToken')?.value

		if (!accessToken) {
			return {
				success: false,
				error: 'Authentication required',
			}
		}

		const headers: HeadersInit = {
			'Content-Type': 'application/json',
			Authorization: `${accessToken}`,
		}

		const res = await fetch(`${process.env.BACKEND_URL}/notification/read`, {
			method: 'PUT',
			headers,
			body: JSON.stringify({ notificationIds }),
			cache: 'no-store',
		})

		if (!res.ok) {
			const errorData = await res.json().catch(() => ({}))
			throw new Error(errorData.message || 'Failed to mark as read')
		}

		const data = await res.json()
		return {
			success: true,
			message: data.message,
		}
	} catch (error: any) {
		console.error('Mark as read error:', error)
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Failed to mark as read',
		}
	}
}

// Mark all notifications as read
export async function markAllNotificationsAsRead() {
	try {
		const cookieStore = await cookies()
		const accessToken = cookieStore.get('accessToken')?.value

		if (!accessToken) {
			return {
				success: false,
				error: 'Authentication required',
			}
		}

		const headers: HeadersInit = {
			'Content-Type': 'application/json',
			Authorization: `${accessToken}`,
		}

		const res = await fetch(
			`${process.env.BACKEND_URL}/notification/read-all`,
			{
				method: 'PUT',
				headers,
				cache: 'no-store',
			},
		)

		if (!res.ok) {
			const errorData = await res.json().catch(() => ({}))
			throw new Error(errorData.message || 'Failed to mark all as read')
		}

		const data = await res.json()
		return {
			success: true,
			message: data.message,
		}
	} catch (error: any) {
		console.error('Mark all as read error:', error)
		return {
			success: false,
			error:
				error instanceof Error ? error.message : 'Failed to mark all as read',
		}
	}
}

// Delete notification
export async function deleteNotification(notificationId: string) {
	try {
		const cookieStore = await cookies()
		const accessToken = cookieStore.get('accessToken')?.value

		if (!accessToken) {
			return {
				success: false,
				error: 'Authentication required',
			}
		}

		const headers: HeadersInit = {
			'Content-Type': 'application/json',
			Authorization: `${accessToken}`,
		}

		const res = await fetch(
			`${process.env.BACKEND_URL}/notification/${notificationId}`,
			{
				method: 'DELETE',
				headers,
				cache: 'no-store',
			},
		)

		if (!res.ok) {
			const errorData = await res.json().catch(() => ({}))
			throw new Error(errorData.message || 'Failed to delete notification')
		}

		const data = await res.json()
		return {
			success: true,
			message: data.message,
		}
	} catch (error: any) {
		console.error('Delete notification error:', error)
		return {
			success: false,
			error:
				error instanceof Error
					? error.message
					: 'Failed to delete notification',
		}
	}
}
