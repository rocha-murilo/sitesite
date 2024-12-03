import { useState, useCallback } from 'react';
import { Message, User } from '../types/chat';
import { nanoid } from 'nanoid';

export function useChat() {
  // Simulated users
  const activeUser: User = {
    id: '1',
    name: 'Você',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    online: true,
  };

  const otherUser: User = {
    id: '2',
    name: 'João Silva',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    online: true,
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: '2',
      content: 'Olá! Como posso ajudar?',
      timestamp: new Date(Date.now() - 60000),
    },
  ]);

  const sendMessage = useCallback((content: string) => {
    const newMessage: Message = {
      id: nanoid(),
      senderId: activeUser.id,
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);

    // Simulate response
    setTimeout(() => {
      const response: Message = {
        id: nanoid(),
        senderId: otherUser.id,
        content: 'Obrigado pela mensagem! Vou analisar e retorno em breve.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, response]);
    }, 1000);
  }, []);

  return {
    messages,
    activeUser,
    otherUser,
    sendMessage,
  };
}