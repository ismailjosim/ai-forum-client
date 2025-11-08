'use client'
import Image from 'next/image'
import { Button } from '../../ui/button'
import { signIn } from 'next-auth/react'
const SocialSignup = () => {
	const handleSocialLogin = (provider: 'google' | 'github') => {
		signIn(provider, {
			callbackUrl: 'http://localhost:3000',
		})
	}
	return (
		<Button
			variant='outline'
			className='flex w-full items-center justify-center gap-2'
			onClick={() => handleSocialLogin('google')}
		>
			{/* Google */}
			<Image
				src='https://img.icons8.com/color/24/google-logo.png'
				alt='Google'
				className='w-5 h-5'
				width={20}
				height={20}
			/>
			Login with Google
		</Button>
	)
}

export default SocialSignup
