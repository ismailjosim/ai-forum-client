'use client'
import { useEffect, useState } from 'react'
import ThreadPost from './ThreadPost'
import CommentList from './CommentList'
import { ThreadResponse } from '../../../types/types'

interface SingleThreadProps {
	id: string
}

const SingleThread = ({ id }: SingleThreadProps) => {
	const [singleThread, setSingleThread] = useState<ThreadResponse | null>(null)
	const [loading, setLoading] = useState(true)
	const [activeReplyId, setActiveReplyId] = useState<string | null>(null)

	useEffect(() => {
		const fetchThread = async () => {
			try {
				setLoading(true)
				const response = await fetch(
					`http://localhost:5000/api/v1/thread/${id}`,
				)
				const data = await response.json()
				setSingleThread(data)
			} catch (error) {
				console.error('Error fetching thread:', error)
			} finally {
				setLoading(false)
			}
		}
		fetchThread()
	}, [id])

	if (loading)
		return <p className='text-center mt-10 text-muted-foreground'>Loading...</p>

	if (!singleThread)
		return (
			<p className='text-center mt-10 text-red-500'>
				Failed to load the thread.
			</p>
		)

	const { thread, threadPost: comments } = singleThread.data

	return (
		<div className='min-h-screen flex flex-col bg-background text-foreground'>
			<main className='grow w-full mx-auto pt-6 px-4 comment-scroll-area overflow-y-auto'>
				<ThreadPost
					title={thread.title}
					content={thread.content}
					author={thread.author}
				/>

				<section className='w-3/4 mx-auto'>
					<div className='flex items-center justify-between px-2 mb-4'>
						<div className='flex items-center space-x-2 text-sm font-semibold text-muted-foreground'>
							<span>Most relevant</span>
						</div>
						<span className='text-sm text-muted-foreground'>
							{comments.length} Comments
						</span>
					</div>

					<CommentList
						comments={comments}
						activeReplyId={activeReplyId}
						setActiveReplyId={setActiveReplyId}
					/>
				</section>
			</main>
		</div>
	)
}

export default SingleThread
