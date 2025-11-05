import { MessageSquare, Share2, Bookmark } from 'lucide-react'
import { useState } from 'react'
import { ThreadData } from '@/types/types'

interface ThreadHeaderProps {
	thread: ThreadData
}

export const ThreadHeader = ({ thread }: ThreadHeaderProps) => {
	const [postVotes, setPostVotes] = useState(4500)
	const [postVoteState, setPostVoteState] = useState<'up' | 'down' | null>(null)

	const handleUpvote = () => {
		if (postVoteState === 'up') {
			setPostVotes(postVotes - 1)
			setPostVoteState(null)
		} else {
			setPostVotes(postVotes + (postVoteState === 'down' ? 2 : 1))
			setPostVoteState('up')
		}
	}

	const handleDownvote = () => {
		if (postVoteState === 'down') {
			setPostVotes(postVotes + 1)
			setPostVoteState(null)
		} else {
			setPostVotes(postVotes - (postVoteState === 'up' ? 2 : 1))
			setPostVoteState('down')
		}
	}

	const formatVotes = (votes: number) =>
		votes >= 1000 ? `${(votes / 1000).toFixed(1)}k` : votes

	return (
		<div className='bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex mb-4'>
			<div className='w-10 md:w-12 bg-gray-50 flex flex-col items-center p-1 md:p-2 text-gray-500'>
				<button
					onClick={handleUpvote}
					className={`p-1.5 rounded-full transition duration-150 ${
						postVoteState === 'up' ? 'text-orange-500' : 'hover:text-orange-500'
					}`}
				>
					▲
				</button>
				<span className='font-bold text-sm my-1'>{formatVotes(postVotes)}</span>
				<button
					onClick={handleDownvote}
					className={`p-1.5 rounded-full transition duration-150 ${
						postVoteState === 'down' ? 'text-blue-500' : 'hover:text-blue-500'
					}`}
				>
					▼
				</button>
			</div>
			<div className='flex-1 p-3 md:p-4'>
				<div className='text-xs text-gray-500 mb-1 flex items-center space-x-2'>
					<span className='font-bold'>{thread.category}</span>
					<span className='text-gray-400'>&bull;</span>
					<span>
						Posted by u/{thread.author} {thread.date}
					</span>
				</div>
				<h1 className='text-xl font-bold text-gray-900 mb-2'>{thread.title}</h1>
				<div className='text-gray-700 text-sm mb-4 border-l-4 border-gray-100 pl-3'>
					<p>{thread.summary}</p>
				</div>
				<div className='flex space-x-3 text-sm text-gray-500'>
					<button className='flex items-center space-x-1.5 p-1 rounded hover:bg-gray-100 transition duration-150'>
						<MessageSquare className='h-4 w-4' />
						<span className='font-semibold'>
							{thread.posts.length} Comments
						</span>
					</button>
					<button className='flex items-center space-x-1.5 p-1 rounded hover:bg-gray-100 transition duration-150'>
						<Share2 className='h-4 w-4' />
						<span className='font-semibold hidden sm:inline'>Share</span>
					</button>
					<button className='flex items-center space-x-1.5 p-1 rounded hover:bg-gray-100 transition duration-150'>
						<Bookmark className='h-4 w-4' />
						<span className='font-semibold hidden sm:inline'>Save</span>
					</button>
				</div>
			</div>
		</div>
	)
}
