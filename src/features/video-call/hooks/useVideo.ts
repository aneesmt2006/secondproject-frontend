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
  const peersRef = useRef<Map<string, Peer>>(new Map());
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  // Sync refs with state so event handlers always access the latest values
  useEffect(() => {
    peersRef.current = peers;
  }, [peers]);

  useEffect(() => {
    localStreamRef.current = localStream;
  }, [localStream]);

  useEffect(() => {
    let active = true;
    let streamInstance: MediaStream | null = null;

    const initializeRoom = async () => {
      try {
        // Get local media
        const stream = await getUserMedia();
        if (!active) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        streamInstance = stream;
        setLocalStream(stream);

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // Register socket listeners

        // When a user joins (this client is already in the room, another client joins)
        socket.on("user-joined", async (data: { userId: string; userName: string }) => {
          const { userId, userName: peerName } = data;
          // console.log(`User ${peerName} (${userId}) joined the room`);

          const currentStream = localStreamRef.current;
          if (!currentStream) {
            console.warn("No local stream available when user joined");
            return;
          }

          // Check if peer connection already exists to avoid duplicate connections
          if (peersRef.current.has(userId)) {
            return;
          }

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

          // Add to peers list immediately BEFORE setting stream or creating offer
          // to ensure onTrack handler can find the peer connection in peers map
          setPeers((prev) => {
            const updated = new Map(prev);
            updated.set(userId, {
              id: userId,
              name: peerName,
              connection: peerConnection,
            });
            return updated;
          });

          await peerConnection.setLocalStream(currentStream);

          // Create offer
          const offer = await peerConnection.createOffer();
          sendOffer(userId, offer, socket.id!);
        });

        // When receiving the list of users already in the room
        socket.on("room-users", (userIds: string[]) => {
          // console.log("Users in room ", userIds);
        });

        // When receiving offer from another peer
        socket.on("offer", async ({ offer, caller }) => {
          // console.log("Received offer from:", caller);

          const currentStream = localStreamRef.current;
          if (!currentStream) {
            console.warn("No local stream available to answer offer");
            return;
          }

          // Close existing peer connection if we already have one for this caller
          const existingPeer = peersRef.current.get(caller);
          if (existingPeer) {
            existingPeer.connection.close();
          }

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

          // Add to peers list immediately BEFORE setting remote stream or creating answer
          // to ensure onTrack handler can find the peer connection in peers map
          setPeers((prev) => {
            const updated = new Map(prev);
            updated.set(caller, {
              id: caller,
              connection: peerConnection,
            });
            return updated;
          });

          await peerConnection.setLocalStream(currentStream);

          // Create Answer
          const answer = await peerConnection.createAnswer(offer);
          sendAnswer(caller, answer);
        });

        // When receiving an answer to our offer
        socket.on("answer", async ({ answer, answerer }) => {
          // console.log("Received answer from :", answerer);


          const peer = peersRef.current.get(answerer);
          if (peer) {
            await peer.connection.setRemoteAnswer(answer);
          } else {
            console.warn(`No peer connection found for answer from ${answerer}`);
          }
        });

        // When receiving an ICE candidate
        socket.on("ice-candidate", ({ candidate, sender }) => {
          // console.log("Received ICE candidate from", sender);


          const peer = peersRef.current.get(sender);
          if (peer) {
            peer.connection.addIceCandidate(candidate);
          } else {
            console.warn(`No peer connection found for ICE candidate from ${sender}`);
          }
        });

        // When a user disconnects
        socket.on("user-disconnected", (userId) => {
          const peer = peersRef.current.get(userId);
          if (peer) {
            peer.connection.close();
            setPeers((prev) => {
              const updated = new Map(prev);
              updated.delete(userId);
              return updated;
            });
          }
        });

        // Join the room after setting up listeners
        joinRoom(roomName, userName);

      } catch (error) {
        console.error("Error initializing room:", error);
      }
    };

    initializeRoom();

    return () => {
      active = false;

      if (streamInstance) {
        streamInstance.getTracks().forEach((track) => track.stop());
      }

      // Close all peer connections
      peersRef.current.forEach((peer) => {
        peer.connection.close();
      });

      socket.off("user-joined");
      socket.off("room-users");
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
      socket.off("user-disconnected");
    };
  }, [roomName, userName]);

  const handleLeaveRoom = () => {
    // Stop local stream tracks
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }

    // Close all peer connections
    peers.forEach((peer) => {
      peer.connection.close();
    });

    // Disconnect socket
    socket.disconnect();

    // Call the parent component callback
    onLeaveRoom();
  };

  const toggleMute = () => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(prev => !prev);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(prev => !prev);
    }
  };

  return { 
    roomName, 
    userName, 
    localVideoRef, 
    peers, 
    localStream,
    isMuted, 
    isVideoOff, 
    toggleMute, 
    toggleVideo, 
    handleLeaveRoom 
  };
};

export default useVideo;
