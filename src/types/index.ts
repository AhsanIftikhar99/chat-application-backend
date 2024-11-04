export type UserAttributes = {
  id: string;
  username: string;
  displayName?: string;
  email: string;
  password: string;
  profilePicture?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ChatAttributes = {
  id: string;
  isGroupChat: boolean;
  groupName?: string;
  groupAvatar?: string;
  members: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export type GroupAttributes = {
  id: string;
  chatId: string;
  adminIds: string[];
  createdAt?: Date;
  updatedAt?: Date;
};

export
  type MessageAttributes = {
    id: string;
    chatId: string;
    senderId: string;
    messageType: 'text' | 'voice' | 'media';
    content?: string;
    mediaUrl?: string;
    timestamp?: Date;
    encrypted: boolean;
    seenBy?: string[];
    createdAt?: Date;
    updatedAt?: Date;
  }