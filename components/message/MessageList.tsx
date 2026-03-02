'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'

interface Message {
  id: string
  content: string
  sender_id: string
  receiver_id: string
  created_at: string
  read: boolean
}

export default function MessageList({
  currentUserId,
}: {
  currentUserId: string
}) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()
  const otherUserId = searchParams.get('userId')

  const supabase = createClient()

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Load messages
  const loadMessages = useCallback(async () => {
    if (!otherUserId) return

    const response = await fetch(`/api/messages?userId=${otherUserId}`)
    const data = await response.json()

    // Important: oldest first for proper chat UI
    const sorted = (data.messages || []).sort(
      (a: Message, b: Message) =>
        new Date(a.created_at).getTime() -
        new Date(b.created_at).getTime()
    )

    setMessages(sorted)
  }, [otherUserId])

  useEffect(() => {
    if (!otherUserId) return

    loadMessages()

    const channel = supabase
      .channel(`chat-${currentUserId}-${otherUserId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          const newMessage = payload.new as Message

          const isRelevant =
            (newMessage.sender_id === currentUserId &&
              newMessage.receiver_id === otherUserId) ||
            (newMessage.sender_id === otherUserId &&
              newMessage.receiver_id === currentUserId)

          if (isRelevant) {
            setMessages((prev) => [...prev, newMessage])
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [otherUserId, currentUserId, loadMessages])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim() || !otherUserId) return

    setLoading(true)

    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        receiverId: otherUserId,
        content: newMessage,
      }),
    })

    if (response.ok) {
      setNewMessage('')
    }

    setLoading(false)
  }

  if (!otherUserId) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Select a conversation to start messaging
      </div>
    )
  }

  return (
    <div className="border rounded-lg flex flex-col h-150">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender_id === currentUserId
                ? 'justify-end'
                : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.sender_id === currentUserId
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100'
              }`}
            >
              <p>{message.content}</p>
              <p className="text-xs mt-1 opacity-70">
                {new Date(message.created_at).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button type="submit" isLoading={loading}>
            Send
          </Button>
        </div>
      </form>
    </div>
  )
}