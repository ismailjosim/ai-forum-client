import Link from 'next/link'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import SocialSignup from '@/components/modules/Auth/SocialSignup'
import RegisterForm from '../../../components/modules/Auth/RegisterForm'

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
						<CardTitle className='text-xl'>
							Create Your ConverseAi Account
						</CardTitle>
						<CardDescription className='mt-1'></CardDescription>
					</div>

					{/* Google Sign Up Button */}
					<SocialSignup />
					{/* Divider */}
					<div className='flex items-center gap-4'>
						<Separator className='flex-1' />
						<span className='text-sm font-medium text-muted-foreground'>
							OR
						</span>
						<Separator className='flex-1' />
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
