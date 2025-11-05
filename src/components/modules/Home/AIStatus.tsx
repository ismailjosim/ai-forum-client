import { Card, CardContent } from '@/components/ui/card'

export function AIStatus() {
	return (
		<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10'>
			<Card className='bg-white dark:bg-gray-900 border-l-4 border-green-500 shadow-2xl'>
				<CardContent className='p-8'>
					<h3 className='text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center'>
						<span className='mr-3 text-green-500'>🤖</span> AI Engine Status
					</h3>
					<p className='text-gray-600 dark:text-gray-400 mb-4'>
						Tracking content quality and automatic summarization tasks.
					</p>

					<div className='space-y-3'>
						<div className='flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700'>
							<p className='text-gray-700 dark:text-gray-300'>
								Posts Flagged for Review (24h):
							</p>
							<span className='font-bold text-lg text-red-600'>12</span>
						</div>
						<div className='flex justify-between items-center py-2'>
							<p className='text-gray-700 dark:text-gray-300'>
								Threads Auto-Summarized:
							</p>
							<span className='font-bold text-lg text-green-600'>89</span>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card className='bg-white dark:bg-gray-900 border-l-4 border-blue-500 shadow-2xl'>
				<CardContent className='p-8'>
					<h3 className='text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center'>
						<span className='mr-3 text-blue-500'>🔔</span> Async Task Queue
					</h3>
					<p className='text-gray-600 dark:text-gray-400 mb-4'>
						Monitoring background processing for notifications and webhooks.
					</p>

					<div className='space-y-3'>
						<div className='flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700'>
							<p className='text-gray-700 dark:text-gray-300'>
								Pending Notification Tasks:
							</p>
							<span className='font-bold text-lg text-yellow-600'>5</span>
						</div>
						<div className='flex justify-between items-center py-2'>
							<p className='text-gray-700 dark:text-gray-300'>
								Active Webhook Integrations:
							</p>
							<span className='font-bold text-lg text-blue-600'>3</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
