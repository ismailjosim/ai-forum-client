/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { registerUser } from '@/services/auth/register'
import { Eye, EyeOff, UserPlus } from 'lucide-react'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '../../ui/field'

const RegisterForm = () => {
	const [state, formAction, isPending] = useActionState(registerUser, null)
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

	const getFieldError = (fieldName: string) => {
		if (state && state.errors) {
			const error = state.errors.find((err: any) => err.field === fieldName)
			return error?.message || null
		}
		return null
	}

	return (
		<form action={formAction}>
			<FieldGroup>
				<Field>
					<FieldLabel htmlFor='name'>Full Name</FieldLabel>
					<Input name='name' type='text' placeholder='John Doe' />
					{getFieldError('name') && (
						<FieldDescription className='text-red-500'>
							{getFieldError('name')}
						</FieldDescription>
					)}
				</Field>

				<Field>
					<FieldLabel htmlFor='email'>Email Address</FieldLabel>
					<Input name='email' type='email' placeholder='your@email.com' />
					{getFieldError('email') && (
						<FieldDescription className='text-red-500'>
							{getFieldError('email')}
						</FieldDescription>
					)}
				</Field>

				<Field>
					<FieldLabel htmlFor='password'>Password</FieldLabel>
					<div className='relative'>
						<Input
							name='password'
							type={showPassword ? 'text' : 'password'}
							placeholder='••••••••'
						/>
						<button
							type='button'
							onClick={() => setShowPassword(!showPassword)}
							className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
							aria-label={showPassword ? 'Hide password' : 'Show password'}
						>
							{showPassword ? (
								<EyeOff className='h-5 w-5' />
							) : (
								<Eye className='h-5 w-5' />
							)}
						</button>
					</div>
					{getFieldError('password') && (
						<FieldDescription className='text-red-500'>
							{getFieldError('password')}
						</FieldDescription>
					)}
				</Field>

				<Field>
					<FieldLabel htmlFor='confirmPassword'>Confirm Password</FieldLabel>
					<div className='relative'>
						<Input
							name='confirmPassword'
							type={showConfirmPassword ? 'text' : 'password'}
							placeholder='••••••••'
						/>
						<button
							type='button'
							onClick={() => setShowConfirmPassword(!showConfirmPassword)}
							className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
							aria-label={
								showConfirmPassword ? 'Hide password' : 'Show password'
							}
						>
							{showConfirmPassword ? (
								<EyeOff className='h-5 w-5' />
							) : (
								<Eye className='h-5 w-5' />
							)}
						</button>
					</div>
					{getFieldError('confirmPassword') && (
						<FieldDescription className='text-red-500'>
							{getFieldError('confirmPassword')}
						</FieldDescription>
					)}
				</Field>

				{getFieldError('general') && (
					<FieldDescription className='text-red-500 text-center'>
						{getFieldError('general')}
					</FieldDescription>
				)}

				<Field>
					<Button type='submit' className='w-full' disabled={isPending}>
						{isPending ? 'Creating Account...' : 'Create Account'}
						<UserPlus className='w-4 h-4 ml-2' />
					</Button>

					<FieldDescription className='text-center'>
						Already have an account?{' '}
						<Link href='/login' className='underline-offset-4 hover:underline'>
							Sign In
						</Link>
					</FieldDescription>
				</Field>
			</FieldGroup>
		</form>
	)
}

export default RegisterForm
