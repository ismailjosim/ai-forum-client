'use client'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { IThread } from '../../../services/thread/get-threads'
import { SquarePen, Trash } from 'lucide-react'
import { deleteThread } from '../../../services/thread/delete-thread'
import { toast } from 'sonner'

interface MyThreadsTableProps {
	threads: IThread[]
}

export function MyThreadsTable({ threads }: MyThreadsTableProps) {
	const router = useRouter()
	const [loadingId, setLoadingId] = useState<string | null>(null)

	const handleEdit = (id: string) => {
		router.push(`/thread/edit/${id}`)
	}

	const handleDelete = async (id: string) => {
		if (!confirm('Are you sure you want to delete this thread?')) return
		setLoadingId(id)

		const result = await deleteThread(id as string)

		if (result.success) {
			toast.success(result.message)
			router.refresh()
		} else {
			toast.error(result.message)
		}

		setLoadingId(null)
	}

	return (
		<div className='border rounded-xl shadow-sm'>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Title</TableHead>
						<TableHead>Category</TableHead>
						<TableHead>Views</TableHead>
						<TableHead>Created</TableHead>
						<TableHead className='text-right'>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{threads.map((thread) => (
						<TableRow key={thread._id}>
							<TableCell className='font-medium'>{thread.title}</TableCell>
							<TableCell>{thread.category}</TableCell>
							<TableCell>{thread.views}</TableCell>
							<TableCell>
								{new Date(thread.createdAt).toLocaleDateString()}
							</TableCell>
							<TableCell className='text-right space-x-2'>
								<Button
									variant='outline'
									size='sm'
									onClick={() => handleEdit(thread._id)}
								>
									<SquarePen />
								</Button>
								<Button
									variant='secondary'
									className='text-white bg-red-500 hover:bg-red-600'
									size='sm'
									onClick={() => handleDelete(thread._id)}
									disabled={loadingId === thread._id}
								>
									{loadingId === thread._id ? 'Deleting...' : <Trash />}
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			{threads.length === 0 && (
				<p className='text-center text-muted-foreground py-6'>
					No threads found.
				</p>
			)}
		</div>
	)
}
