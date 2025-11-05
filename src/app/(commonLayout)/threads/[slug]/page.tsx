import { notFound } from 'next/navigation'

interface ThreadData {
	_id: string
	title: string
	author: string
	date: string
	category: string
	summary: string
	posts: {
		id: number
		author: string
		time: string
		content: string
		flagged?: boolean
		color?: 'indigo' | 'green' | 'red' | 'gray'
	}[]
}

const mockThreads: ThreadData[] = [
	{
		_id: 'dffdsf4sfdf',
		title: 'Designing a Scalable Microservices Architecture for Real-Time Data',
		author: 'Alice',
		date: '2025-11-03',
		category: 'HOT 🔥',
		summary:
			'The thread debates Kafka/Redis Queues vs. Direct WebSockets for real-time microservices scalability and reliability.',
		posts: [
			{
				id: 1,
				author: 'Alice (Thread Starter)',
				time: '12:30 PM | Original Post',
				content: `We’re planning the architecture for a new feature needing low-latency, real-time updates across multiple sessions. The debate is between **Kafka** and **WebSockets** for scalability and maintainability.`,
				color: 'indigo',
			},
			{
				id: 2,
				author: 'Bob',
				time: '12:45 PM',
				content: `I'd argue for Kafka/Redis. Queues offer superior **decoupling and reliability** for microservice communication.`,
				color: 'green',
			},
			{
				id: 3,
				author: 'Charlie',
				time: '1:00 PM',
				content: `WebSockets are fine! Over-engineering with queues is a waste of time for simple chat-like systems.`,
				flagged: true,
				color: 'red',
			},
		],
	},
]

// Helper function to get color classes safely
const getColorClasses = (color?: string, flagged?: boolean) => {
	if (flagged) return 'bg-red-50 border-l-4 border-red-500'
	switch (color) {
		case 'indigo':
			return 'bg-white border-l-4 border-indigo-500'
		case 'green':
			return 'bg-white border-l-4 border-green-500'
		case 'red':
			return 'bg-white border-l-4 border-red-500'
		default:
			return 'bg-white border-l-4 border-gray-300'
	}
}

const getAvatarColor = (color?: string) => {
	switch (color) {
		case 'indigo':
			return 'bg-indigo-500'
		case 'green':
			return 'bg-green-500'
		case 'red':
			return 'bg-red-500'
		default:
			return 'bg-gray-400'
	}
}

const ThreadPage = async ({ params }: { params: { slug: string } }) => {
	const { slug } = await params
	console.log(slug)
	const thread = mockThreads.find((t) => t._id === slug)
	console.log(thread)

	if (!thread) return notFound()

	return (
		<section className='p-6 md:p-10 space-y-10'>
			<h3>Hello</h3>
			{/* Header */}
			<section>
				<h2 className='text-3xl md:text-4xl font-extrabold text-gray-900'>
					{thread.title}
				</h2>
				<div className='text-sm text-gray-500 mt-2 flex items-center space-x-4'>
					<span>
						Posted by{' '}
						<span className='font-semibold text-gray-700'>{thread.author}</span>
					</span>
					<span>Created: {thread.date}</span>
					<span className='bg-indigo-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full'>
						{thread.category}
					</span>
				</div>
			</section>

			{/* AI Summary */}
			<section className='bg-indigo-50 p-6 rounded-xl shadow-inner border border-indigo-200'>
				<h3 className='text-lg font-bold text-indigo-700 flex items-center mb-2'>
					<span className='mr-2 text-xl'>🤖</span> AI Summary (Quick Context)
				</h3>
				<p className='text-indigo-800 text-sm'>{thread.summary}</p>
			</section>

			{/* Posts */}
			<section className='space-y-8'>
				{thread.posts.map((post) => (
					<div
						key={post.id}
						className={`p-6 rounded-xl shadow-lg ${getColorClasses(
							post.color,
							post.flagged,
						)}`}
					>
						<div
							className={`flex items-center justify-between pb-4 border-b ${
								post.flagged ? 'border-red-200' : 'border-gray-100'
							}`}
						>
							<div className='flex items-center space-x-3'>
								<div
									className={`w-10 h-10 ${getAvatarColor(
										post.color,
									)} rounded-full flex items-center justify-center text-lg font-bold text-white`}
								>
									{post.author.charAt(0)}
								</div>
								<div>
									<p className='font-bold text-gray-900'>{post.author}</p>
									<p className='text-xs text-gray-500'>{post.time}</p>
								</div>
							</div>

							{post.flagged ? (
								<span className='text-xs font-bold text-red-600 bg-red-200 px-3 py-1 rounded-full'>
									AI FLAGGED 🚨
								</span>
							) : (
								<button className='text-sm text-indigo-600 font-semibold hover:text-indigo-800'>
									Reply
								</button>
							)}
						</div>

						<div className='mt-4 prose max-w-none'>
							<p className='text-gray-800'>{post.content}</p>
						</div>
					</div>
				))}
			</section>

			{/* Reply Form */}
			<section className='mt-10 pt-8 border-t border-gray-200 bg-white p-6 rounded-xl shadow-2xl'>
				<h3 className='text-2xl font-bold mb-4 text-gray-900'>Post a Reply</h3>
				<textarea
					rows={4}
					placeholder={`Share your thoughts or answer ${thread.author}'s question...`}
					className='w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 resize-none'
				/>
				<button className='mt-4 flex items-center justify-center space-x-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition duration-300 shadow-lg'>
					<span>Submit Reply</span>
				</button>
			</section>
		</section>
	)
}
export default ThreadPage
