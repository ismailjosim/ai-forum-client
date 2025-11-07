/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { ThreadItem, ThreadItemProps } from './ThreadItem'
import { ThreadSearchBar } from './ThreadSearchBar'
import { NewThreadButton } from './NewThreadButton'
import { Card } from '@/components/ui/card'

// 🧩 Thread interface matching backend response
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

export function ThreadsList() {
	const [threads, setThreads] = useState<IThread[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchThreads = async () => {
			try {
				setLoading(true)
				const res = await fetch('http://localhost:5000/api/v1/thread', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
					cache: 'no-store',
				})

				if (!res.ok) throw new Error('Failed to fetch threads')

				const data = await res.json()
				setThreads(data.data || [])
			} catch (err: any) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}

		fetchThreads()
	}, [])

	if (loading) {
		return (
			<div className='flex justify-center items-center py-10'>loading...</div>
		)
	}

	if (error) {
		return (
			<p className='text-red-600 text-center py-6'>
				Failed to load threads: {error}
			</p>
		)
	}

	return (
		<div className='space-y-8'>
			<h2 className='text-3xl md:text-4xl font-extrabold text-gray-900'>
				All Discussion Threads
			</h2>

			{/* Search + Button Row */}
			<Card className='p-6 flex flex-col sm:flex-row justify-between items-center gap-4'>
				<ThreadSearchBar />
				<NewThreadButton />
			</Card>

			{/* Thread Items */}
			<div className='space-y-4'>
				{threads.length > 0 ? (
					threads.map((thread) => {
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
					<p className='text-gray-500 text-center py-6'>No threads found.</p>
				)}
			</div>
		</div>
	)
}
