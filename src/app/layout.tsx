import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/shared/AppSideBar'
import { getServerSession } from 'next-auth'
import { authOptions } from '../utility/authOptions'

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
	const session = await getServerSession(authOptions)
	return (
		<html lang='en' className='h-full'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased  min-h-screen flex`}
			>
				<SidebarProvider>
					{/* Sidebar */}
					<AppSidebar session={session} />

					{/* Main Content */}

					<main className='flex-1 p-6 overflow-y-auto'>{children}</main>
				</SidebarProvider>

				<Toaster richColors position='bottom-right' />
			</body>
		</html>
	)
}
export default RootLayout
