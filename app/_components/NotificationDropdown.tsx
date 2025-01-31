'use client'

import { Bell } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { ContactDialog } from "./ContactDialog"

interface Notification {
  id: string
  title: string
  message: string
  read: boolean
  type: string
  createdAt: string
  freelancerId?: string
}

interface Freelancer {
  name: string
  email: string
  whatsapp: string
  description: string | null
}

export function NotificationDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [selectedFreelancer, setSelectedFreelancer] = useState<Freelancer | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications')
      if (response.ok) {
        const data = await response.json()
        setNotifications(data)
      }
    } catch (error) {
      console.error('Erro ao buscar notificações:', error)
    }
  }

  const fetchFreelancerInfo = async (freelancerId: string) => {
    try {
      const response = await fetch(`/api/users/${freelancerId}`)
      if (response.ok) {
        const data = await response.json()
        setSelectedFreelancer(data)
        setIsDialogOpen(true)
      }
    } catch (error) {
      console.error('Erro ao buscar informações do freelancer:', error)
    }
  }

  const handleNotificationClick = async (notification: Notification) => {
    if (notification.type === 'proposal_accepted' && notification.freelancerId) {
      await fetchFreelancerInfo(notification.freelancerId)
    }
    markAsRead()
  }

  const markAsRead = async () => {
    try {
      await fetch('/api/notifications', {
        method: 'PATCH'
      })
      fetchNotifications()
    } catch (error) {
      console.error('Erro ao marcar notificações como lidas:', error)
    }
  }

  useEffect(() => {
    fetchNotifications()
    const interval = setInterval(fetchNotifications, 30000)
    return () => clearInterval(interval)
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          {notifications.length === 0 ? (
            <DropdownMenuItem className="text-center text-gray-500">
              Nenhuma notificação
            </DropdownMenuItem>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`p-4 border-b last:border-b-0 ${!notification.read ? 'bg-gray-50' : ''}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div>
                  <h4 className="font-medium">{notification.title}</h4>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                  <span className="text-xs text-gray-400 mt-1">
                    {new Date(notification.createdAt).toLocaleDateString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {selectedFreelancer && (
        <ContactDialog
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false)
            setSelectedFreelancer(null)
          }}
          freelancer={selectedFreelancer}
        />
      )}
    </>
  )
} 