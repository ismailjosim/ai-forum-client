import { MyThreadsTable } from '../../../components/modules/Profile/MyThreadsTable'
import { getMyThreads } from '../../../services/thread/get-my-thread'

export default async function ProfilePage() {
	const { data: threads, success } = await getMyThreads(1, 10)

	if (!success) {
		return (
			<div className='text-red-500 text-center mt-10'>
				Failed to load threads.
			</div>
		)
	}

	return (
		<div className='max-w-6xl mx-auto my-10 space-y-8'>
			<h1 className='text-3xl font-bold text-center'>My Threads</h1>
			<MyThreadsTable threads={threads} />
		</div>
	)
}
