'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

interface SocketContextType {
	socket: Socket | null
	isConnected: boolean
}

const SocketContext = createContext<SocketContextType>({
	socket: null,
	isConnected: false,
})

export const useSocket = () => useContext(SocketContext)

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
	const [socket, setSocket] = useState<Socket | null>(null)
	const [isConnected, setIsConnected] = useState(false)

	useEffect(() => {
		const socketInstance = io(
			process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
			{ withCredentials: true },
		)

		// ✅ update state in a callback (safe for React 19)
		socketInstance.on('connect', () => {
			setSocket(socketInstance)
			setIsConnected(true)
		})

		socketInstance.on('disconnect', () => {
			setIsConnected(false)
		})

		return () => {
			socketInstance.disconnect()
		}
	}, [])

	return (
		<SocketContext.Provider value={{ socket, isConnected }}>
			{children}
		</SocketContext.Provider>
	)
}
