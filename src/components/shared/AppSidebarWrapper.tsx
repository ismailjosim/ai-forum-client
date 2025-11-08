import { getUserProfile } from '../../services/auth/get-user'
import { AppSidebar } from './AppSideBar'

export async function AppSidebarWrapper() {
	const user = await getUserProfile()

	return <AppSidebar user={user} />
}
