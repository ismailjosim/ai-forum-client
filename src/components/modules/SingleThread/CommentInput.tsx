'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { createPost, CreatePostPayload } from '@/services/post/create-post'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface CommentInputProps {
	threadId: string
	authorId?: string
	parentId?: string | null
	onCancel?: () => void
	onSuccess?: () => void
	userAvatar?: string
	userName?: string
}

const CommentInput = ({
	threadId,
	parentId,
	onCancel,
	onSuccess,
	userAvatar,
	userName = 'You',
}: CommentInputProps) => {
	const [comment, setComment] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)

	const router = useRouter()

	const handleSubmit = async () => {
		if (!comment.trim()) return

		setIsSubmitting(true)
		try {
			const payload = {
				content: comment.trim(),
				thread: threadId,
				parentPost: parentId || null,
			}

			const result = await createPost(payload as CreatePostPayload)

			if (result.success) {
				toast.success(result.message || 'Post created successfully')

				setComment('')

				if (onSuccess) {
					onSuccess()
				}

				router.refresh()

				if (onCancel) {
					onCancel()
				}
			} else {
				toast.error(result.error || 'Failed to create post')
			}
		} catch (error) {
			console.error('Error submitting comment:', error)
			toast.error('An unexpected error occurred')
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		// Submit on Ctrl/Cmd + Enter
		if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
			e.preventDefault()
			handleSubmit()
		}
	}

	// Get user initials for fallback
	const getUserInitials = (name: string) => {
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2)
	}

	return (
		<div className='flex items-start space-x-3'>
			<Avatar className='w-10 h-10 shrink-0'>
				<AvatarImage src={userAvatar || ''} alt={userName} />
				<AvatarFallback className='bg-primary text-primary-foreground'>
					{getUserInitials(userName)}
				</AvatarFallback>
			</Avatar>

			<div className='flex-1'>
				<Textarea
					placeholder={parentId ? 'Write a reply...' : 'Write a comment...'}
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					onKeyDown={handleKeyDown}
					className='min-h-[60px] resize-none'
					disabled={isSubmitting}
				/>
				<div className='flex items-center justify-between mt-2'>
					<p className='text-xs text-muted-foreground'>
						Press Ctrl+Enter to submit
					</p>
					<div className='flex items-center space-x-2'>
						{onCancel && (
							<Button
								variant='ghost'
								size='sm'
								onClick={onCancel}
								disabled={isSubmitting}
							>
								Cancel
							</Button>
						)}
						<Button
							size='sm'
							onClick={handleSubmit}
							disabled={!comment.trim() || isSubmitting}
						>
							{isSubmitting ? 'Posting...' : 'Post'}
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CommentInput
