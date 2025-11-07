import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface CommentInputProps {
	parentId?: string
	onCancel?: () => void
}

const CommentInput = ({ parentId, onCancel }: CommentInputProps) => {
	const handleSubmit = () => {
		// Handle comment submission logic here
		console.log('Submitting reply to:', parentId)
		onCancel?.()
	}

	// If it's a reply (has parentId), show inline version
	if (parentId) {
		return (
			<div className='bg-card border border-border rounded-lg p-3 shadow-sm'>
				<div className='flex items-start space-x-3'>
					<img
						src='https://placehold.co/36x36/50009c/FFFFFF?text=IJ'
						alt='User'
						className='w-9 h-9 rounded-full object-cover shrink-0'
					/>
					<div className='flex-1 space-y-2'>
						<Input
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
								className='bg-primary text-primary-foreground hover:bg-primary/90'
							>
								Reply
							</Button>
						</div>
					</div>
				</div>
			</div>
		)
	}

	// Default: fixed bottom input for top-level comments
	return (
		<footer className='fixed bottom-0 left-0 right-0 bg-card border-t border-border p-3 shadow-lg z-50 backdrop-blur-sm'>
			<div className='max-w-2xl mx-auto flex items-center gap-3'>
				<img
					src='https://placehold.co/36x36/50009c/FFFFFF?text=IJ'
					alt='User'
					className='w-9 h-9 rounded-full object-cover shrink-0'
				/>
				<Input
					placeholder='Comment as Ismail Josim'
					className='bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-ring'
				/>
				<Button
					variant='ghost'
					className='text-primary hover:text-primary/90 shrink-0'
				>
					Send
				</Button>
			</div>
		</footer>
	)
}

export default CommentInput
