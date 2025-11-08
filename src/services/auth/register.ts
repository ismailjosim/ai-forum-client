/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { z } from 'zod'
import { redirect } from 'next/navigation'

const registerValidationSchema = z.object({
	name: z
		.string()
		.min(2, 'Name must be at least 2 characters')
		.max(100, 'Name must be less than 100 characters'),
	email: z.string().email('Invalid email address'),
	password: z
		.string()
		.min(6, 'Password must be at least 6 characters')
		.max(100, 'Password must be less than 100 characters'),
})

export const registerUser = async (
	_currentState: any,
	formData: FormData,
): Promise<any> => {
	try {
		// Extract form data
		const rawData = {
			name: formData.get('name'),
			email: formData.get('email'),
			password: formData.get('password'),
		}

		// Validate the input fields
		const validatedFields = registerValidationSchema.safeParse(rawData)

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
		const res = await fetch(`${process.env.BACKEND_URL}/user/register`, {
			method: 'POST',
			body: JSON.stringify(validatedFields.data),
			headers: {
				'Content-Type': 'application/json',
			},
		})

		if (!res.ok) {
			const errorData = await res.json().catch(() => ({}))
			throw new Error(
				errorData?.message || 'Registration failed. Please try again.',
			)
		}

		// Redirect to login page after successful registration
		redirect('/login')
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
							: 'Registration failed. Please try again.',
				},
			],
		}
	}
}
