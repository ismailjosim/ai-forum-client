/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface CommentInputProps {
	parentId?: string
	onCancel?: () => void
	session?: any
	threadId: string
	onSubmit?: (data: CommentData) => Promise<void> | void
}

export interface CommentData {
	content: string
	author: string
	thread: string
	parentPost?: string
}

const CommentInput = ({
	parentId,
	onCancel,
	threadId,
	onSubmit,
}: CommentInputProps) => {
	const [content, setContent] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleSubmit = async () => {
		if (!content.trim()) return

		const commentPayload: CommentData = {
			content,
			author: '690b67298a164a65224b83b4',
			thread: threadId,
			parentPost: parentId || undefined,
		}

		try {
			setIsSubmitting(true)
			console.log('📝 Comment Payload:', commentPayload)

			// If an API call handler is passed from parent, call it
			if (onSubmit) {
				await onSubmit(commentPayload)
			} else {
				// Otherwise, just log it for now
				console.log('Comment submitted:', commentPayload)
			}

			setContent('')
			onCancel?.()
		} catch (error) {
			console.error('Failed to submit comment:', error)
		} finally {
			setIsSubmitting(false)
		}
	}

	// --- Reply Input (child comment) ---
	if (parentId) {
		return (
			<div className='bg-card border border-border rounded-lg p-3 shadow-sm'>
				<div className='flex items-start space-x-3'>
					<img
						src={'https://placehold.co/36x36/50009c/FFFFFF?text=IJ'}
						alt='User'
						className='w-9 h-9 rounded-full object-cover shrink-0'
					/>
					<div className='flex-1 space-y-2'>
						<Input
							value={content}
							onChange={(e) => setContent(e.target.value)}
							placeholder='Write a reply...'
							className='bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-ring'
						/>
						<div className='flex justify-end gap-2'>
							<Button
								variant='ghost'
								size='sm'
								onClick={onCancel}
								className='text-muted-foreground hover:text-foreground'
							>
								Cancel
							</Button>
							<Button
								size='sm'
								onClick={handleSubmit}
								disabled={isSubmitting}
								className='bg-primary text-primary-foreground hover:bg-primary/90'
							>
								{isSubmitting ? 'Sending...' : 'Reply'}
							</Button>
						</div>
					</div>
				</div>
			</div>
		)
	}

	// --- Main Comment Input (bottom fixed) ---
	return (
		<footer className='relative bottom-0 bg-card border-t border-border p-3 z-50'>
			<div className='flex items-center gap-3'>
				<img
					src={'https://placehold.co/36x36/50009c/FFFFFF?text=IJ'}
					alt='User'
					className='w-9 h-9 rounded-full object-cover shrink-0'
				/>
				<Input
					value={content}
					onChange={(e) => setContent(e.target.value)}
					placeholder={`Comment as ${'Guest'}`}
					className='bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-ring'
				/>
				<Button
					variant='default'
					size='lg'
					onClick={handleSubmit}
					disabled={isSubmitting}
					className='text-white shrink-0'
				>
					{isSubmitting ? 'Sending...' : 'Send'}
				</Button>
			</div>
		</footer>
	)
}

export default CommentInput
