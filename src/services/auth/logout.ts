/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function logoutUser() {
	try {
		const cookieStore = await cookies()

		// Delete cookies
		cookieStore.delete('accessToken')
		cookieStore.delete('refreshToken')

		// Redirect to login page
		redirect('/login')
	} catch (error: any) {
		// Allow Next.js redirects to propagate
		if (error?.digest?.startsWith('NEXT_REDIRECT')) {
			throw error
		}
		console.error('Logout error:', error)
	}
}
