import { Card, CardContent } from '@/components/ui/card'
import { Heart } from 'lucide-react'

interface ThreadPostProps {
	title: string
	content: string
	author?: string
}

const ThreadPost = ({ title, content, author }: ThreadPostProps) => {
	return (
		<Card className='mb-6 bg-card text-card-foreground shadow-sm'>
			<CardContent className='p-4'>
				<div className='flex items-center justify-between'>
					<h1 className='text-xl font-semibold'>{title}</h1>
					<Heart className='w-5 h-5 text-red-500 cursor-pointer transition-colors hover:text-red-600' />
				</div>
				{author && (
					<p className='mt-1 text-sm text-muted-foreground'>{author}</p>
				)}
				<p className='mt-2 leading-relaxed'>{content}</p>
			</CardContent>
		</Card>
	)
}

export default ThreadPost
