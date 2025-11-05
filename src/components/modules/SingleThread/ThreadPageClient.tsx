'use client'
import { useState } from 'react'

import { ThreadHeader } from './ThreadHeader'
import { Comment } from './Comment'
import { ThreadData } from '@/types/types'

export const ThreadPageClient = ({ thread }: { thread: ThreadData }) => {
	const [commentText, setCommentText] = useState('')

	return (
		<div className='min-h-screen bg-gray-200 flex justify-center py-6 md:py-8'>
			<div className='w-full max-w-xl md:max-w-3xl px-2 space-y-6'>
				<ThreadHeader thread={thread} />

				<div className='bg-white rounded-lg shadow-md p-4 border border-gray-200'>
					<h3 className='text-sm font-semibold text-gray-700 mb-3 ml-2'>
						All {thread.posts.length} Comments
					</h3>

					<div className='flex flex-col mb-6 bg-gray-50 p-3 rounded-lg border border-gray-200'>
						<p className='text-xs text-gray-500 mb-2'>
							Comment as {thread.author}
						</p>
						<textarea
							value={commentText}
							onChange={(e) => setCommentText(e.target.value)}
							placeholder='What are your thoughts?'
							className='w-full h-20 p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-orange-500 resize-none bg-white'
						/>
						<div className='flex justify-end mt-2'>
							<button className='bg-orange-500 text-white font-semibold py-1.5 px-4 rounded-full text-sm hover:bg-opacity-90 transition duration-150'>
								Comment
							</button>
						</div>
					</div>

					<div id='comments-container'>
						{thread.posts.map((comment) => (
							<Comment
								key={comment.id}
								comment={comment}
								depth={0}
								threadAuthor={thread.author}
							/>
						))}

						<div className='mt-6 flex justify-center'>
							<button className='text-orange-500 font-semibold text-sm hover:underline p-1 rounded transition duration-150'>
								Continue Thread
							</button>
						</div>
					</div>
				</div>

				<p className='text-center text-xs text-gray-400 mt-6'>
					End of Reddit Thread Simulation
				</p>
			</div>
		</div>
	)
}
