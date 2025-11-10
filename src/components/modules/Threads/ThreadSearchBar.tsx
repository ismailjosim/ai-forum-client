'use client'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useState } from 'react'

interface ThreadSearchBarProps {
	onSearch?: (query: string) => void
}

export function ThreadSearchBar({ onSearch }: ThreadSearchBarProps) {
	const [search, setSearch] = useState('')

	const handleSearch = (val: string) => {
		setSearch(val)
		onSearch?.(val) // call parent callback
	}

	return (
		<div className='relative flex-1 w-full'>
			<Search className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
			<Input
				type='text'
				value={search}
				placeholder='Search threads...'
				onChange={(e) => handleSearch(e.target.value)}
				className='pl-10 w-full'
			/>
		</div>
	)
}
