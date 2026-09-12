// import VideoFeed from "../components/VideoFeed"
// import useLocalCameraStream from "../hook/useLocalCameraStream"
// import useVideoChatConnection from "../hook/useVIdeoChatConnection"

// const VideoCallPage = () => {
//     const {localStream} = useLocalCameraStream()
//     useVideoChatConnection()

// if(!localStream){
//     return <p>Loading ....</p>
// }
//   return (
//     <VideoFeed mediaStream={localStream} isMuted={true}/>
//   )
// }

// export default VideoCallPage

import { useState } from 'react'
import Room from '../components/Room';
import VideoHome from '../components/Home';
import "../../../theme/doctor.css";

const VideoCallPage = () => {
  const [isInRoom, setIsInRoom] = useState(false)
  const [roomName, setRoomName] = useState('')
  const [userName, setUserName] = useState('');

  const isDoctor = window.location.pathname.startsWith('/doctor');

  const handleJoinRoom = (room: string, user: string) => {
    setRoomName(room)
    setUserName(user)
    setIsInRoom(true)
  }

  const handleLeaveRoom = () => {
    window.location.reload()
    setIsInRoom(false);
  };

  return (
    <div className={isDoctor ? "doctor-theme bg-slate-950" : "lovable-theme"}>
      <div className="App min-h-screen">
        {isInRoom ? (
          <Room
            roomName={roomName}
            userName={userName}
            onLeaveRoom={handleLeaveRoom}
          />
        ) : (
          <VideoHome onJoinRoom={handleJoinRoom} />
        )}
      </div>
    </div>
  )
}

export default VideoCallPage