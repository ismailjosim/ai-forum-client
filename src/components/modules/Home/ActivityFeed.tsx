import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function ActivityFeed() {
	return (
		<Card className='bg-white dark:bg-gray-900 shadow-2xl'>
			<CardContent className='p-8'>
				<h3 className='text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center'>
					<span className='mr-3 text-indigo-500'>🔥</span> Real-Time Activity
					Feed
				</h3>

				<ul className='space-y-4'>
					<li className='border-b border-gray-100 dark:border-gray-700 pb-4 last:border-b-0'>
						<div className='flex justify-between items-start'>
							<p className='text-md text-gray-800 dark:text-gray-200'>
								<span className='font-bold text-indigo-600'>New Post</span> in{' '}
								<a
									href='#'
									className='text-blue-500 hover:text-blue-700 font-semibold'
								>
									Backend Scalability: Choosing a Database
								</a>{' '}
								by{' '}
								<span className='text-gray-600 dark:text-gray-400'>Alice</span>
							</p>
							<time className='text-xs text-gray-400 shrink-0 ml-4'>
								just now
							</time>
						</div>
					</li>

					<li className='border-b border-gray-100 dark:border-gray-700 pb-4 last:border-b-0'>
						<div className='flex justify-between items-start'>
							<p className='text-md text-gray-800 dark:text-gray-200'>
								<span className='font-bold text-green-600'>Reply</span> to{' '}
								<span className='text-gray-600 dark:text-gray-400'>Bob</span> in{' '}
								<a
									href='#'
									className='text-blue-500 hover:text-blue-700 font-semibold'
								>
									The Great Caching Debate
								</a>{' '}
								by{' '}
								<span className='text-gray-600 dark:text-gray-400'>
									Charlie
								</span>
							</p>
							<time className='text-xs text-gray-400 shrink-0 ml-4'>
								2 minutes ago
							</time>
						</div>
					</li>

					<li className='pb-4 last:border-b-0'>
						<div className='flex justify-between items-start'>
							<p className='text-md text-gray-800 dark:text-gray-200'>
								<span className='font-bold text-yellow-600'>
									New Thread Created
								</span>
								:{' '}
								<a
									href='#'
									className='text-blue-500 hover:text-blue-700 font-semibold'
								>
									Implementing LLM API for Moderation
								</a>{' '}
								by <span className='text-gray-600 dark:text-gray-400'>Dev</span>
							</p>
							<time className='text-xs text-gray-400 shrink-0 ml-4'>
								5 minutes ago
							</time>
						</div>
					</li>
				</ul>

				<Button className='mt-6 w-full bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl shadow-md'>
					View All Activity
				</Button>
			</CardContent>
		</Card>
	)
}
