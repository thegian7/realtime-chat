import { useEffect, useRef } from 'react';
import type { Message } from '../types';
import { useAuthStore } from '../stores/authStore';

interface MessageListProps {
  messages: Message[];
}

export const MessageList = ({ messages }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          No messages yet. Start the conversation!
        </div>
      ) : (
        messages.map((message) => {
          const isOwnMessage = message.userId === user?.id;
          return (
            <div
              key={message.id}
              className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  isOwnMessage
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                <div className="flex items-baseline gap-2 mb-1">
                  <span className={`text-xs font-semibold ${
                    isOwnMessage ? 'text-blue-100' : 'text-gray-600'
                  }`}>
                    {isOwnMessage ? 'You' : message.username}
                  </span>
                  <span className={`text-xs ${
                    isOwnMessage ? 'text-blue-200' : 'text-gray-500'
                  }`}>
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <p className="break-words">{message.content}</p>
              </div>
            </div>
          );
        })
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
