// src/components/shared/SidebarUserProfile.tsx
'use client'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LogOut, User as UserIcon, Settings } from 'lucide-react'
import Link from 'next/link'
import { useTransition } from 'react'
import { logoutUser } from '@/services/auth/logout'

export interface User {
	_id: string
	name: string
	email: string
	picture: string | null
	role: 'USER' | 'ADMIN' | string
	isActive: 'ACTIVE' | 'INACTIVE' | string
	isDeleted: boolean
	isVerified: boolean
	createdAt: string
	updatedAt: string
}

interface UserProfileProps {
	user: User | null
}

const UserProfile = ({ user }: UserProfileProps) => {
	const [isPending, startTransition] = useTransition()

	const handleLogout = () => {
		startTransition(async () => {
			await logoutUser()
		})
	}

	if (user) {
		// Get user initials for avatar fallback
		const initials = user.name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.toUpperCase()
			.slice(0, 2)

		return (
			<div className=' border-t border-gray-800'>
				<div className='flex items-center justify-between gap-3'>
					{/* Avatar with Dropdown */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='ghost'
								className='h-10 w-10 rounded-full p-0 hover:ring-2 hover:ring-indigo-500 transition-all'
							>
								<Avatar className='h-10 w-10'>
									<AvatarImage
										src={user.picture || undefined}
										alt={user.name}
									/>
									<AvatarFallback className='bg-indigo-600 text-white font-semibold'>
										{initials}
									</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align='end'
							className='w-56 bg-slate-900 border-gray-800 text-gray-100'
						>
							<DropdownMenuLabel className='font-normal'>
								<div className='flex flex-col space-y-1'>
									<p className='text-sm font-medium text-white'>{user.name}</p>
									<p className='text-xs text-gray-400 truncate'>{user.email}</p>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator className='bg-gray-800' />
							<DropdownMenuItem
								asChild
								className='cursor-pointer hover:bg-slate-800'
							>
								<Link href='/profile' className='flex items-center'>
									<UserIcon className='mr-2 h-4 w-4' />
									<span>My Profile</span>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem
								asChild
								className='cursor-pointer hover:bg-slate-800'
							>
								<Link href='/settings' className='flex items-center'>
									<Settings className='mr-2 h-4 w-4' />
									<span>Settings</span>
								</Link>
							</DropdownMenuItem>
							<DropdownMenuSeparator className='bg-gray-800' />
							<DropdownMenuItem
								onClick={handleLogout}
								disabled={isPending}
								className='cursor-pointer hover:bg-red-900/20 text-red-400 focus:text-red-400 focus:bg-red-900/20'
							>
								<LogOut className='mr-2 h-4 w-4' />
								<span>{isPending ? 'Logging out...' : 'Log out'}</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		)
	}
}

export default UserProfile
