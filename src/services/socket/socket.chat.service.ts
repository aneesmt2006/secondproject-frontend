import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;
export const socketForChat = (userId: string) => {
  if (!socket) {
    socket = io(import.meta.env.VITE_CHAT_SOCKET_URL, {
      path: '/communication/socket.io',
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
