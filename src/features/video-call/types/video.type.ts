import { PeerConnection } from "@/services/webrtc/webrtc.service";

export interface Peer {
  id: string;
  name?: string;
  connection: PeerConnection;
  stream?: MediaStream;
}
