import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;
export const socketForChat = (userId: string) => {
  if (!socket) {
    socket = io("http://localhost:3035/chat", {
      transports: ["websocket"],
      query: {
        userId,
      },
    });
  }

  return socket;
};

export const getChatSocket = () => socket;

export const disconnectSocket = () => {
  socket?.disconnect();
  socket = null;
};
