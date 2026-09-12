import React, { useState, useEffect } from 'react';
import useVideo from "../hook/useVideo";
import { 
  Mic, 
  MicOff, 
  Video as VideoIcon, 
  VideoOff, 
  PhoneOff, 
  Copy, 
  Check, 
  Clock, 
  ShieldCheck,
  Info,
  FileText
} from 'lucide-react';
import { toast } from 'sonner';
import { PrescriptionNotebook } from '../../doctor-dashboard/components/medical-record/PrescriptionNotebook';

interface RoomProps {
  roomName: string;
  userName: string;
  onLeaveRoom: () => void;
}

const Room: React.FC<RoomProps> = ({ roomName, userName, onLeaveRoom }) => {
  const isDoctor = window.location.pathname.startsWith('/doctor');
  
  // Hook logic
  const { 
    localVideoRef, 
    peers, 
    localStream,
    isMuted, 
    isVideoOff, 
    toggleMute, 
    toggleVideo, 
    handleLeaveRoom 
  } = useVideo(roomName, userName, onLeaveRoom);

  // Call duration states
  const [seconds, setSeconds] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);

  // Format initials for avatar placeholder
  const getInitials = (name: string) => {
    if (!name) return "?";
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  };

  // Stopwatch effect
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDuration = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle room link copying
  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomName);
    setCopied(true);
    toast.success("Room ID copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  // Convert map peers to list
  const activePeers = Array.from(peers.values()).filter(peer => peer.stream);
  const hasRemoteParticipants = activePeers.length > 0;

  return (
    <div className={`${
      isDoctor 
        ? 'bg-[#0A0E1A] text-white' 
        : 'lovable-theme bg-[#1F130B] text-amber-50'
    } h-screen relative flex flex-col justify-between overflow-hidden font-sans`}>
      
      {/* Dynamic Background Glowing Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
        {isDoctor ? (
          <>
            <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-accent/20 blur-3xl animate-pulse" style={{ animationDuration: '12s' }} />
          </>
        ) : (
          <>
            <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-secondary/20 blur-3xl animate-pulse" style={{ animationDuration: '12s' }} />
          </>
        )}
      </div>

      {/* TOP HEADER BAR */}
      <header className="relative z-20 w-full p-4 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold tracking-wide text-white">SECURE CONSULTATION</span>
          </div>
          <button 
            onClick={() => setShowInfo(!showInfo)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all text-white border border-white/10"
            title="Meeting Details"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

        {/* Stopwatch & Call Status */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white font-mono text-sm shadow-lg">
          <Clock className="w-4 h-4 text-primary animate-pulse" />
          <span>{formatDuration(seconds)}</span>
        </div>

        {/* Room identifier info */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs text-white/95 font-medium flex items-center gap-2">
            <span className="opacity-70">Room:</span>
            <span className="font-bold font-mono">{roomName}</span>
            <button 
              onClick={copyRoomCode}
              className="p-1 hover:bg-white/10 rounded transition-all text-primary"
              title="Copy Room ID"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* INFO OVERLAY MODAL */}
      {showInfo && (
        <div className="absolute top-16 left-4 z-40 w-72 p-5 rounded-2xl bg-black/85 backdrop-blur-lg border border-white/10 shadow-2xl text-white animate-in fade-in slide-in-from-top-2 duration-200">
          <h3 className="font-bold text-sm mb-2 text-primary">Call Information</h3>
          <div className="space-y-2.5 text-xs text-white/80">
            <div className="flex justify-between border-b border-white/5 pb-1.5">
              <span className="opacity-70">Room Name:</span>
              <span className="font-mono font-semibold">{roomName}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1.5">
              <span className="opacity-70">Role:</span>
              <span className="font-semibold">{isDoctor ? 'Doctor' : 'Patient'}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1.5">
              <span className="opacity-70">User Display:</span>
              <span className="font-semibold">{userName}</span>
            </div>
            <div className="flex items-center gap-1.5 pt-1 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              AES-256 Secured Call
            </div>
          </div>
        </div>
      )}

      {/* MAIN VIDEO AREA */}
      <main className="relative z-10 flex-grow w-full flex flex-col lg:flex-row items-center justify-center gap-6 p-4 md:p-6 overflow-hidden min-h-0">
        
        {/* Left Side: Video Container */}
        <div className={`w-full ${isDoctor && isNoteOpen ? 'lg:w-[65%]' : 'max-w-6xl'} flex flex-col items-center justify-center h-full transition-all duration-300`}>
          {/* ONE-ON-ONE CONSULTATION LAYOUT (1 Remote Participant) */}
          {hasRemoteParticipants ? (
            <div className="relative w-full h-full md:rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-slate-950 flex items-center justify-center">
            
            {/* 1. Remote Video Stream (Occupies whole card) */}
            {activePeers.map(peer => (
              <div key={peer.id} className="w-full h-full relative bg-slate-900 flex items-center justify-center">
                <video
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                  ref={el => {
                    if (el && peer.stream && el.srcObject !== peer.stream) {
                      el.srcObject = peer.stream;
                    }
                  }}
                />
                
                {/* Remote Peer name and details tag */}
                <div className="absolute bottom-4 left-4 z-10 px-3.5 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-sm font-bold text-white">
                    {peer.name || (isDoctor ? 'Patient' : 'Doctor')}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider opacity-65 bg-white/20 text-white px-1.5 py-0.5 rounded">
                    {isDoctor ? 'Patient' : 'Consultant'}
                  </span>
                </div>
              </div>
            ))}

            {/* 2. Floating Picture-in-Picture Local Stream */}
            <div className="absolute bottom-4 right-4 z-20 w-32 h-44 sm:w-48 sm:h-64 md:w-56 md:h-72 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-slate-950 transition-all hover:scale-102 hover:border-primary/80 group">
              {isVideoOff ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-white space-y-2">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/20 text-primary border border-primary/30 flex items-center justify-center text-lg sm:text-xl font-extrabold uppercase">
                    {getInitials(userName)}
                  </div>
                  <span className="text-[10px] font-medium text-slate-400">Camera Off</span>
                </div>
              ) : (
                <video
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover scale-x-[-1] bg-slate-900"
                  ref={el => {
                    if (el && localStream && el.srcObject !== localStream) {
                      el.srcObject = localStream;
                    }
                  }}
                />
              )}
              {/* Local Label Tag */}
              <div className="absolute bottom-2 left-2 z-10 px-2 py-1 rounded bg-black/70 backdrop-blur-sm text-[10px] font-bold text-white flex items-center gap-1.5">
                <span className="text-white/90">You</span>
                {isMuted && <MicOff className="w-2.5 h-2.5 text-red-400" />}
              </div>
            </div>

          </div>
        ) : (
          /* WAITING FOR OTHERS TO JOIN LAYOUT */
          <div className="w-full max-w-xl p-6 md:p-8 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl text-center space-y-6 animate-in fade-in duration-300">
            
            {/* Rotating / Pulsing Status Visualizer */}
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping opacity-70" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-3 rounded-full border border-primary/30 animate-pulse" style={{ animationDuration: '2s' }} />
              
              {/* Local Camera feed wrapped in a sleek circle */}
              <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-primary/60 shadow-xl bg-slate-950 relative">
                {isVideoOff ? (
                  <div className="w-full h-full flex items-center justify-center bg-slate-900 text-primary font-bold text-2xl uppercase">
                    {getInitials(userName)}
                  </div>
                ) : (
                  <video
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover scale-x-[-1]"
                    ref={el => {
                      if (el && localStream && el.srcObject !== localStream) {
                        el.srcObject = localStream;
                      }
                    }}
                  />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-extrabold text-white">
                Waiting for participant...
              </h2>
              <p className="text-sm text-white/60 max-w-sm mx-auto">
                Secure room created successfully. Share this Room Code with the patient or doctor to start consultation.
              </p>
            </div>

            {/* Room code copy box */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4 max-w-md mx-auto">
              <div className="text-left">
                <p className="text-[10px] uppercase font-bold tracking-wider text-white/40">Room Code</p>
                <p className="text-lg font-mono font-bold text-white tracking-wider">{roomName}</p>
              </div>
              <button
                onClick={copyRoomCode}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/95 active:scale-[0.98] transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy Code
                  </>
                )}
              </button>
            </div>

            <div className="text-xs text-white/40 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500/80" />
              Secured consult room • HIPAA Encrypted
            </div>
          </div>
        )}
        </div>

        {/* Right Side: Prescription Taker (Doctor Only) */}
        {isDoctor && isNoteOpen && (
          <div className="w-full lg:w-[35%] h-full overflow-y-auto hidden lg:block rounded-[2.5rem] bg-white/95 backdrop-blur-xl border border-white/20 p-2 shadow-2xl custom-scrollbar animate-in slide-in-from-right-8 duration-300">
            <PrescriptionNotebook doctor={{ name: userName || "Doctor" }} compact={true}  />
          </div>
        )}

      </main>

      {/* FLOATING CONTROLS BAR */}
      <footer className="relative z-20 w-full p-6 flex justify-center bg-gradient-to-t from-black/80 to-transparent">
        <div className="px-6 py-4 rounded-3xl bg-black/60 backdrop-blur-xl border border-white/10 flex items-center gap-4 sm:gap-6 shadow-2xl max-w-md w-full justify-center">
          
          {/* TOGGLE NOTES BUTTON (DOCTOR ONLY) */}
          {isDoctor && (
            <button
              onClick={() => setIsNoteOpen(!isNoteOpen)}
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-200 active:scale-95 ${
                isNoteOpen 
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' 
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              title={isNoteOpen ? "Close Notes" : "Open Notes"}
            >
              <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          {/* MUTE MIC BUTTON */}
          <button
            onClick={toggleMute}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-200 active:scale-95 ${
              isMuted 
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' 
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
            title={isMuted ? "Unmute Microphone" : "Mute Microphone"}
          >
            {isMuted ? <MicOff className="w-5 h-5 sm:w-6 sm:h-6" /> : <Mic className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>

          {/* TOGGLE VIDEO BUTTON */}
          <button
            onClick={toggleVideo}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-all duration-200 active:scale-95 ${
              isVideoOff 
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' 
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
            title={isVideoOff ? "Turn Video On" : "Turn Video Off"}
          >
            {isVideoOff ? <VideoOff className="w-5 h-5 sm:w-6 sm:h-6" /> : <VideoIcon className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>

          {/* COPY ROOM CODE ON THE FLY */}
          <button
            onClick={copyRoomCode}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-200 active:scale-95"
            title="Copy Room ID"
          >
            {copied ? <Check className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" /> : <Copy className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>

          {/* END SECURE CALL BUTTON */}
          <button
            onClick={handleLeaveRoom}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-all duration-200 active:scale-95 hover:scale-105 shadow-lg shadow-red-600/30 cursor-pointer"
            title="End Consultation"
          >
            <PhoneOff className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

        </div>
      </footer>

    </div>
  );
};

export default Room;
