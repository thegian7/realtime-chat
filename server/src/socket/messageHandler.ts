import { Server, Socket } from 'socket.io';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

interface MessageData {
  content: string;
}

interface JWTPayload {
  userId: string;
}

export const setupMessageHandler = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('User connected:', socket.id);

    // Authenticate socket connection
    const token = socket.handshake.auth.token;

    if (!token) {
      socket.disconnect();
      return;
    }

    let userId: string;
    let username: string;

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
      userId = decoded.userId;
    } catch (error) {
      console.error('Socket auth error:', error);
      socket.disconnect();
      return;
    }

    // Get username
    prisma.user.findUnique({ where: { id: userId } }).then((user) => {
      if (!user) {
        socket.disconnect();
        return;
      }
      username = user.username;
    });

    socket.on('message:send', async (data: MessageData) => {
      try {
        const { content } = data;

        if (!content || content.trim().length === 0) {
          return;
        }

        // Save message to database
        const message = await prisma.message.create({
          data: {
            content: content.trim(),
            userId,
          },
          include: {
            user: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        });

        // Broadcast to all clients
        io.emit('message:new', {
          id: message.id,
          userId: message.userId,
          username: message.user.username,
          content: message.content,
          createdAt: message.createdAt,
        });
      } catch (error) {
        console.error('Message send error:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};
