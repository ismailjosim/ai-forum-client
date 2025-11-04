import { AppSidebar } from '../../components/shared/AppSideBar'
import { SidebarProvider, SidebarTrigger } from '../../components/ui/sidebar'

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main>
				<SidebarTrigger />
				{children}
			</main>
		</SidebarProvider>
	)
}

export default CommonLayout
