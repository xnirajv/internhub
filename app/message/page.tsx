import ConversationList from '@/components/message/ConversationList'
import MessageList from '@/components/message/MessageList'
import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

type Profile = {
  id: string
  full_name: string
  avatar_url: string
  user_type: string
}

type MessageWithUsers = {
  sender: Profile | null
  receiver: Profile | null
}

export default async function MessagesPage() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: conversations } = await supabase
    .from('messages')
    .select(`
      sender:sender_id (id, full_name, avatar_url, user_type),
      receiver:receiver_id (id, full_name, avatar_url, user_type)
    `)
    .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
    .order('created_at', { ascending: false })
    .returns<MessageWithUsers[]>()

  const uniqueUsers = new Map<string, Profile>()

  conversations?.forEach((msg) => {
    if (msg.sender && msg.sender.id !== user.id) {
      uniqueUsers.set(msg.sender.id, msg.sender)
    }

    if (msg.receiver && msg.receiver.id !== user.id) {
      uniqueUsers.set(msg.receiver.id, msg.receiver)
    }
  })

  const users = Array.from(uniqueUsers.values())

  return (
    <div className="container-custom py-8">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 border rounded-lg p-4">
          <h2 className="font-semibold mb-4">Conversations</h2>
          <ConversationList users={users} currentUserId={user.id} />
        </div>

        <div className="md:col-span-2">
          <MessageList currentUserId={user.id} />
        </div>
      </div>
    </div>
  )
}