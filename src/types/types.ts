export interface ThreadResponse {
	statusCode: number
	success: boolean
	message: string
	data: {
		thread: Thread
		threadPost: Post[]
	}
}

export interface Thread {
	_id: string
	title: string
	content: string
	category: string
	author: string
	tags: string[]
	views: number
	createdAt: string
	updatedAt: string
}

export interface Post {
	_id: string
	content: string
	author: string
	thread: string
	parentPost: string | null
	likes: string[]
	createdAt: string
	updatedAt: string
	replies: Post[]
}
