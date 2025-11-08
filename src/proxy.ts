import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { cookies } from 'next/headers'

// Define user roles
type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'USER'

// Utility: define which routes are auth-related (login/register)
const authRoutes = ['/login', '/register', '/forgot-password']

// Optional helper: default home route for each role
function getDefaultHome(role: UserRole): string {
	switch (role) {
		case 'SUPER_ADMIN':
			return '/super-admin'
		case 'ADMIN':
			return '/admin'
		default:
			return '/user'
	}
}

export async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl
	const cookieStore = await cookies()
	const accessToken = request.cookies.get('accessToken')?.value || null

	let userRole: UserRole | null = null

	// -------------------------
	// Step 1: Decode JWT if exists
	// -------------------------
	if (accessToken) {
		try {
			const verifiedToken = jwt.verify(
				accessToken,
				process.env.JWT_ACCESS_SECRET as string,
			)
			if (typeof verifiedToken === 'string') {
				// invalid token (string payload)
				cookieStore.delete('accessToken')
				cookieStore.delete('refreshToken')
				return NextResponse.redirect(new URL('/login', request.url))
			}
			userRole = verifiedToken.role as UserRole
		} catch (error) {
			console.log(error)
			// expired or invalid token
			cookieStore.delete('accessToken')
			cookieStore.delete('refreshToken')
			return NextResponse.redirect(new URL('/login', request.url))
		}
	}

	// -------------------------
	// Step 2: Auth Route Handling
	// -------------------------
	const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

	// If user is logged in and trying to visit login/register → redirect to home
	if (accessToken && isAuthRoute) {
		return NextResponse.redirect(
			new URL(getDefaultHome(userRole as UserRole), request.url),
		)
	}

	// If route is auth-related (login/register) → allow without login
	if (isAuthRoute) {
		return NextResponse.next()
	}

	// -------------------------
	// Step 3: Protect All Other Routes
	// -------------------------
	if (!accessToken) {
		const loginUrl = new URL('/login', request.url)
		loginUrl.searchParams.set('redirect', pathname)
		return NextResponse.redirect(loginUrl)
	}

	// Allow all other private routes
	return NextResponse.next()
}

// Match all routes except public/static/api assets
export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)',
	],
}
