import { getThreads } from '@/services/thread/get-threads'
import { ThreadsList } from './ThreadsList'

export async function ThreadsListWrapper() {
	const result = await getThreads()

	if (!result.success) {
		return (
			<div className='space-y-8'>
				<h2 className='text-3xl md:text-4xl font-extrabold text-gray-900'>
					All Discussion Threads
				</h2>
				<p className='text-red-600 text-center py-6'>
					Failed to load threads: {result.error}
				</p>
			</div>
		)
	}

	return <ThreadsList initialThreads={result.data} />
}
