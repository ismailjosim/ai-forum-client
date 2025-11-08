import Link from 'next/link'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import LoginForm from '@/components/modules/Auth/LoginForm'
import SocialSignup from '@/components/modules/Auth/SocialSignup'

const LoginPage = () => {
	return (
		<div className='min-h-screen flex items-center justify-center bg-secondary p-4'>
			<Card className='w-full max-w-md shadow-2xl'>
				<CardHeader className='text-center space-y-4'>
					<div className='flex items-center justify-center space-x-2'>
						<CardTitle className='text-3xl font-extrabold'>
							ConverseAi
						</CardTitle>
					</div>
					<div>
						<CardTitle className='text-xl'>Welcome Back</CardTitle>
						<CardDescription className='mt-1'>
							Sign in to continue your conversation
						</CardDescription>
					</div>
				</CardHeader>

				<CardContent>
					<LoginForm />
				</CardContent>
			</Card>
		</div>
	)
}

export default LoginPage
