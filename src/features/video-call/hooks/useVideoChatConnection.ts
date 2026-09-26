import { useEffect, useRef, useState } from "react";
import { Peer } from "../types/video.type";
import { getUserMedia, PeerConnection } from "@/services/webrtc/webrtc.service";
import {
  joinRoom,
  sendAnswer,
  sendIceCandidate,
  sendOffer,
  socket,
} from "@/services/socket/socket.video.service";

const useVideo = (
  roomName: string,
  userName: string,
  onLeaveRoom: () => void,
) => {
  const [peers, setPeers] = useState<Map<string, Peer>>(new Map());
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  // Initialize media and join Room

  useEffect(() => {
    const initializeRoom = async () => {
      try {
        // Get local media
        const stream = await getUserMedia();
        setLocalStream(stream);

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        //Join the room
        joinRoom(roomName, userName);
      } catch (error) {
        console.error("Error initializing room:", error);
      }
    };
    initializeRoom();

    // Clean up on component unmount
    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }

      // close all peer connection
      peers.forEach((peer) => {
        peer.connection.close();
      });

      socket.off();
    };
  }, []);

  // Socket event listeners
  useEffect(() => {
    // When a user Joins the room
    socket.on("user-joined", async (data: { userId: string; userName: string }) => {
      const {userId,userName:peerName} = data

      if (localStream) {
        // Create new peer connection
        const peerConnection = new PeerConnection(
          (candidate) => {
            sendIceCandidate(userId, candidate);
          },
          (stream) => {
            setPeers((prev) => {
              const updated = new Map(prev);
              const peer = updated.get(userId);
              if (peer) {
                peer.stream = stream;
                updated.set(userId, peer);
              }
              return updated;
            });
          },
        );

        await peerConnection.setLocalStream(localStream);

        // Create offer
        const offer = await peerConnection.createOffer();
        sendOffer(userId, offer, socket.id!);

        //Add to peers list
        setPeers((prev) => {
          const updated = new Map(prev);
          updated.set(userId, {
            id: userId,
            name: peerName,
            connection: peerConnection,
          });

          return updated;
        });
      }
    });

    // When recieving the list of users already in the room
    socket.on("room-users", (userIds: string[]) => {
    });

    //When recieving offer from antoher peer
    socket.on("offer", async ({ offer, caller }) => {

      if (localStream) {
        // Create new peer connection
        const peerConnection = new PeerConnection(
          (candidate) => {
            sendIceCandidate(caller, candidate);
          },
          (stream) => {
            setPeers((prev) => {
              const updated = new Map(prev);
              const peer = updated.get(caller);
              if (peer) {
                peer.stream = stream;
                updated.set(caller, peer);
              }
              return updated;
            });
          },
        );

        await peerConnection.setLocalStream(localStream);

        // Create Answer 
       const answer =  await peerConnection.createAnswer(offer)
       sendAnswer(caller,answer)

       // Added to peers list 
       setPeers((prev)=>{
        const updated   = new Map(prev)
        updated.set(caller,{
          id:caller,
          connection:peerConnection
        })
        return updated
       })
      }
    });

    // When recieving an answer to our offer
    socket.on("answer", async ({ answer, answerer }) => {

      const peer = peers.get(answerer);
      if (peer) {
        await peer.connection.setRemoteAnswer(answer);
      }
    });

    // When receieving an ICE candidate 
    socket.on('ice-candidate',({candidate,sender})=>{

      const peer = peers.get(sender)
      if(peer){
        peer.connection.addIceCandidate(candidate)
      }
    })

    // When a user disconnects
    socket.on('user-disconnected',(userId)=>{
      const peer = peers.get(userId)
      if(peer){
        peer.connection.close()
        setPeers((prev)=>{
          const updated = new Map(prev)
          updated.delete(userId)
          return updated;
        })
      }
    })

    return ()=>{
      socket.off('user-joined')
      socket.off('room-users')
      socket.off('offer')
      socket.off('answer')
      socket.off('ice-candidate')
      socket.off('user-disconnected')
    }
  },[peers,localStream,roomName]);


  const handleLeaveRoom=()=>{
    //Stop all tracks
    if(localStream){
      localStream.getTracks().forEach((track)=>track.stop())
    }

    // Close all peer connections
    peers.forEach((peer)=>{
      peer.connection.close()
    })

    //Disconnect socket 
    socket.disconnect()

    //Call the parent compoenent callback
    onLeaveRoom()
  }

  const toggleMute = () => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
    }
  };

   const toggleVideo = () => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
    }
  };


  return {roomName,userName,localVideoRef,peers,toggleMute,toggleVideo,handleLeaveRoom}

};

export default useVideo;
