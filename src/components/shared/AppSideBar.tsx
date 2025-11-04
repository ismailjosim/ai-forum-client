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
import { Home, MessageCircle, User, Shield } from 'lucide-react'
import { usePathname } from 'next/navigation'

const items = [
	{
		title: 'Overview',
		url: '/',
		icon: Home,
	},
	{
		title: 'Threads',
		url: '/threads',
		icon: MessageCircle,
	},
	{
		title: 'Profile',
		url: '/profile',
		icon: User,
	},
	{
		title: 'Admin Tools',
		url: '/tools',
		icon: Shield,
		color: 'text-red-400',
	},
]

export function AppSidebar() {
	const pathname = usePathname()

	return (
		<Sidebar className='bg-[#0B1221] text-white w-64 flex flex-col border-r border-gray-800 shadow-lg h-screen'>
			{/* Header */}
			<div className='p-6 pb-8'>
				<h1 className='text-3xl font-extrabold tracking-wider flex items-center space-x-2 text-indigo-400'>
					<span role='img' aria-label='chat'>
						💬
					</span>
					<span>AI Forum</span>
				</h1>
			</div>

			{/* Navigation */}
			<SidebarContent className='flex-1'>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu className='space-y-2'>
							{items.map((item) => {
								const isActive = pathname === item.url
								return (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton asChild>
											<a
												href={item.url}
												className={`flex items-center space-x-3 p-3 rounded-xl transition-colors font-medium ${
													isActive
														? 'bg-indigo-600 text-white shadow-lg font-semibold'
														: 'hover:bg-gray-800 text-gray-300'
												} ${item.color || ''}`}
											>
												<item.icon className='w-5 h-5' />
												<span>{item.title}</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								)
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			{/* Footer */}
			<div className='mt-auto p-4 border-t border-gray-800 text-xs text-gray-400'>
				<p>Status: Initializing...</p>
				<p className='text-gray-500 truncate mt-1'>
					ID: <span id='user-id-full'>--</span>
				</p>
			</div>
		</Sidebar>
	)
}
