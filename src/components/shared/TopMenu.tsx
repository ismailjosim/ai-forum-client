/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect, useCallback } from 'react'
import {
	Bell,
	MessageSquare,
	ThumbsUp,
	CheckCircle,
	Settings,
	X,
	AtSign,
} from 'lucide-react'
import { useSocket } from '@/app/contexts/SocketContext'
import {
	getNotifications,
	markNotificationsAsRead,
	markAllNotificationsAsRead,
	deleteNotification,
	type INotification,
} from '@/services/notification/notification-service'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import UserProfile from './UserProfile'

export interface User {
	_id: string
	name: string
	email: string
	picture: string | null
	role: 'USER' | 'ADMIN' | string
	isActive: 'ACTIVE' | 'INACTIVE' | string
	isDeleted: boolean
	isVerified: boolean
	createdAt: string
	updatedAt: string
}

interface UserProfileProps {
	user: User | null
}

const TopMenu = ({ user }: UserProfileProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const [notifications, setNotifications] = useState<INotification[]>([])
	const [unreadCount, setUnreadCount] = useState(0)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const { socket, isConnected } = useSocket()
	const router = useRouter()

	// Fetch notifications from backend
	const fetchNotifications = useCallback(async () => {
		try {
			setLoading(true)
			setError(null)

			const result = await getNotifications(0, 20, false)

			if (result.success && result.data) {
				// Safely handle the data
				const notificationsList = Array.isArray(result.data.notifications)
					? result.data.notifications
					: []

				setNotifications(notificationsList)
				setUnreadCount(result.data.unreadCount || 0)
			} else {
				console.error('Failed to fetch notifications:', result.error)
				setError(result.error || 'Failed to load notifications')
			}
		} catch (error) {
			console.error('Error fetching notifications:', error)
			setError('An error occurred while loading notifications')
		} finally {
			setLoading(false)
		}
	}, [])

	// Initial fetch
	useEffect(() => {
		fetchNotifications()
	}, [fetchNotifications])

	// Socket.IO real-time updates
	useEffect(() => {
		if (!socket || !isConnected) {
			console.log('⚠️ Socket not ready:', { socket: !!socket, isConnected })
			return
		}

		console.log('👂 Setting up notification listeners')

		// New notification received
		const handleNewNotification = (notification: INotification) => {
			console.log('📩 New notification received:', notification)

			// Validate notification object
			if (!notification || !notification._id) {
				console.error('Invalid notification received:', notification)
				return
			}

			setNotifications((prev) => [notification, ...prev])
			setUnreadCount((prev) => prev + 1)

			// Show toast notification
			toast.info('New Notification', {
				description: notification.title || 'You have a new notification',
			})
		}

		// Notifications marked as read
		const handleMarkedRead = (notificationIds: string[]) => {
			console.log('✅ Notifications marked as read:', notificationIds)

			if (!Array.isArray(notificationIds)) {
				console.error('Invalid notificationIds:', notificationIds)
				return
			}

			setNotifications((prev) =>
				prev.map((n) =>
					notificationIds.includes(n._id) ? { ...n, isRead: true } : n,
				),
			)
			setUnreadCount((prev) => Math.max(0, prev - notificationIds.length))
		}

		// All notifications marked as read
		const handleAllMarkedRead = () => {
			console.log('✅ All notifications marked as read')
			setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
			setUnreadCount(0)
		}

		// Notification deleted
		const handleDeleted = (notificationId: string) => {
			console.log('🗑️ Notification deleted:', notificationId)

			if (!notificationId) {
				console.error('Invalid notificationId:', notificationId)
				return
			}

			const deletedNotification = notifications.find(
				(n) => n._id === notificationId,
			)

			setNotifications((prev) => prev.filter((n) => n._id !== notificationId))

			if (deletedNotification && !deletedNotification.isRead) {
				setUnreadCount((prev) => Math.max(0, prev - 1))
			}
		}

		// Register event listeners
		socket.on('notification:new', handleNewNotification)
		socket.on('notification:marked_read', handleMarkedRead)
		socket.on('notification:all_marked_read', handleAllMarkedRead)
		socket.on('notification:deleted', handleDeleted)

		return () => {
			console.log('🧹 Cleaning up notification listeners')
			socket.off('notification:new', handleNewNotification)
			socket.off('notification:marked_read', handleMarkedRead)
			socket.off('notification:all_marked_read', handleAllMarkedRead)
			socket.off('notification:deleted', handleDeleted)
		}
	}, [socket, isConnected, notifications])

	// Mark all as read
	const handleMarkAllAsRead = async () => {
		if (unreadCount === 0) return

		try {
			const result = await markAllNotificationsAsRead()

			if (result.success) {
				setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
				setUnreadCount(0)
				toast.success('All notifications marked as read')
			} else {
				toast.error(result.error || 'Failed to mark all as read')
			}
		} catch (error) {
			console.error('Error marking all as read:', error)
			toast.error('Failed to mark all as read')
		}
	}

	// Remove notification
	const handleRemoveNotification = async (id: string, e?: React.MouseEvent) => {
		if (e) {
			e.stopPropagation()
		}
		console.log(id)

		try {
			const result = await deleteNotification(id)

			if (result.success) {
				const notification = notifications.find((n) => n._id === id)
				setNotifications((prev) => prev.filter((n) => n._id !== id))

				if (notification && !notification.isRead) {
					setUnreadCount((prev) => Math.max(0, prev - 1))
				}

				toast.success('Notification deleted')
			} else {
				toast.error(result.error || 'Failed to delete notification')
			}
		} catch (error) {
			console.error('Error deleting notification:', error)
			toast.error('Failed to delete notification')
		}
	}

	// Handle notification click
	const handleNotificationClick = async (notification: INotification) => {
		// Mark as read if unread
		if (!notification.isRead) {
			try {
				const result = await markNotificationsAsRead([notification._id])

				if (result.success) {
					setNotifications((prev) =>
						prev.map((n) =>
							n._id === notification._id ? { ...n, isRead: true } : n,
						),
					)
					setUnreadCount((prev) => Math.max(0, prev - 1))
				}
			} catch (error) {
				console.error('Error marking as read:', error)
			}
		}

		// Navigate to thread if available
		if (notification.threadId) {
			router.push(`/threads/${notification.threadId}`)
			setIsOpen(false)
		}
	}

	// Get icon and color for notification type
	const getNotificationIcon = (type: string) => {
		const iconMap: Record<string, { Icon: any; color: string }> = {
			reply: { Icon: MessageSquare, color: 'text-blue-400' },
			mention: { Icon: AtSign, color: 'text-purple-400' },
			like: { Icon: ThumbsUp, color: 'text-yellow-400' },
			thread_approved: { Icon: CheckCircle, color: 'text-green-400' },
			system: { Icon: Settings, color: 'text-gray-400' },
		}

		return iconMap[type] || { Icon: Bell, color: 'text-gray-400' }
	}

	// Format time ago
	const timeAgo = (dateString: string) => {
		try {
			const date = new Date(dateString)
			const seconds = Math.floor((Date.now() - date.getTime()) / 1000)

			if (isNaN(seconds)) return 'Recently'
			if (seconds < 60) return 'Just now'
			if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
			if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
			if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`

			return date.toLocaleDateString()
		} catch {
			return 'Recently'
		}
	}

	return (
		<div className='relative flex items-center gap-5'>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className=' p-2 rounded-full hover:bg-slate-700/50 transition-colors'
				aria-label='Notifications'
			>
				<Bell className='w-6 h-6 text-slate-300' />
				{unreadCount > 0 && (
					<span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-5 h-5 px-1 flex items-center justify-center'>
						{unreadCount > 99 ? '99+' : unreadCount}
					</span>
				)}
				{/* Connection status indicator */}
				{!isConnected && (
					<span
						className='absolute bottom-0 right-0 w-2 h-2 bg-yellow-500 rounded-full'
						title='Disconnected'
					/>
				)}
			</button>

			{/* Notification Dropdown Panel */}
			{isOpen && (
				<>
					{/* Backdrop */}
					<div
						className='fixed inset-0 z-40'
						onClick={() => setIsOpen(false)}
					/>

					{/* Dropdown */}
					<div className='absolute top-10 right-0 mt-2 w-96 bg-slate-800 rounded-lg shadow-2xl border border-slate-700 z-50 overflow-hidden'>
						{/* Header */}
						<div className='flex items-center justify-between p-4 border-b border-slate-700'>
							<h3 className='text-lg font-semibold text-slate-100'>
								Notifications
							</h3>
							{unreadCount > 0 && (
								<button
									onClick={handleMarkAllAsRead}
									className='text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium'
								>
									Mark all as read
								</button>
							)}
						</div>

						{/* Notification List */}
						<div className='max-h-96 overflow-y-auto'>
							{loading ? (
								<div className='p-8 text-center text-slate-400'>
									<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto' />
									<p className='mt-2 text-sm'>Loading notifications...</p>
								</div>
							) : error ? (
								<div className='p-8 text-center text-red-400'>
									<p className='text-sm'>{error}</p>
									<button
										onClick={fetchNotifications}
										className='mt-2 text-xs text-blue-400 hover:text-blue-300'
									>
										Retry
									</button>
								</div>
							) : !Array.isArray(notifications) ||
							  notifications.length === 0 ? (
								<div className='p-8 text-center text-slate-400'>
									<Bell className='w-12 h-12 mx-auto mb-2 opacity-50' />
									<p className='text-sm'>No notifications</p>
								</div>
							) : (
								notifications.map((notification) => {
									if (!notification?._id) return null

									const { Icon, color } = getNotificationIcon(notification.type)

									return (
										<div
											key={notification._id}
											onClick={() => handleNotificationClick(notification)}
											className={`group relative p-4 border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors cursor-pointer ${
												!notification.isRead ? 'bg-slate-700/20' : ''
											}`}
										>
											<div className='flex items-start gap-3'>
												{/* Icon */}
												<div className={`shrink-0 ${color}`}>
													<Icon className='w-5 h-5' />
												</div>

												{/* Content */}
												<div className='flex-1 min-w-0'>
													<p className='text-sm text-slate-200 leading-relaxed'>
														{notification.title || 'New notification'}
													</p>
													{notification.message && (
														<p className='text-xs text-slate-400 mt-1 line-clamp-2'>
															{notification.message}
														</p>
													)}
													<div className='flex items-center gap-2 mt-1'>
														<p className='text-xs text-blue-400'>
															{timeAgo(notification.createdAt)}
														</p>
														{notification.triggeredBy?.name && (
															<>
																<span className='text-slate-600'>•</span>
																<p className='text-xs text-slate-400 truncate'>
																	by {notification.triggeredBy.name}
																</p>
															</>
														)}
													</div>
												</div>

												{/* Remove button */}
												<button
													onClick={(e) =>
														handleRemoveNotification(notification._id, e)
													}
													className='shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-slate-200'
													aria-label='Delete notification'
												>
													<X className='w-4 h-4' />
												</button>
											</div>

											{/* Unread indicator */}
											{!notification.isRead && (
												<div className='absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full' />
											)}
										</div>
									)
								})
							)}
						</div>

						{/* Footer */}
						<div className='p-3 bg-slate-900/50 border-t border-slate-700'>
							<button
								onClick={() => {
									router.push('/notifications')
									setIsOpen(false)
								}}
								className='w-full text-center text-sm text-slate-400 hover:text-slate-200 transition-colors font-medium'
							>
								View All Notifications
							</button>
						</div>
					</div>
				</>
			)}

			<div>
				<UserProfile user={user} />
			</div>
		</div>
	)
}

export default TopMenu
