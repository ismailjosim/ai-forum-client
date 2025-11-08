import { SingleThreadWrapper } from '@/components/modules/SingleThread/SingleThreadWrapper'

interface SingleThreadPageProps {
	params: Promise<{
		slug: string
	}>
}

const SingleThreadPage = async ({ params }: SingleThreadPageProps) => {
	const { slug } = await params

	return <SingleThreadWrapper id={slug} />
}

export default SingleThreadPage
