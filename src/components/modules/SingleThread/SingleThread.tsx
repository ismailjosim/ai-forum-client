// src/components/modules/SingleThread/SingleThread.tsx
'use client'

import { useState } from 'react'
import ThreadPost from './ThreadPost'
import CommentList from './CommentList'
import CommentInput from './CommentInput'
import {
	IAuthorInterface,
	ThreadData,
} from '@/services/thread/get-single-thread'

interface SingleThreadProps {
	threadData: ThreadData
}

const SingleThread = ({ threadData }: SingleThreadProps) => {
	const [activeReplyId, setActiveReplyId] = useState<string | null>(null)
	const { thread, threadPost: comments } = threadData

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
