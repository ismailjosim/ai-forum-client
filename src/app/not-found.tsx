import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
	return (
		<main className='min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-indigo-50 to-gray-100 text-center p-6'>
			<div className='max-w-md space-y-6'>
				<h1 className='text-6xl font-extrabold text-indigo-600'>404</h1>
				<h2 className='text-2xl font-semibold text-gray-800'>Page Not Found</h2>
				<p className='text-gray-600'>
					Oops! The page you’re looking for doesn’t exist or has been moved.
				</p>

				<Link
					href='/'
					className='inline-flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:bg-indigo-700 transition duration-300'
				>
					<ArrowLeft className='w-5 h-5' />
					<span>Back to Home</span>
				</Link>
			</div>
		</main>
	)
}
