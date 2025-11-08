import CommentItem from './CommentItem'
import { ThreadPost } from '@/services/thread/get-single-thread'

interface CommentListProps {
	comments: ThreadPost[]
	activeReplyId: string | null
	setActiveReplyId: (id: string | null) => void
}

const CommentList = ({
	comments,
	activeReplyId,
	setActiveReplyId,
}: CommentListProps) => {
	return (
		<div className='divide-y border-t border-border/50'>
			{comments.map((c) => (
				<CommentItem
					key={c._id}
					comment={c}
					activeReplyId={activeReplyId}
					setActiveReplyId={setActiveReplyId}
				/>
			))}
		</div>
	)
}

export default CommentList
