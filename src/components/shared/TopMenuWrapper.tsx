import { getUserProfile } from '../../services/auth/get-user'
import TopMenu from './TopMenu'

const TopMenuWrapper = async () => {
	const user = await getUserProfile()
	return <TopMenu user={user} />
}

export default TopMenuWrapper
