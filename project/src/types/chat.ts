export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
}