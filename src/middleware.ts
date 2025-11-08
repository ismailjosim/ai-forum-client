export { default } from 'next-auth/middleware'

// Protect all dynamic thread routes like /threads/[slug]
export const config = {
	matcher: ['/threads/:path*'],
}
