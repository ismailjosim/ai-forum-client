import { ThreadsList } from '@/components/modules/Threads/ThreadsList'

const ThreadsPage = () => {
	return (
		<main className='flex-1 overflow-y-auto p-6 md:p-10 bg-gray-50 min-h-screen'>
			<ThreadsList />
		</main>
	)
}

export default ThreadsPage
