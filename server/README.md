# Real-time Chat - Backend

Node.js + Express + Socket.io + PostgreSQL + Prisma

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database URL and JWT secret
```

3. Set up database:
```bash
npm run prisma:migrate
npm run prisma:generate
```

4. Run development server:
```bash
npm run dev
```

## API Endpoints

**Auth**
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

**Messages**
- `GET /messages` - Get last 50 messages (requires auth)

## WebSocket Events

**Client → Server**
- `message:send` - Send a message

**Server → Client**
- `message:new` - New message broadcast

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:studio` - Open Prisma Studio
