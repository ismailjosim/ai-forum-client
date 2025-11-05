import { Overview } from '../../components/modules/Home/Overview'

const HomePage = () => {
	return (
		<section>
			<div>
				<h2 className='text-3xl md:text-4xl font-extrabold mb-8 text-gray-900'>
					Platform Status Overview
				</h2>
				<Overview />
			</div>
		</section>
	)
}

export default HomePage
