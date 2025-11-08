'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../../ui/form'
import { Separator } from '@/components/ui/separator'
import z from 'zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerUser } from '@/utility/actions/register'

const registerSchema = z
	.object({
		name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
		email: z
			.string()
			.min(1, { message: 'Email is required' })
			.email({ message: 'Must be a valid email' }),
		password: z
			.string()
			.min(6, { message: 'Password must be at least 6 characters' }),
		confirmPassword: z
			.string()
			.min(6, { message: 'Confirm password must be at least 6 characters' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	})

export type UserData = {
	name: string
	email: string
	password: string
}
type RegisterFormValues = z.infer<typeof registerSchema>

const RegisterForm = () => {
	const router = useRouter()

	const form = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	})

	const handleSubmit = async (data: RegisterFormValues) => {
		try {
			const result = await registerUser(data)
			console.log(result)
			if (result.success) {
				router.push('/login')
			} else {
				console.error('Registration failed:', result.message)
			}
		} catch (error) {
			console.error('Registration error:', error)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
				{/* Name */}
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input type='text' placeholder='John Doe' {...field} />
							</FormControl>
							<FormMessage className='text-red-500 font-medium' />
						</FormItem>
					)}
				/>

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

				{/* Confirm Password */}
				<FormField
					control={form.control}
					name='confirmPassword'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<Input type='password' placeholder='••••••••' {...field} />
							</FormControl>
							<FormMessage className='text-red-500 font-medium' />
						</FormItem>
					)}
				/>

				<Button type='submit' className='w-full'>
					Register
				</Button>

				<div className='text-center text-sm'>
					Already have an account?{' '}
					<Link href='/login' className='text-blue-600 hover:underline'>
						Login
					</Link>
				</div>
			</form>
		</Form>
	)
}

export default RegisterForm
