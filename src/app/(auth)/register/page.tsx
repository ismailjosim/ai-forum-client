import Link from 'next/link'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import RegisterForm from '@/components/modules/Auth/RegisterForm'
import SocialSignup from '@/components/modules/Auth/SocialSignup'

const RegisterPage = () => {
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
						<CardTitle className='text-xl'>Create Account</CardTitle>
						<CardDescription className='mt-1'>
							Sign up to start your conversation journey
						</CardDescription>
					</div>
				</CardHeader>

				<CardContent>
					<RegisterForm />
				</CardContent>
			</Card>
		</div>
	)
}

export default RegisterPage
