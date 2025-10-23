# Real-time Chat Application - MVP

## Overview
A minimal real-time messaging app showcasing WebSocket communication, authentication, and full-stack fundamentals.

## Core Features (MVP)
- User registration/login
- Global chat room (single room)
- Send/receive messages in real-time
- Message persistence and history
- Clean, responsive UI

## Tech Stack (Opinionated)

### Frontend
- React + TypeScript + Vite
- Zustand (state)
- Socket.io-client
- Tailwind CSS

### Backend
- Node.js + Express
- Socket.io
- PostgreSQL + Prisma
- JWT + bcrypt

## Database Schema (Minimal)

### users
```sql
id          UUID PRIMARY KEY
username    VARCHAR(50) UNIQUE NOT NULL
password    VARCHAR(255) NOT NULL
created_at  TIMESTAMP DEFAULT NOW()
```

### messages
```sql
id          UUID PRIMARY KEY
user_id     UUID REFERENCES users(id)
content     TEXT NOT NULL
created_at  TIMESTAMP DEFAULT NOW()
```

## API Endpoints

**Auth**
- `POST /auth/register` - Register
- `POST /auth/login` - Login (returns JWT)

**Messages**
- `GET /messages` - Get last 50 messages

## WebSocket Events

**Client → Server**
- `message:send` - `{ content: string }`

**Server → Client**
- `message:new` - `{ id, userId, username, content, createdAt }`

## Frontend Structure

```
src/
├── components/
│   ├── AuthForm.tsx        # Login/Register toggle
│   ├── ChatRoom.tsx        # Main chat UI
│   ├── MessageList.tsx     # Message display
│   └── MessageInput.tsx    # Send message
├── hooks/
│   └── useSocket.ts        # Socket.io hook
├── store/
│   └── authStore.ts        # Auth state (Zustand)
├── lib/
│   ├── api.ts              # API calls
│   └── socket.ts           # Socket setup
└── App.tsx
```

## Backend Structure

```
src/
├── routes/
│   ├── auth.ts             # Register/Login
│   └── messages.ts         # Get messages
├── middleware/
│   └── auth.ts             # JWT verification
├── socket/
│   └── messageHandler.ts   # Socket message handling
├── prisma/
│   └── schema.prisma       # DB schema
└── server.ts               # Express + Socket.io setup
```

## Build Steps

1. **Backend Setup**
   - Init Node project, install Express, Socket.io, Prisma, bcrypt, jsonwebtoken
   - Set up Prisma schema (users, messages)
   - Create auth endpoints (register, login)
   - Add JWT middleware

2. **Socket.io Setup**
   - Connect Socket.io to Express server
   - Handle `message:send` event
   - Broadcast `message:new` to all clients
   - Save messages to DB

3. **Frontend Setup**
   - Init Vite React TypeScript project
   - Install Socket.io-client, Zustand, Tailwind
   - Create auth store and login/register UI
   - Build chat UI (message list + input)

4. **Connect & Test**
   - Connect frontend Socket.io to backend
   - Implement message sending/receiving
   - Load message history on mount
   - Test real-time messaging

## Skills Demonstrated
- WebSocket real-time communication
- JWT authentication
- RESTful API design
- React + TypeScript
- Database design (PostgreSQL + Prisma)
- Event-driven architecture
- Modern React patterns (hooks, state management)
