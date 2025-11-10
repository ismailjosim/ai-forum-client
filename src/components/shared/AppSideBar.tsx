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
import { MessageCircle, User, Shield } from 'lucide-react'
import Link from 'next/link'
import { CardTitle } from '../ui/card'

import { type User as UserInfo } from './UserProfile'

const items = [
	{ title: 'Threads', url: '/', icon: MessageCircle },
	{ title: 'Profile', url: '/profile', icon: User },
	{ title: 'Admin Tools', url: '/tools', icon: Shield, color: 'text-red-400' },
]

interface AppSidebarProps {
	user: UserInfo | null
}

export function AppSidebar({ user }: AppSidebarProps) {
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
		</Sidebar>
	)
}
