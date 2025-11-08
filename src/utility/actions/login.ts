const loginUser = async (data: { email: string; password: string }) => {
	try {
		const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
			credentials: 'include',
		})
		if (!res.ok) {
			throw new Error('login failed')
		}
		const result = await res.json()
		return result
	} catch (error) {
		throw new Error(String(error))
	}
}
export default loginUser
