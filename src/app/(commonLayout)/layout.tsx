import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebarWrapper } from '@/components/shared/AppSidebarWrapper'
import TopMenu from '@/components/shared/TopMenu'
import TopMenuWrapper from '../../components/shared/TopMenuWrapper'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex min-h-screen w-full'>
			<SidebarProvider>
				<AppSidebarWrapper />

				<div className='flex-1 flex flex-col w-full'>
					{/* Top Navigation Bar */}
					<header className='bg-slate-900 border-b border-slate-800 px-6 py-3 flex justify-end'>
						<TopMenuWrapper />
					</header>

					<main className='flex-1 p-6 overflow-y-auto bg-slate-50'>
						{children}
					</main>
				</div>
			</SidebarProvider>
		</div>
	)
}

export default MainLayout
