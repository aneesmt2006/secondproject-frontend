import React, { useState, useEffect, useRef } from 'react';
import { useAppSelector } from "../../../store/hooks";
import { userSelector } from "../../patient-auth/slice/userSlice";
import { doctorSelector } from "../../doctor-auth/slice/doctorSlice";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  User, 
  Hash, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface HomeProps {
  onJoinRoom: (roomName: string, userName: string) => void;
}

const VideoHome: React.FC<HomeProps> = ({ onJoinRoom }) => {
  const isDoctor = window.location.pathname.startsWith('/doctor');
  const location = useLocation();
  const navigate = useNavigate();
  
  // Redux user states
  const userData = useAppSelector(userSelector);
  const doctorData = useAppSelector(doctorSelector);
  const appointmentId = location?.state?.roomCode

  // Determine default user name
  const defaultName = isDoctor 
    ? (doctorData?.fullName ? `Dr. ${doctorData.fullName}` : '') 
    : (userData?.full_name || '');

  const [roomName, setRoomName] = useState(location?.state?.roomCode.slice(0,5)||'');

  const [userName, setUserName] = useState('');
  
  // Camera check states
  const [previewStream, setPreviewStream] = useState<MediaStream | null>(null);
  const [previewMuted, setPreviewMuted] = useState(false);
  const [previewVideoOff, setPreviewVideoOff] = useState(false);
  const [permissionError, setPermissionError] = useState(false);
  
  const previewVideoRef = useRef<HTMLVideoElement>(null);

  // Auto-fill user name when available
  useEffect(() => {
    if (defaultName && !userName) {
      setUserName(defaultName);
    }
  }, [defaultName]);

  // Request preview camera on mount
  useEffect(() => {
    let active = true;
    let streamInstance: MediaStream | null = null;

    const startPreview = async () => {
      if (window.innerWidth < 1024) return;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        if (!active) {
          stream.getTracks().forEach(track => track.stop());
          return;
        }
        streamInstance = stream;
        setPreviewStream(stream);
        if (previewVideoRef.current) {
          previewVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing media devices for preview:", err);
        setPermissionError(true);
      }
    };

    startPreview();

    return () => {
      active = false;
      if (streamInstance) {
        streamInstance.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const togglePreviewMic = () => {
    if (previewStream) {
      const audioTracks = previewStream.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setPreviewMuted(prev => !prev);
    }
  };

  const togglePreviewVideo = () => {
    if (previewStream) {
      const videoTracks = previewStream.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setPreviewVideoOff(prev => !prev);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomName.trim() && userName.trim()) {
      // Stop preview stream before moving to the actual room
      if (previewStream) {
        previewStream.getTracks().forEach(track => track.stop());
      }
      onJoinRoom(roomName.trim(), userName.trim());
    }
  };

  // Generate a random room code for convenience
  const generateRoomCode = () => {
    const prefix = isDoctor ? 'dr-consult' : 'visit';
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomName(`${prefix}-${code}`);
  };

  return (
    <div className={`${isDoctor ? 'doctor-theme' : 'lovable-theme'} min-h-screen relative flex items-center justify-center p-4 md:p-8 overflow-y-auto`}>
      {/* Back button */}
      <button 
        type="button"
        onClick={() => {
          // Stop preview stream before navigating
          if (previewStream) {
            previewStream.getTracks().forEach(track => track.stop());
          }
          navigate(isDoctor ? '/doctor/dashboard' : '/dashboard');
        }}
        className="absolute top-4 left-4 md:top-6 md:left-6 z-20 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-white/85 hover:bg-white shadow-sm border border-border/60 hover:scale-[1.02] active:scale-[0.98] transition-all text-foreground cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 text-primary" />
        <span>Back to Dashboard</span>
      </button>
      {/* Background elements to match the general theme */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {isDoctor ? (
          // Doctor Side Sleek Blue Gradients
          <>
            <div className="absolute top-[10%] left-[5%] w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute bottom-[10%] right-[5%] w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
          </>
        ) : (
          // User Side Soft Peach Waves
          <>
            <div className="absolute top-[10%] left-[10%] w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-[10%] right-[10%] w-80 h-80 rounded-full bg-secondary/30 blur-3xl" />
          </>
        )}
      </div>

      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-16 lg:mt-0">
        
        {/* LEFT COLUMN: Camera Preview Device Check */}
        <div className="hidden lg:flex lg:col-span-7 flex-col justify-center space-y-4">
          <div className="text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary">
              <Sparkles className="w-3.5 h-3.5" />
              Telehealth Consultation
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Ready to connect?
            </h1>
            <p className="text-sm md:text-base text-muted-foreground max-w-md">
              Check your camera and audio settings before joining the secure medical consultation.
            </p>
          </div>

          {/* Video Preview Card */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-border/80 bg-slate-900 group">
            {previewVideoOff ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 text-white space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center">
                  <VideoOff className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-sm font-medium text-slate-300">Camera is turned off</p>
              </div>
            ) : permissionError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 text-white p-6 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-red-950/50 flex items-center justify-center border border-red-500/30">
                  <VideoOff className="w-8 h-8 text-red-400" />
                </div>
                <p className="text-sm font-semibold text-red-200">Camera/Mic Access Blocked</p>
                <p className="text-xs text-slate-400 max-w-sm">
                  Please enable camera and microphone permissions in your browser address bar to use this service.
                </p>
              </div>
            ) : !previewStream ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 text-white space-y-3">
                <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <p className="text-xs text-slate-400">Initializing camera check...</p>
              </div>
            ) : (
              <video 
                ref={previewVideoRef} 
                autoPlay 
                playsInline 
                muted
                className="w-full h-full object-cover scale-x-[-1]"
              />
            )}

            {/* Overlay Info Card */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-slate-950/75 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 z-10 transition-opacity duration-300 group-hover:opacity-100">
              <span className="text-xs font-semibold text-white/90 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                Device Check
              </span>
              
              {/* Media controls */}
              <div className="flex gap-2">
                <button
                  onClick={togglePreviewMic}
                  disabled={permissionError || !previewStream}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                    previewMuted 
                      ? 'bg-red-500/30 hover:bg-red-500/40 border border-red-500 text-red-200' 
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                  title={previewMuted ? "Unmute Mic" : "Mute Mic"}
                >
                  {previewMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
                <button
                  onClick={togglePreviewVideo}
                  disabled={permissionError || !previewStream}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                    previewVideoOff 
                      ? 'bg-red-500/30 hover:bg-red-500/40 border border-red-500 text-red-200' 
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                  title={previewVideoOff ? "Turn Camera On" : "Turn Camera Off"}
                >
                  {previewVideoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Join Lobby form */}
        <div className="lg:col-span-5">
          <div className={`${
            isDoctor 
              ? 'glass-card border-white/20 shadow-2xl p-6 md:p-8 rounded-[2rem]' 
              : 'bg-white shadow-soft border border-border/60 p-6 md:p-8 rounded-[1.5rem]'
          } space-y-6 w-full`}>
            
            <div className="space-y-1">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">
                Join Secure Room
              </h2>
              <p className="text-xs text-muted-foreground">
                Consultations are encrypted and private.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* UserName Input */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="userName" className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Your Display Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground/60">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="userName"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-2.5 bg-background border border-border/80 focus:border-primary/80 focus:ring-2 focus:ring-primary/20 rounded-xl text-sm font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground/50"
                    required
                  />
                </div>
              </div>

              {/* RoomName Input */}
              <div className="space-y-1.5 text-left">
                <div className="flex justify-between items-center">
                  <label htmlFor="roomName" className="text-xs font-bold text-foreground uppercase tracking-wider">
                    Room Code / ID
                  </label>
                  <button 
                    type="button"
                    onClick={generateRoomCode}
                    className="text-xs text-primary font-bold hover:underline transition-all flex items-center gap-1"
                  >
                    Generate Code
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground/60">
                    <Hash className="w-4 h-4" />
                  </div>
                  <input
                    id="roomName"
                    type="text"
                    value={roomName}
                    
                    placeholder="e.g. dr-consult-XYZ123"
                    className="w-full pl-10 pr-4 py-2.5 bg-background border border-border/80 focus:border-primary/80 focus:ring-2 focus:ring-primary/20 rounded-xl text-sm font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground/50"
                    required
                  />
                </div>
              </div>

              {/* Join Button */}
              <button
                type="submit"
                disabled={!roomName.trim() || !userName.trim()}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white bg-primary hover:bg-primary/95 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none shadow-md shadow-primary/20 transition-all cursor-pointer"
              >
                Start Consultation
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="pt-4 border-t border-border/50 text-center flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              HIPAA Compliant Secure Connection
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VideoHome;

