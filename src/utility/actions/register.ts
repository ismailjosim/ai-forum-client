'use server'

import { UserData } from '@/components/modules/Auth/RegisterForm'

export const registerUser = async (data: UserData) => {
	console.log(data)
	const res = await fetch(`${process.env.BACKEND_URL}/user/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
		cache: 'no-store',
	})
	const userInfo = await res.json()
	return userInfo
}
