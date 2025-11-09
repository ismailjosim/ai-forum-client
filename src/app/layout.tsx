import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import { SidebarProvider } from '@/components/ui/sidebar'

import { AppSidebarWrapper } from '@/components/shared/AppSidebarWrapper'
import { SocketProvider } from './contexts/SocketContext'
import TopMenu from '@/components/shared/TopMenu'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'ConverseAI - AI Forum Application',
	description:
		'An interactive AI-powered forum where users can share ideas, ask questions, and connect with the community seamlessly.',
	icons: {
		icon: '/logo.png',
	},
}

const RootLayout = async ({
	children,
}: Readonly<{
	children: React.ReactNode
}>) => {
	return (
		<html lang='en' className='h-full'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex`}
			>
				<SocketProvider>
					<SidebarProvider>
						<AppSidebarWrapper />

						<div className='flex-1 flex flex-col'>
							{/* Top Navigation Bar */}
							<header className='bg-slate-900 border-b border-slate-800 px-6 py-3 flex justify-end'>
								<TopMenu />
							</header>

							<main className='flex-1 p-6 overflow-y-auto'>{children}</main>
						</div>
					</SidebarProvider>

					<Toaster richColors position='bottom-right' />
				</SocketProvider>
			</body>
		</html>
	)
}
export default RootLayout
