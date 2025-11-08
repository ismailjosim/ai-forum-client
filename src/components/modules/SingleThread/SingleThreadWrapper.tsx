import { getSingleThread } from '@/services/thread/get-single-thread'
import SingleThread from './SingleThread'

interface SingleThreadWrapperProps {
	id: string
}

export async function SingleThreadWrapper({ id }: SingleThreadWrapperProps) {
	const result = await getSingleThread(id)

	if (!result.success || !result.data) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<p className='text-center text-red-500'>
					Failed to load thread: {result.error || 'Unknown error'}
				</p>
			</div>
		)
	}

	return <SingleThread threadData={result.data} />
}
