import React from 'react';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { UserInfo } from './UserInfo';
import { useChat } from '../../hooks/useChat';

export function ChatWindow() {
  const { messages, activeUser, otherUser, sendMessage } = useChat();

  return (
    <div className="bg-white rounded-xl shadow-sm h-[600px] flex flex-col">
      <UserInfo user={otherUser} />
      
      <MessageList messages={messages} currentUserId={activeUser.id} />
      
      <MessageInput onSend={sendMessage} />
    </div>
  );
}