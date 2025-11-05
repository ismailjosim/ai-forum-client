export interface Post {
	id: number
	author: string
	time: string
	content: string
	flagged?: boolean
	color?: 'indigo' | 'green' | 'red' | 'gray'
	isAuthor?: boolean
	votes?: number
	replies?: Post[]
}

export interface ThreadData {
	_id: string
	title: string
	author: string
	date: string
	category: string
	summary: string
	posts: Post[]
}
