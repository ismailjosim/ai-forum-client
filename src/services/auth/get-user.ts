'use server'

import { cookies } from 'next/headers'

export interface User {
	_id: string
	name: string
	email: string
	picture: string | null
	role: 'USER' | 'ADMIN' | string
	isActive: 'ACTIVE' | 'INACTIVE' | string
	isDeleted: boolean
	isVerified: boolean
	createdAt: string
	updatedAt: string
}

export async function getUserProfile(): Promise<User | null> {
	try {
		const cookieStore = await cookies()
		const accessToken = cookieStore.get('accessToken')?.value

		if (!accessToken) {
			return null
		}

		// Fetch user data from your API `${process.env.BACKEND_URL}//user/me`
		const res = await fetch(`${process.env.BACKEND_URL}/user/me`, {
			headers: {
				Authorization: `${accessToken}`,
			},
			cache: 'no-store',
		})

		if (!res.ok) {
			return null
		}

		const data = await res.json()
		return data.data as User
	} catch (error) {
		console.error('Error getting current user:', error)
		return null
	}
}
