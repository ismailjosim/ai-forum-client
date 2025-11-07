import SingleThread from '@/components/modules/SingleThread/SingleThread'

interface SingleThreadPageProps {
	params: Promise<{
		slug: string
	}>
}

const SingleThreadPage = async ({ params }: SingleThreadPageProps) => {
	const { slug } = await params

	return <SingleThread id={slug} />
}

export default SingleThreadPage
