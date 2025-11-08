'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Alert, AlertDescription } from '@/components/ui/alert'

import { toast } from 'sonner'
import { loginUser } from '@/utility/actions/login'

const loginSchema = z.object({
	email: z.string().email({ message: 'Please enter a valid email address.' }),
	password: z
		.string()
		.min(6, { message: 'Password must be at least 6 characters long.' }),
})

type LoginFormValues = z.infer<typeof loginSchema>

const LoginForm = () => {
	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl') || '/'
	const router = useRouter()
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: '', password: '' },
	})

	const handleSubmit = async (data: LoginFormValues) => {
		setError('')
		setIsLoading(true)

		try {
			const result = await loginUser(data)

			console.log('Login successful:', result)
			if (result.data.accessToken) {
				// Successful login
				localStorage.setItem('accessToken', result.data.accessToken)
				router.push(callbackUrl)
			} else {
				console.error('Login failed:', result.message)
			}
		} catch (err) {
			setError('Invalid email or password.')
			toast.error('Login failed')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
				{/* Email */}
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type='email' placeholder='you@example.com' {...field} />
							</FormControl>
							<FormMessage className='text-red-500 font-medium' />
						</FormItem>
					)}
				/>

				{/* Password */}
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type='password' placeholder='••••••••' {...field} />
							</FormControl>
							<FormMessage className='text-red-500 font-medium' />
						</FormItem>
					)}
				/>

				{/* General error */}
				{error && (
					<Alert variant='destructive'>
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				)}

				<Button type='submit' className='w-full' disabled={isLoading}>
					{isLoading ? 'Signing In...' : 'Login'}
				</Button>

				<div className='text-center text-sm'>
					Don&apos;t have an account?{' '}
					<Link href='/register' className='text-blue-600 hover:underline'>
						Register
					</Link>
				</div>
			</form>
		</Form>
	)
}

export default LoginForm
