import { Card, CardContent } from '@/components/ui/card'

const stats = [
	{ title: 'Total Registered Users', value: '1,245' },
	{ title: 'Active Discussion Threads', value: '102' },
	{ title: 'New Posts Today (Live)', value: '347' },
	{ title: 'AI Flagged Rate (24h)', value: '1.8%', color: 'text-red-600' },
]

export function QuickStats() {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10'>
			{stats.map((item) => (
				<Card
					key={item.title}
					className='bg-white dark:bg-gray-900 border-b-4 border-indigo-500 shadow-lg hover:shadow-xl transition duration-300'
				>
					<CardContent className='p-6'>
						<p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
							{item.title}
						</p>
						<p
							className={`text-4xl font-extrabold text-gray-900 dark:text-white mt-2 ${
								item.color || ''
							}`}
						>
							{item.value}
						</p>
					</CardContent>
				</Card>
			))}
		</div>
	)
}
