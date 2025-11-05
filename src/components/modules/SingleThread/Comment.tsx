'use client'

import { useState } from 'react'
import { ChevronUp, ChevronDown, Flag } from 'lucide-react'
import { Post } from '@/types/types'

interface CommentProps {
	comment: Post
	depth: number
	threadAuthor: string
}

export const Comment = ({ comment, depth, threadAuthor }: CommentProps) => {
	const [showReplyBox, setShowReplyBox] = useState(false)
	const [replyText, setReplyText] = useState('')
	const [voteCount, setVoteCount] = useState(comment.votes || 0)
	const [voteState, setVoteState] = useState<'up' | 'down' | null>(null)

	const handleUpvote = () => {
		if (voteState === 'up') {
			setVoteCount(voteCount - 1)
			setVoteState(null)
		} else {
			setVoteCount(voteCount + (voteState === 'down' ? 2 : 1))
			setVoteState('up')
		}
	}

	const handleDownvote = () => {
		if (voteState === 'down') {
			setVoteCount(voteCount + 1)
			setVoteState(null)
		} else {
			setVoteCount(voteCount - (voteState === 'up' ? 2 : 1))
			setVoteState('down')
		}
	}

	const avatarSize = depth === 0 ? 'w-7 h-7' : 'w-6 h-6'

	return (
		<div
			className={`${
				depth === 0 ? 'border-t border-gray-100 pt-3 mb-4' : 'mb-3'
			}`}
		>
			<div className='flex items-start'>
				<img
					src={`https://placehold.co/28x28/${
						comment.color === 'indigo'
							? '4a90e2'
							: comment.color === 'red'
							? 'ff7847'
							: 'f5a623'
					}/ffffff?text=${comment.author.charAt(0)}`}
					alt={`${comment.author} Avatar`}
					className={`${avatarSize} rounded-full object-cover shrink-0 mr-3 hidden md:block`}
				/>
				<div className='flex-1 min-w-0'>
					<div className='flex items-center text-xs text-gray-500 space-x-2 mb-1 flex-wrap'>
						<span
							className={`font-bold ${
								comment.isAuthor ? 'text-orange-500' : 'text-gray-700'
							}`}
						>
							{comment.author}
						</span>
						{comment.isAuthor && (
							<span className='text-orange-500 font-normal'>(OP)</span>
						)}
						{comment.flagged && (
							<span className='inline-flex items-center gap-1 text-xs font-semibold text-red-600 bg-red-100 px-2 py-0.5 rounded'>
								<Flag className='w-3 h-3' /> FLAGGED
							</span>
						)}
						<span className='font-bold text-xs text-gray-700'>
							{voteCount} points
						</span>
						<span>&bull;</span>
						<span>{comment.time}</span>
					</div>

					<p className='text-gray-800 text-sm mb-1.5 wrap-break-word leading-relaxed'>
						{comment.content}
					</p>

					<div className='flex items-center space-x-3 text-xs text-gray-500'>
						<button
							onClick={handleUpvote}
							className={`flex items-center space-x-1 transition ${
								voteState === 'up' ? 'text-orange-500' : 'hover:text-orange-500'
							}`}
						>
							<ChevronUp className='h-4 w-4' /> Upvote
						</button>
						<button
							onClick={handleDownvote}
							className={`flex items-center space-x-1 transition ${
								voteState === 'down' ? 'text-blue-500' : 'hover:text-blue-500'
							}`}
						>
							<ChevronDown className='h-4 w-4' /> Downvote
						</button>
						<button
							onClick={() => setShowReplyBox(!showReplyBox)}
							className='font-semibold hover:underline'
						>
							Reply
						</button>
					</div>

					{showReplyBox && (
						<div className='mt-3 bg-gray-50 p-3 rounded-lg border border-gray-200'>
							<p className='text-xs text-gray-500 mb-2'>
								Reply as {threadAuthor}
							</p>
							<textarea
								value={replyText}
								onChange={(e) => setReplyText(e.target.value)}
								placeholder='What are your thoughts?'
								className='w-full h-20 p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-orange-500 resize-none bg-white'
							/>
							<div className='flex justify-end mt-2 space-x-2'>
								<button
									onClick={() => {
										setShowReplyBox(false)
										setReplyText('')
									}}
									className='bg-gray-200 text-gray-700 font-semibold py-1.5 px-4 rounded-full text-sm hover:bg-gray-300 transition duration-150'
								>
									Cancel
								</button>
								<button className='bg-orange-500 text-white font-semibold py-1.5 px-4 rounded-full text-sm hover:bg-opacity-90 transition duration-150'>
									Comment
								</button>
							</div>
						</div>
					)}

					{comment.replies && comment.replies.length > 0 && (
						<div className='mt-3 pl-4 border-l-2 border-gray-200'>
							{comment.replies.map((reply) => (
								<Comment
									key={reply.id}
									comment={reply}
									depth={depth + 1}
									threadAuthor={threadAuthor}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
