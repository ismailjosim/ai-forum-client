'use client'

import { useEffect, useState } from 'react'

import ThreadPost from './ThreadPost'
import CommentList from './CommentList'
import CommentInput from './CommentInput'
import {
	IAuthorInterface,
	ThreadData,
	ThreadPost as IThreadPost,
} from '@/services/thread/get-single-thread'
import { useSocket } from '../../../app/contexts/SocketContext'

interface SingleThreadProps {
	threadData: ThreadData
}

const SingleThread = ({ threadData }: SingleThreadProps) => {
	const { socket, isConnected } = useSocket()
	const [activeReplyId, setActiveReplyId] = useState<string | null>(null)
	const { thread, threadPost: initialComments } = threadData
	const [comments, setComments] = useState<IThreadPost[]>(initialComments)

	useEffect(() => {
		if (!socket || !isConnected) return // wait until connected

		console.log('🔌 Joining thread room:', thread._id)
		socket.emit('join-post', thread._id)

		const handleNewComment = (data: {
			postId: string
			comment: IThreadPost
		}) => {
			console.log('📨 New comment received:', data)

			if (data.postId === thread._id) {
				setComments((prev) => {
					// Check if comment already exists
					const exists = prev.some((c) => c._id === data.comment._id)
					if (exists) {
						console.log('⚠️ Comment already exists, skipping')
						return prev
					}

					// If it's a top-level comment (no parent)
					if (!data.comment.parentPost) {
						console.log('✅ Adding top-level comment')
						return [...prev, data.comment]
					}

					// If it's a reply, find the parent and add to its replies
					console.log(
						'✅ Adding nested reply to parent:',
						data.comment.parentPost,
					)

					const addReplyToParent = (comments: IThreadPost[]): IThreadPost[] => {
						return comments.map((comment) => {
							// If this is the parent comment
							if (comment._id === data.comment.parentPost) {
								return {
									...comment,
									replies: [...(comment.replies || []), data.comment],
								}
							}

							// If this comment has replies, recursively search them
							if (comment.replies && comment.replies.length > 0) {
								return {
									...comment,
									replies: addReplyToParent(comment.replies),
								}
							}

							return comment
						})
					}

					return addReplyToParent(prev)
				})
			}
		}

		socket.on('new-comment', handleNewComment)

		return () => {
			console.log('👋 Leaving thread room:', thread._id)
			socket.emit('leave-post', thread._id)
			socket.off('new-comment', handleNewComment)
		}
	}, [socket, isConnected, thread._id])

	return (
		<div className='min-h-screen flex flex-col bg-background text-foreground'>
			<main className='grow w-full mx-auto pt-6 px-4 comment-scroll-area overflow-y-auto'>
				<ThreadPost
					title={thread.title}
					content={thread.content}
					author={thread?.author as IAuthorInterface}
					createdAt={thread?.createdAt}
				/>

				<section className='w-3/4 mx-auto'>
					<div className='flex items-center justify-between px-2 mb-4'>
						<div className='flex items-center space-x-2 text-sm font-semibold text-muted-foreground'>
							<span>Most relevant</span>
							{/* Connection Status Indicator */}
							<span
								className={`ml-3 flex items-center gap-1.5 text-xs ${
									isConnected ? 'text-green-600' : 'text-red-600'
								}`}
							>
								<span
									className={`w-2 h-2 rounded-full ${
										isConnected ? 'bg-green-600 animate-pulse' : 'bg-red-600'
									}`}
								/>
								{isConnected ? 'Live' : 'Offline'}
							</span>
						</div>
						<span className='text-sm text-muted-foreground'>
							{comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
						</span>
					</div>

					<CommentList
						comments={comments}
						activeReplyId={activeReplyId}
						setActiveReplyId={setActiveReplyId}
					/>

					<div className='mt-6'>
						<CommentInput threadId={thread._id} />
					</div>
				</section>
			</main>
		</div>
	)
}

export default SingleThread
