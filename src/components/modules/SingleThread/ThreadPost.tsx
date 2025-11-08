'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react'
import { IAuthorInterface } from '../../../services/thread/get-single-thread'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNow } from 'date-fns'

interface ThreadPostProps {
	title: string
	content: string
	author?: IAuthorInterface
	createdAt?: string
}

const ThreadPost = ({ title, content, author, createdAt }: ThreadPostProps) => {
	const getInitials = (name: string) => {
		return name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2)
	}

	const timeAgo = createdAt
		? formatDistanceToNow(new Date(createdAt), { addSuffix: true })
		: '1m'

	return (
		<Card className='mb-6 bg-card text-card-foreground shadow-sm w-3/4 mx-auto'>
			<CardContent className='p-0'>
				{/* Header - Author Info */}
				<div className='p-4 pb-3'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center space-x-3'>
							<Avatar className='w-10 h-10'>
								<AvatarImage
									src={author?.picture || ''}
									alt={author?.name || 'User'}
								/>
								<AvatarFallback className='bg-primary text-primary-foreground'>
									{author?.name ? getInitials(author.name) : 'U'}
								</AvatarFallback>
							</Avatar>

							<div className='flex flex-col'>
								<div className='flex items-center space-x-2'>
									<span className='font-semibold text-sm'>
										{author?.name || 'Anonymous'}
									</span>
									{author?.isVerified && (
										<Badge
											variant='secondary'
											className='text-xs px-1.5 py-0 bg-blue-500 text-white'
										>
											✓
										</Badge>
									)}
									{author?.role === 'ADMIN' && (
										<Badge
											variant='secondary'
											className='text-xs px-1.5 py-0 bg-red-500 text-white'
										>
											Admin
										</Badge>
									)}
								</div>
								<span className='text-xs text-muted-foreground'>{timeAgo}</span>
							</div>
						</div>

						<Button variant='ghost' size='icon' className='h-8 w-8'>
							<MoreHorizontal className='w-5 h-5' />
						</Button>
					</div>
				</div>

				{/* Content */}
				<div className='px-4 pb-3'>
					<h1 className='text-lg font-semibold mb-2'>{title}</h1>
					<p className='leading-relaxed whitespace-pre-wrap'>{content}</p>
				</div>

				{/* Actions */}
				<div className='border-t border-border'>
					<div className='flex items-center justify-around py-1'>
						<Button
							variant='ghost'
							className='flex-1 flex items-center justify-center space-x-2 text-muted-foreground hover:text-foreground rounded-none'
						>
							<Heart className='w-5 h-5' />
							<span className='text-sm font-medium'>Like</span>
						</Button>

						<Button
							variant='ghost'
							className='flex-1 flex items-center justify-center space-x-2 text-muted-foreground hover:text-foreground rounded-none'
						>
							<MessageCircle className='w-5 h-5' />
							<span className='text-sm font-medium'>Comment</span>
						</Button>

						<Button
							variant='ghost'
							className='flex-1 flex items-center justify-center space-x-2 text-muted-foreground hover:text-foreground rounded-none'
						>
							<Share2 className='w-5 h-5' />
							<span className='text-sm font-medium'>Share</span>
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

export default ThreadPost
