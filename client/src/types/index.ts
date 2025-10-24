export interface User {
  id: string;
  username: string;
}

export interface Message {
  id: string;
  userId: string;
  username: string;
  content: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
