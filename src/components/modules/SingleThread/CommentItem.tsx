import {
	ThumbsUp,
	ThumbsDown,
	Reply,
	BadgeCheck,
	CircleCheck,
} from 'lucide-react'
import CommentInput from './CommentInput'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatDistanceToNow } from 'date-fns'
import {
	ThreadPost,
	IAuthorInterface,
} from '@/services/thread/get-single-thread'

interface CommentItemProps {
	comment: ThreadPost
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

	const getInitials = (name: string) => {
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2)
	}

	// Extract author information with proper type checking
	const author =
		typeof comment.author === 'string'
			? null
			: (comment.author as IAuthorInterface)

	const authorName = author?.name || 'Anonymous'
	const authorPicture = author?.picture || undefined
	const isVerified = author?.isVerified || false

	const timeAgo = formatDistanceToNow(new Date(comment.createdAt), {
		addSuffix: true,
	})

	return (
		<div className={level > 0 ? 'ml-6 border-l-2 border-border/70 pl-4' : ''}>
			<div className='p-4 border-b border-border/50'>
				<div className='flex items-start space-x-3'>
					<Avatar className='w-10 h-10 shrink-0'>
						{authorPicture && (
							<AvatarImage src={authorPicture} alt={authorName} />
						)}
						<AvatarFallback className='bg-primary text-primary-foreground'>
							{getInitials(authorName)}
						</AvatarFallback>
					</Avatar>

					<div className='flex-1 min-w-0'>
						<div className='flex items-baseline space-x-2'>
							<div className='flex items-center space-x-1'>
								<p className='font-semibold text-card-foreground'>
									{authorName}
								</p>
								{isVerified && <BadgeCheck className='text-blue-500' />}
							</div>
							<span className='text-xs text-muted-foreground'>{timeAgo}</span>
						</div>
						<p className='text-muted-foreground mt-1 wrap-break-word'>
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
							threadId={comment.thread}
							parentId={comment._id}
							onCancel={() => setActiveReplyId(null)}
						/>
					</div>
				)}
			</div>

			{/* Nested replies */}
			{comment.replies && comment.replies.length > 0 && (
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
