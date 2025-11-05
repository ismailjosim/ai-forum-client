'use client'

import { notFound } from 'next/navigation'

import { ThreadPageClient } from '@/components/modules/SingleThread/ThreadPageClient'
import { ThreadData } from '@/types/types'

const mockThreads: ThreadData[] = [
	{
		_id: 'dffdsf4sfdf',
		title:
			'Designing a Scalable Microservices Architecture for Real-Time Data.',
		author: 'Alice',
		date: '2 hours ago',
		category: 'r/WebDev',
		summary:
			'The thread debates Kafka/Redis Queues vs. Direct WebSockets for real-time microservices scalability and reliability.The thread debates Kafka/Redis Queues vs. Direct WebSockets for real-time microservices scalability and reliability.\n. The thread debates Kafka/Redis Queues vs. Direct WebSockets for real-time microservices scalability and reliability.',
		posts: [
			{
				id: 1,
				author: 'Michael B.',
				time: '1h',
				content:
					'Looks fantastic! I love the vertical lines for nested replies; it really cleans up the thread and makes it easy to follow who is talking to whom. Great job!',
				color: 'indigo',
				votes: 6,
				replies: [
					{
						id: 2,
						author: 'Jane Doe',
						time: '45m',
						content:
							'I second this. The bubble look always felt cluttered, but this is incredibly clean and scalable. Bravo!',
						color: 'gray',
						votes: 2,
						replies: [
							{
								id: 3,
								author: 'Alice',
								time: '30m',
								content:
									"Thanks! That was exactly the goal—scalability and better flow. I'm glad it works aesthetically!",
								color: 'indigo',
								isAuthor: true,
								votes: 8,
								replies: [],
							},
						],
					},
				],
			},
			{
				id: 4,
				author: 'Liam T.',
				time: '15m',
				content:
					'This is a major improvement. Much easier to quickly scan the conversation structure. One small suggestion: maybe use a slightly thicker border line for the nesting?',
				color: 'red',
				votes: 3,
				replies: [],
			},
			{
				id: 5,
				author: 'Charlie',
				time: '10m',
				content:
					'WebSockets are fine! Over-engineering with queues is a waste of time for simple chat-like systems.',
				flagged: true,
				color: 'red',
				votes: -2,
				replies: [],
			},
		],
	},
]

const ThreadPage = async ({ params }: { params: { slug: string } }) => {
	const { slug } = await params
	const thread = mockThreads.find((t) => t._id === slug)

	if (!thread) return notFound()

	return <ThreadPageClient thread={thread} />
}

export default ThreadPage
