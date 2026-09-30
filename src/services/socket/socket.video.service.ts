/* eslint-disable @typescript-eslint/no-explicit-any */
import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_VIDEO_SOCKET_URL);

export const joinRoom = (roomName: string, userName: string) => {
  console.log("EMIT-0-[join-room]")
  socket.emit("join-room", { roomName, userName });
};

export const sendOffer = (target: string, offer: any, caller: string) => {
    console.log("EMIT-1-[offer]")
  socket.emit("offer", { target, offer, caller });
};

export const sendAnswer = (target: string, answer: any) => {
    console.log("EMIT-2-[answer]")
  socket.emit("answer", { target, answer });
};

export const sendIceCandidate = (target: string, candidate: any) => {
    console.log("EMIT-3-[-ice-candidate]")

  socket.emit("ice-candidate", { target, candidate });
};

// let socket : Socket|null = null
// export const socketForVideo =(appoinmentId:string)=>{
//     if(!socket){
//         socket = io('http://localhost:3035',{
//             autoConnect:false
//         })
//     }
// }
