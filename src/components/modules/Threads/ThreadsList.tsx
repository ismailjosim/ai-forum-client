/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { getThreads } from '@/services/thread/get-threads'
import { ThreadItem } from './ThreadItem'
import { Card } from '../../ui/card'
import { ThreadSearchBar } from './ThreadSearchBar'
import { NewThreadButton } from './NewThreadButton'

interface ThreadsListProps {
	initialThreads: any[]
	initialMeta: {
		page: number
		limit: number
		total: number
		totalPage: number
	}
}

export function ThreadsList({ initialThreads, initialMeta }: ThreadsListProps) {
	const [threads, setThreads] = useState(initialThreads)
	const [meta, setMeta] = useState(initialMeta)
	const [page, setPage] = useState(initialMeta.page || 1)
	const [loading, setLoading] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')

	// Fetch threads from backend when search query or page changes
	const fetchThreads = async (newPage: number, search: string) => {
		setLoading(true)

		const result = await getThreads(newPage, meta.limit, search)
		if (result.success) {
			setThreads(result.data)
			setMeta(result.meta)
			setPage(newPage)
		}

		setLoading(false)
	}

	// Handle search with debouncing
	useEffect(() => {
		const timer = setTimeout(() => {
			// Reset to page 1 when searching
			fetchThreads(1, searchQuery)
		}, 500) // 500ms debounce

		return () => clearTimeout(timer)
	}, [searchQuery])

	const handlePageChange = async (newPage: number) => {
		if (newPage < 1 || newPage > meta.totalPage) return
		await fetchThreads(newPage, searchQuery)
	}

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

			{/* Threads List */}
			<div className='space-y-4'>
				{loading ? (
					<div className='space-y-3'>
						{[...Array(5)].map((_, i) => (
							<div key={i} className='h-24 bg-gray-100 rounded animate-pulse' />
						))}
					</div>
				) : threads.length > 0 ? (
					threads.map((thread) => (
						<ThreadItem
							key={thread._id}
							_id={thread._id}
							title={thread.title}
							category={thread.category}
							color='indigo'
							description={thread.content}
							author={
								typeof thread.author === 'string'
									? 'Anonymous'
									: thread.author?.name || 'Anonymous'
							}
							replies={thread.postCount || 0}
							views={String(thread.views || 0)}
							updated={new Date(thread.updatedAt).toLocaleString()}
						/>
					))
				) : (
					<p className='text-gray-500 text-center py-6'>
						{searchQuery
							? 'No threads match your search.'
							: 'No threads found.'}
					</p>
				)}
			</div>

			{/* Pagination Controls */}
			<div className='flex justify-center items-center gap-2 mt-6'>
				<Button
					variant='outline'
					onClick={() => handlePageChange(page - 1)}
					disabled={page === 1 || loading}
				>
					Previous
				</Button>

				<span className='text-sm text-gray-700'>
					Page {meta.page} of {meta.totalPage}
				</span>

				<Button
					variant='outline'
					onClick={() => handlePageChange(page + 1)}
					disabled={page === meta.totalPage || loading}
				>
					Next
				</Button>
			</div>
		</div>
	)
}
