import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (userId:string) => {
  if (!socket) {
    socket = io(import.meta.env.VITE_SOCKET_URL, {
      path: '/notification/socket.io',
      transports: ["websocket"],
      query:{
        userId
      }
    });
  }

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  socket?.disconnect();
  socket = null;
};
