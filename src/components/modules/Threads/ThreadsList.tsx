'use client'

import { useState } from 'react'
import { ThreadItem, ThreadItemProps } from './ThreadItem'
import { ThreadSearchBar } from './ThreadSearchBar'
import { NewThreadButton } from './NewThreadButton'
import { Card } from '@/components/ui/card'

export interface IThread {
	_id: string
	title: string
	content: string
	category: string
	author:
		| string
		| {
				_id: string
				name?: string
				email?: string
				picture?: string | null
		  }
	tags: string[]
	isPinned: boolean
	isLocked: boolean
	isClosed: boolean
	isDeleted: boolean
	views: number
	postCount: number
	isSpam: boolean
	lastActivity: string
	createdAt: string
	updatedAt: string
	__v?: number
}

interface ThreadsListProps {
	initialThreads: IThread[]
}

export function ThreadsList({ initialThreads }: ThreadsListProps) {
	const [threads] = useState<IThread[]>(initialThreads)
	const [searchQuery, setSearchQuery] = useState('')

	// Filter threads based on search query
	const filteredThreads = threads.filter(
		(thread) =>
			thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			thread.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
			thread.category.toLowerCase().includes(searchQuery.toLowerCase()),
	)

	return (
		<div className='space-y-8'>
			<h2 className='text-3xl md:text-4xl font-extrabold text-gray-900'>
				All Discussion Threads
			</h2>

			{/* Search + Button Row */}
			<Card className='p-6 flex flex-col sm:flex-row justify-between items-center gap-4'>
				<ThreadSearchBar onSearch={setSearchQuery} />
				<NewThreadButton />
			</Card>

			{/* Thread Items */}
			<div className='space-y-4'>
				{filteredThreads.length > 0 ? (
					filteredThreads.map((thread) => {
						const threadProps: ThreadItemProps = {
							_id: thread._id,
							title: thread.title,
							category: thread.category,
							color: 'indigo',
							description: thread.content,
							author:
								typeof thread.author === 'string'
									? 'Anonymous'
									: thread.author.name || 'Anonymous',
							replies: thread.postCount || 0,
							views: String(thread.views || 0),
							updated: new Date(thread.updatedAt).toLocaleString(),
						}

						return <ThreadItem key={thread._id} {...threadProps} />
					})
				) : (
					<p className='text-gray-500 text-center py-6'>
						{searchQuery
							? 'No threads match your search.'
							: 'No threads found.'}
					</p>
				)}
			</div>
		</div>
	)
}
