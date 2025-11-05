import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export function ThreadSearchBar() {
	return (
		<div className='relative w-full'>
			<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
			<Input
				type='text'
				placeholder='Search threads by keyword or author...'
				className='pl-10 pr-4 py-3 rounded-xl'
			/>
		</div>
	)
}
