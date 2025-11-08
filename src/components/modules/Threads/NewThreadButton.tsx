'use client'

import { useState } from 'react'
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

import { toast } from 'sonner'
import { createThread } from '../../../utility/actions/thread'

export interface ThreadData {
	title: string
	content: string
	category: string
	author: string
}

export function NewThreadButton() {
	const [open, setOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [formData, setFormData] = useState({
		title: '',
		category: '',
		description: '',
	})

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)

		const threadPayload: ThreadData = {
			title: formData.title,
			content: formData.description,
			category: formData.category,
			author: '690b67298a164a65224b83b3',
		}

		try {
			const result = await createThread(threadPayload)

			if (result.success) {
				toast.success('Thread created successfully!')
				setOpen(false) // close modal on success
				setFormData({ title: '', category: '', description: '' })
			} else {
				toast.error(result.message || 'Failed to create thread.')
			}
		} catch (err) {
			console.error('Error creating thread:', err)
			toast.error('Something went wrong. Please try again.')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className='w-full sm:w-auto flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white rounded-xl px-6 py-3 shadow-lg'>
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
						/>
					</div>

					<div>
						<Label htmlFor='category'>Category</Label>
						<Input
							id='category'
							name='category'
							value={formData.category}
							onChange={handleChange}
							placeholder='e.g. AI, HOT, CLOSED'
							required
						/>
					</div>

					<div>
						<Label htmlFor='description'>Description</Label>
						<Textarea
							id='description'
							name='description'
							value={formData.description}
							onChange={handleChange}
							placeholder='Write a short description...'
							required
						/>
					</div>

					<DialogFooter>
						<Button
							type='submit'
							className='w-full bg-green-500 hover:bg-green-600 text-white'
							disabled={isLoading}
						>
							{isLoading ? 'Creating...' : 'Submit'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
