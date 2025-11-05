import { QuickStats } from './QuickStats'
import { AIStatus } from './AIStatus'
import { ActivityFeed } from './ActivityFeed'

export function Overview() {
	return (
		<div id='overview-view' className='app-view p-6 md:p-10'>
			<h2 className='text-3xl md:text-4xl font-extrabold mb-8 text-gray-900 dark:text-white'>
				Platform Status Overview
			</h2>

			<QuickStats />
			<AIStatus />
			<ActivityFeed />
		</div>
	)
}
