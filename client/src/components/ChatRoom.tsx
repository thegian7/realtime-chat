import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '../stores/authStore';
import type { Message } from '../types';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';

const API_URL = 'http://localhost:3001';

export const ChatRoom = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const { token, user, logout } = useAuthStore();

  useEffect(() => {
    if (!token) return;

    // Fetch message history
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${API_URL}/messages`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        }
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();

    // Connect to Socket.io
    const newSocket = io(API_URL, {
      auth: { token },
    });

    newSocket.on('connect', () => {
      setConnected(true);
      console.log('Connected to server');
    });

    newSocket.on('disconnect', () => {
      setConnected(false);
      console.log('Disconnected from server');
    });

    newSocket.on('message:new', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [token]);

  const handleSendMessage = (content: string) => {
    if (socket && connected) {
      socket.emit('message:send', { content });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 shadow-md">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Real-time Chat</h1>
            <p className="text-sm text-blue-100">
              Logged in as <span className="font-semibold">{user?.username}</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-400' : 'bg-red-400'}`} />
              <span className="text-sm">{connected ? 'Connected' : 'Disconnected'}</span>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-md text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 max-w-4xl w-full mx-auto bg-white shadow-lg flex flex-col" style={{ height: 'calc(100vh - 80px)' }}>
        <MessageList messages={messages} />
        <MessageInput onSend={handleSendMessage} disabled={!connected} />
      </div>
    </div>
  );
};
