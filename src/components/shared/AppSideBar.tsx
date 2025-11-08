// src/components/modules/AppSidebar.tsx
'use client'

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'
import { MessageCircle, User, Shield, LogOut } from 'lucide-react'
import Link from 'next/link'
import { CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { logoutUser } from '@/services/auth/logout'
import { useTransition } from 'react'

const items = [
	{ title: 'Threads', url: '/', icon: MessageCircle },
	{ title: 'Profile', url: '/profile', icon: User },
	{ title: 'Admin Tools', url: '/tools', icon: Shield, color: 'text-red-400' },
]

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

interface AppSidebarProps {
	user: User | null
}

export function AppSidebar({ user }: AppSidebarProps) {
	const [isPending, startTransition] = useTransition()

	const handleLogout = () => {
		startTransition(async () => {
			await logoutUser()
		})
	}

	// Filter items based on user role
	const filteredItems = items.filter((item) => {
		if (item.title === 'Admin Tools') {
			return user?.role === 'ADMIN'
		}
		return true
	})

	return (
		<Sidebar className='bg-[#0B1221] text-white w-64 flex flex-col border-r border-gray-800 shadow-lg h-screen'>
			{/* Header */}
			<div className='p-6 pb-8'>
				<div className='flex items-center justify-center space-x-2'>
					<CardTitle className='text-3xl font-extrabold'>ConverseAi</CardTitle>
				</div>
			</div>

			{/* Navigation */}
			<SidebarContent className='flex-1'>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu className='space-y-2'>
							{filteredItems.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link
											href={item.url}
											className={`flex items-center space-x-3 p-3 rounded-xl transition-colors font-medium ${
												item.color || ''
											}`}
										>
											<item.icon className='w-5 h-5' />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			{/* Footer */}
			<div className='mt-auto p-4 border-t border-gray-800 text-xs text-gray-400'>
				{user ? (
					<>
						<p className='font-semibold text-gray-300'>
							User: <span className='text-white'>{user.name}</span>
						</p>
						<p className='text-gray-500 truncate mt-1'>
							Email: <span className='text-gray-400'>{user.email}</span>
						</p>
						<Button
							onClick={handleLogout}
							disabled={isPending}
							variant='ghost'
							className='w-full mt-3 text-gray-300 hover:text-red-400 flex items-center justify-center gap-2 text-sm'
						>
							<LogOut className='w-4 h-4' />
							{isPending ? 'Logging out...' : 'Log out'}
						</Button>
					</>
				) : (
					<>
						<p>
							Status: <span className='text-yellow-400'>Not signed in</span>
						</p>
						<Button
							asChild
							variant='outline'
							className='w-full mt-3 text-sm text-gray-300 border-gray-700 hover:bg-gray-800'
						>
							<Link href='/login'>Login</Link>
						</Button>
					</>
				)}
			</div>
		</Sidebar>
	)
}
