const ICE_SERVERS = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
  ],
};

export class PeerConnection {
  private peerConnection: RTCPeerConnection;
  private localStream: MediaStream | null = null;
  private remoteStream: MediaStream;
  private onIceCandidateCallback: (candidate: RTCIceCandidate) => void;
  private onTrackCallback: (stream: MediaStream) => void;

  constructor(
    onIceCandidate: (candidate: RTCIceCandidate) => void,
    onTrack: (stream: MediaStream) => void,
  ) {
    this.peerConnection = new RTCPeerConnection(ICE_SERVERS);
    this.remoteStream = new MediaStream();
    this.onIceCandidateCallback = onIceCandidate;
    this.onTrackCallback = onTrack;

    // Setup event handlers
    this.peerConnection.onicecandidate = (event) => {
      console.log("<<< [1] >>>>")
      if (event.candidate) {
        this.onIceCandidateCallback(event.candidate);
      }
    };

    this.peerConnection.ontrack = (event) => {
        console.log("<<< [2] >>>> ")
      event.streams[0].getTracks().forEach((track) => {
    //     console.log(
    //   "Track:",
    //   track.kind,
    //   track.enabled,
    //   track.readyState
    // );
        this.remoteStream.addTrack(track);
      });

      this.onTrackCallback(this.remoteStream);
    };
  }

  async setLocalStream(stream: MediaStream) {
        console.log("<<< [3] >>>> ")

    this.localStream = stream;
    stream.getTracks().forEach((track) => {
      if (this.localStream) {
        this.peerConnection.addTrack(track, this.localStream);
      }
    });
  }

  async createOffer() {
    try {
        console.log("<<< [4] >>>>")

      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);
      return offer;
    } catch (error) {
      console.error("Error creating Offer", error);
      throw error;
    }
  }

  async createAnswer(offer: RTCSessionDescriptionInit) {
    try {
        console.log("<<< [5] >>>>")

      await this.peerConnection.setRemoteDescription(
        new RTCSessionDescription(offer),
      );
      const answer = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(answer);
      return answer;
    } catch (error) {
        console.error('Error creating answer',error)
        throw error;
    }
  }

  async setRemoteAnswer(answer:RTCSessionDescriptionInit){
    try {
        console.log("<<< [6] >>>>")

        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer))
    } catch (error) {
     console.error('Error setting remote descritption',error);
     throw error
    }
  }

  addIceCandidate(candidate:RTCIceCandidateInit){
    try {
        console.log("<<< [7] >>>> ")

        this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (error) {
        console.error('Error adding ICE candidate',error)
        throw error
    } 
  }

  close(){
    this.peerConnection.close();
  }
}

export const getUserMedia = async()=>{
    try {
      console.log("<<< [0] >>>>")
        const stream = await navigator.mediaDevices.getUserMedia({
            video:true,
            audio:true
        })
        return stream
    } catch (error) {
        console.error("Error accessing media devices",error)
        throw error
    }
}
