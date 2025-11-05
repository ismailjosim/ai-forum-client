'use client'

import { ThreadItem, ThreadItemProps } from './ThreadItem'
import { ThreadSearchBar } from './ThreadSearchBar'
import { NewThreadButton } from './NewThreadButton'
import { Card } from '@/components/ui/card'

export function ThreadsList() {
	const threads: ThreadItemProps[] = [
		{
			_id: 'dffdsf4sfdf',
			title:
				'Designing a Scalable Microservices Architecture for Real-Time Data',
			category: 'HOT',
			color: 'indigo',
			description:
				'Discussing queue systems (Redis/Kafka) vs WebSocket connections for real-time updates...',
			author: 'Alice',
			replies: 45,
			views: '1.2k',
			updated: '5 minutes ago',
		},
		{
			_id: 'dsrtyfdsafddsfdsf',
			title:
				'Which LLM API is best for lightweight spam detection and summarization?',
			category: 'AI',
			color: 'green',
			description:
				'Comparing Gemini and other models for cost-effective moderation and summarization...',
			author: 'DevTeam Lead',
			replies: 18,
			views: '450',
			updated: '2 hours ago',
		},
		{
			_id: 'erewfsdfdsfdsfr3ed',
			title:
				'Initial Setup: Environment Variables and Containerization (Solved)',
			category: 'CLOSED',
			color: 'gray',
			description:
				'Troubleshooting Docker setup and CI/CD pipeline configuration for staging environment...',
			author: 'NewJoiner',
			replies: 6,
			views: '880',
			updated: '3 days ago',
		},
	]

	return (
		<div className='space-y-8'>
			<h2 className='text-3xl md:text-4xl font-extrabold text-gray-900'>
				All Discussion Threads
			</h2>

			{/* Search and Button Row */}
			<Card className='p-6 flex flex-col sm:flex-row justify-between items-center gap-4'>
				<ThreadSearchBar />
				<NewThreadButton />
			</Card>

			{/* Thread Items */}
			<div className='space-y-4'>
				{threads.map((thread, index) => (
					<ThreadItem key={index} {...thread} />
				))}
			</div>
		</div>
	)
}
