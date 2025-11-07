import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

export interface ThreadItemProps {
	_id: string
	title: string
	category: string
	color?: 'indigo' | 'green' | 'gray'
	description: string
	author: string
	replies: number
	views: string
	updated: string
}

export function ThreadItem({
	_id,
	title,
	category,
	color = 'gray',
	description,
	author,
	replies,
	views,
	updated,
}: ThreadItemProps) {
	const colorMap: Record<string, string> = {
		indigo: 'bg-indigo-500 text-indigo-600 ring-indigo-500',
		green: 'bg-green-500 text-green-600 ring-green-500',
		gray: 'bg-gray-500 text-gray-600 ring-gray-500',
	}

	const selectedColor = colorMap[color] || colorMap.gray

	return (
		<Link
			href={`/threads/${_id}`}
			className='block transition duration-300 hover:shadow-xl hover:ring-2 hover:ring-gray-200 rounded-xl'
		>
			<Card className='overflow-hidden rounded-xl border border-gray-100'>
				<CardContent className='p-6'>
					<div className='flex justify-between items-start flex-wrap gap-2'>
						<h4 className='text-xl font-bold text-gray-900'>{title}</h4>
						<span
							className={`text-sm font-semibold text-white px-3 py-1 rounded-full ${
								selectedColor.split(' ')[0]
							}`}
						>
							{category?.toUpperCase() || 'GENERAL'}
						</span>
					</div>

					<p className='text-gray-600 mt-2 line-clamp-2'>{description}</p>

					<div className='flex justify-between items-center text-sm mt-4 pt-4 border-t border-gray-100 flex-wrap gap-2'>
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
