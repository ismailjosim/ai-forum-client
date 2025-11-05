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

export function NewThreadButton() {
	const [open, setOpen] = useState(false)
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

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		console.log('🧵 New Thread Data:', formData)
		setOpen(false)
		setFormData({ title: '', category: '', description: '' })
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
						>
							Submit
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
