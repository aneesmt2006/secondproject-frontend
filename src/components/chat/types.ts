export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "doctor";
  timestamp: Date;
  attachmentUrl?: string;
}

export interface MsgFetchResponse {
  message:string,
  messages:MessageFromThread[]
}


export interface MessageFromThread {
  _id?: string;
  threadId: string;
  senderId: string;
  senderType: string;
  messageText: string;
  attachmentUrl?: string;
  readStatus: boolean;
  sendAt?: string;
  updatedAt?: string;
}

export interface ChatContact {
  id: string;
  name: string;
  specialty?: string;
  avatarUrl: string;
  isOnline?: boolean;
  lastSeen?: string;
}
