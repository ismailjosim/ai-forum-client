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
import { Home, MessageCircle, User, Shield, LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { CardTitle } from '../ui/card'
import { Session } from 'next-auth'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'

const items = [
	{
		title: 'Threads',
		url: '/',
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

interface NavbarProps {
	session: Session | null
}

export function AppSidebar({ session }: NavbarProps) {
	const pathname = usePathname()

	const handleLogout = async () => {
		await signOut({ callbackUrl: '/login' })
	}

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
							{items.map((item) => {
								const isActive = pathname === item.url
								return (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton asChild>
											<Link
												href={item.url}
												className={`flex items-center space-x-3 p-3 rounded-xl transition-colors font-medium ${
													isActive
														? 'bg-indigo-600 text-white shadow-lg font-semibold'
														: 'hover:bg-gray-800 text-gray-300'
												} ${item.color || ''}`}
											>
												<item.icon className='w-5 h-5' />
												<span>{item.title}</span>
											</Link>
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
				{session ? (
					<>
						<p className='font-semibold text-gray-300'>
							User:{' '}
							<span className='text-white'>
								{session.user?.name || 'Unknown'}
							</span>
						</p>
						<p className='text-gray-500 truncate mt-1'>
							Email:{' '}
							<span className='text-gray-400'>
								{session.user?.email || '--'}
							</span>
						</p>
						<Button
							onClick={handleLogout}
							variant='ghost'
							className='w-full mt-3 text-gray-300 hover:text-red-400 flex items-center justify-center gap-2 text-sm'
						>
							<LogOut className='w-4 h-4' />
							Log out
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
