'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { createThread, ThreadData } from '@/services/thread/thread'
import { useRouter } from 'next/navigation'

export enum ThreadCategory {
	General = 'general',
	Technology = 'technology',
	Science = 'science',
	Entertainment = 'entertainment',
	Sports = 'sports',
	Other = 'other',
}

export function NewThreadButton() {
	const router = useRouter()
	const [open, setOpen] = useState(false)
	const [isPending, startTransition] = useTransition()
	const [formData, setFormData] = useState({
		title: '',
		category: '',
		content: '',
	})

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleCategoryChange = (value: string) => {
		setFormData({ ...formData, category: value })
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!formData.category) {
			toast.error('Please select a category')
			return
		}

		const threadPayload: ThreadData = {
			title: formData.title,
			content: formData.content,
			category: formData.category,
		}

		startTransition(async () => {
			try {
				const result = await createThread(threadPayload)

				if (result.success) {
					toast.success('Thread created successfully!')
					setOpen(false)
					setFormData({ title: '', category: '', content: '' })
					router.refresh()
				} else {
					toast.error(result.error || 'Failed to create thread.')
				}
			} catch (err) {
				console.error('Error creating thread:', err)
				toast.error('Something went wrong. Please try again.')
			}
		})
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className='w-full sm:w-auto flex items-center space-x-2 bg-primary hover:bg-secondary-foreground text-white rounded-xl px-6 py-3 shadow-lg'>
					<Plus className='w-5 h-5' />
					<span>New Thread</span>
				</Button>
			</DialogTrigger>

			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>Create New Thread</DialogTitle>
				</DialogHeader>

				<form onSubmit={handleSubmit} className='space-y-4 mt-3'>
					<div>
						<Label htmlFor='title'>Title</Label>
						<Input
							id='title'
							name='title'
							value={formData.title}
							onChange={handleChange}
							placeholder='Enter thread title'
							required
							disabled={isPending}
						/>
					</div>

					<div>
						<Label htmlFor='category'>Category</Label>
						<Select
							value={formData.category}
							onValueChange={handleCategoryChange}
							disabled={isPending}
						>
							<SelectTrigger className='w-full bg-white  border-gray-300 '>
								<SelectValue placeholder='Select a category' />
							</SelectTrigger>
							<SelectContent className='bg-white  border-gray-300 '>
								{Object.entries(ThreadCategory).map(([key, value]) => (
									<SelectItem
										key={value}
										value={value}
										className='cursor-pointer hover:bg-gray-100 '
									>
										{key}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div>
						<Label htmlFor='content'>Content</Label>
						<Textarea
							id='content'
							name='content'
							value={formData.content}
							onChange={handleChange}
							placeholder='Write your thread content...'
							rows={5}
							required
							disabled={isPending}
						/>
					</div>

					<DialogFooter>
						<Button
							type='button'
							variant='outline'
							onClick={() => setOpen(false)}
							disabled={isPending}
						>
							Cancel
						</Button>
						<Button
							type='submit'
							className='bg-green-500 hover:bg-green-600 text-white'
							disabled={isPending}
						>
							{isPending ? 'Creating...' : 'Create Thread'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
