import { ThumbsUp, ThumbsDown, Reply } from 'lucide-react'
import CommentInput from './CommentInput'

export interface Comment {
	_id: string
	content: string
	author: string
	likes: string[]
	createdAt: string
	replies: Comment[]
}

interface CommentItemProps {
	comment: Comment
	level?: number
	activeReplyId?: string | null
	setActiveReplyId?: (id: string | null) => void
}

const CommentItem = ({
	comment,
	level = 0,
	activeReplyId,
	setActiveReplyId,
}: CommentItemProps) => {
	const isReplying = activeReplyId === comment._id

	const handleReplyClick = () => {
		if (setActiveReplyId) {
			setActiveReplyId(isReplying ? null : comment._id)
		}
	}

	return (
		<div className={level > 0 ? 'ml-6 border-l-2 border-border/70 pl-4' : ''}>
			<div className='p-4 border-b border-border/50'>
				<div className='flex items-start space-x-3'>
					<img
						src={`https://placehold.co/40x40/${
							level > 0 ? '007bff' : '50009c'
						}/FFFFFF?text=${comment.author.slice(0, 2).toUpperCase()}`}
						alt={comment.author}
						className='w-10 h-10 rounded-full object-cover flex-shrink-0'
					/>
					<div className='flex-1 min-w-0'>
						<p className='font-semibold text-card-foreground'>
							{comment.author}
						</p>
						<p className='text-muted-foreground mt-1 break-words'>
							{comment.content}
						</p>

						<div className='flex items-center space-x-4 mt-2 text-sm text-muted-foreground'>
							<button
								className='flex items-center space-x-1 hover:text-primary transition-colors'
								onClick={handleReplyClick}
							>
								<Reply className='w-4 h-4' />
								<span>{isReplying ? 'Cancel' : 'Reply'}</span>
							</button>
							<div className='flex items-center space-x-2'>
								<ThumbsUp className='w-4 h-4 cursor-pointer hover:text-green-500 transition-colors' />
								<span className='text-xs'>{comment.likes.length}</span>
								<ThumbsDown className='w-4 h-4 cursor-pointer hover:text-red-500 transition-colors' />
							</div>
						</div>
					</div>
				</div>

				{/* Reply input - appears directly below this comment */}
				{isReplying && setActiveReplyId && (
					<div className='mt-4 pl-[52px]'>
						<CommentInput
							parentId={comment._id}
							onCancel={() => setActiveReplyId(null)}
						/>
					</div>
				)}
			</div>

			{/* Nested replies */}
			{comment.replies?.length > 0 && (
				<div>
					{comment.replies.map((reply) => (
						<CommentItem
							key={reply._id}
							comment={reply}
							level={level + 1}
							activeReplyId={activeReplyId}
							setActiveReplyId={setActiveReplyId}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export default CommentItem
