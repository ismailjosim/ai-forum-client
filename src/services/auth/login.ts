/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { z } from 'zod'
import { parse } from 'cookie'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import jwt from 'jsonwebtoken'

const loginValidationSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z
		.string()
		.min(6, 'Password must be at least 6 characters')
		.max(100, 'Password must be less than 100 characters'),
})

export const loginUser = async (
	_currentState: any,
	formData: FormData,
): Promise<any> => {
	try {
		const redirectTo = formData.get('redirect')?.toString() || '/'

		let accessTokenObj: null | any = null
		let refreshTokenObj: null | any = null

		// Extract form data
		const rawData = {
			email: formData.get('email'),
			password: formData.get('password'),
		}

		// Validate the input fields
		const validatedFields = loginValidationSchema.safeParse(rawData)

		if (!validatedFields.success) {
			return {
				success: false,
				errors: validatedFields.error.issues.map((issue) => ({
					field: issue.path[0],
					message: issue.message,
				})),
			}
		}

		// Send to API
		const res = await fetch('http://localhost:5000/api/v1/auth/login', {
			method: 'POST',
			body: JSON.stringify(validatedFields.data),
			headers: {
				'Content-Type': 'application/json',
			},
		})

		if (!res.ok) {
			throw new Error('Login failed. Please check your credentials.')
		}

		// Parse cookies from response
		const setCookieHeaders = res.headers.getSetCookie()
		if (setCookieHeaders && setCookieHeaders.length > 0) {
			setCookieHeaders.forEach((cookie: string) => {
				const parsedCookie = parse(cookie)
				if (parsedCookie['accessToken']) {
					accessTokenObj = parsedCookie
				}
				if (parsedCookie['refreshToken']) {
					refreshTokenObj = parsedCookie
				}
			})
		} else {
			throw new Error('No Set-Cookie header found')
		}

		if (!accessTokenObj || !refreshTokenObj) {
			throw new Error('Authentication tokens are missing')
		}

		// Verify token
		jwt.verify(
			accessTokenObj.accessToken,
			process.env.JWT_ACCESS_SECRET as string,
		)

		// Set cookies
		const cookieStore = await cookies()

		cookieStore.set('accessToken', accessTokenObj.accessToken, {
			secure: true,
			httpOnly: true,
			maxAge: parseInt(accessTokenObj['Max-Age']) || undefined,
			path: accessTokenObj.Path || '/',
			sameSite:
				(accessTokenObj.SameSite as 'strict' | 'lax' | 'none') || 'none',
		})

		cookieStore.set('refreshToken', refreshTokenObj.refreshToken, {
			secure: true,
			httpOnly: true,
			maxAge: parseInt(refreshTokenObj['Max-Age']) || undefined,
			path: refreshTokenObj.Path || '/',
			sameSite:
				(refreshTokenObj.SameSite as 'strict' | 'lax' | 'none') || 'none',
		})

		// Redirect user after successful login
		redirect(redirectTo)
	} catch (error: any) {
		// Allow Next.js redirects to propagate
		if (error?.digest?.startsWith('NEXT_REDIRECT')) {
			throw error
		}
		return {
			success: false,
			errors: [
				{
					field: 'general',
					message:
						error instanceof Error
							? error.message
							: 'Login failed. Please try again.',
				},
			],
		}
	}
}
