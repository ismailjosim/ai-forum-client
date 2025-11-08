'use client'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

interface ThreadSearchBarProps {
	onSearch?: (query: string) => void
}

export function ThreadSearchBar({ onSearch }: ThreadSearchBarProps) {
	return (
		<div className='relative flex-1 w-full'>
			<Search className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
			<Input
				type='text'
				placeholder='Search threads...'
				onChange={(e) => onSearch?.(e.target.value)}
				className='pl-10 w-full'
			/>
		</div>
	)
}
