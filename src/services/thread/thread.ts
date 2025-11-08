'use server'

import { ThreadData } from '@/components/modules/Threads/NewThreadButton'

export const createThread = async (data: ThreadData) => {
	console.log(data)
	const res = await fetch(`${process.env.BACKEND_URL}/thread/create-thread`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
		cache: 'no-store',
	})
	const threadData = await res.json()
	return threadData
}
