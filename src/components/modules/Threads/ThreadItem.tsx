import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

export interface ThreadItemProps {
	_id: string
	title: string
	category: 'HOT' | 'AI' | 'CLOSED'
	color: 'indigo' | 'green' | 'gray'
	description: string
	author: string
	replies: number
	views: string
	updated: string
}

export function ThreadItem({
	title,
	category,
	color,
	description,
	author,
	replies,
	views,
	updated,
	_id,
}: ThreadItemProps) {
	const colorMap = {
		indigo: 'bg-indigo-500 ring-indigo-500 text-indigo-600',
		green: 'bg-green-500 ring-green-500 text-green-600',
		gray: 'bg-gray-500 ring-gray-500 text-gray-600',
	}

	return (
		<Link
			href={`/threads/${_id}`}
			className={`block hover:shadow-xl transition duration-300 hover:ring-2 rounded-xl ${
				colorMap[color].split(' ')[1]
			}`}
		>
			<Card className='overflow-hidden rounded-xl border border-gray-100'>
				<CardContent className='p-6'>
					<div className='flex justify-between items-start'>
						<h4 className='text-xl font-bold text-gray-900 mr-4'>{title}</h4>
						<span
							className={`text-sm font-semibold text-white px-3 py-1 rounded-full shrink-0 ${
								colorMap[color].split(' ')[0]
							}`}
						>
							{category}
						</span>
					</div>

					<p className='text-gray-600 mt-2 line-clamp-2'>{description}</p>

					<div className='flex justify-between items-center text-sm mt-4 pt-4 border-t border-gray-100'>
						<div className='space-x-4'>
							<span className='text-gray-500'>
								Author:{' '}
								<span className='font-medium text-gray-700'>{author}</span>
							</span>
							<span className='text-gray-500'>
								Replies:{' '}
								<span className='font-bold text-indigo-600'>{replies}</span>
							</span>
							<span className='text-gray-500'>Views: {views}</span>
						</div>
						<span className='text-gray-400 text-xs'>{updated}</span>
					</div>
				</CardContent>
			</Card>
		</Link>
	)
}
