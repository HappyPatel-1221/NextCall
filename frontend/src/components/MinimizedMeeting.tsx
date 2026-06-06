import React from "react";
import { useNavigate } from "react-router-dom";
import { useMeeting } from "../context/MeetingContext";
import { Call, useCallStateHooks } from "@stream-io/video-react-sdk";
import { Mic, MicOff, Video, VideoOff, Maximize2, PhoneOff, Users } from "lucide-react";

export const MinimizedMeeting: React.FC = () => {
  const { activeCall, isMinimized } = useMeeting();

  if (!activeCall || !isMinimized) return null;

  return <MinimizedMeetingContent activeCall={activeCall} />;
};

const MinimizedMeetingContent: React.FC<{ activeCall: Call }> = ({ activeCall }) => {
  const { endCall, setIsMinimized } = useMeeting();
  const navigate = useNavigate();

  const { useMicrophoneState, useCameraState, useParticipants } = useCallStateHooks();
  const { microphone, isMute: isMicMuted } = useMicrophoneState();
  const { camera, isMute: isCamMuted } = useCameraState();
  const participants = useParticipants();

  const handleMaximize = () => {
    setIsMinimized(false);
    navigate(`/meeting/${activeCall.id}`);
  };

  const toggleMic = async () => {
    try {
      if (isMicMuted) {
        await microphone.enable();
      } else {
        await microphone.disable();
      }
    } catch (err) {
      console.error("Failed to toggle mic:", err);
    }
  };

  const toggleCam = async () => {
    try {
      if (isCamMuted) {
        await camera.enable();
      } else {
        await camera.disable();
      }
    } catch (err) {
      console.error("Failed to toggle camera:", err);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col w-72 rounded-2xl bg-white/90 dark:bg-[#1C1F2E]/95 backdrop-blur-md shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden transition-all duration-300">
      <div className="p-4 bg-blue-primary/10 dark:bg-blue-primary/5 flex items-center justify-between border-b border-gray-200 dark:border-white/5">
        <div className="flex flex-col">
          <p className="text-[10px] font-bold text-blue-primary dark:text-blue-500 uppercase tracking-wider">Active Call</p>
          <h4 className="text-sm font-bold text-gray-800 dark:text-white truncate max-w-[160px]">
            {activeCall.state.custom?.description || "NextCall Meeting"}
          </h4>
        </div>
        
        <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-300 text-xs bg-gray-200/50 dark:bg-dark-2 px-2.5 py-1 rounded-full">
          <Users size={12} className="text-blue-primary dark:text-blue-500" />
          <span className="font-semibold">{participants.length}</span>
        </div>
      </div>

      <div className="p-4 flex items-center justify-between gap-2 bg-gray-50 dark:bg-[#1C1F2E]">
        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMic}
            className={`p-2.5 rounded-xl transition-all ${
              isMicMuted
                ? "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                : "bg-gray-200 dark:bg-dark-2 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-dark-3"
            }`}
            title={isMicMuted ? "Unmute Mic" : "Mute Mic"}
          >
            {isMicMuted ? <MicOff size={16} /> : <Mic size={16} />}
          </button>
          
          <button
            onClick={toggleCam}
            className={`p-2.5 rounded-xl transition-all ${
              isCamMuted
                ? "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                : "bg-gray-200 dark:bg-dark-2 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-dark-3"
            }`}
            title={isCamMuted ? "Turn Camera On" : "Turn Camera Off"}
          >
            {isCamMuted ? <VideoOff size={16} /> : <Video size={16} />}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleMaximize}
            className="p-2.5 rounded-xl bg-blue-primary text-white hover:bg-blue-600 transition-all shadow-md shadow-blue-500/20"
            title="Maximize Meeting"
          >
            <Maximize2 size={16} />
          </button>
          
          <button
            onClick={endCall}
            className="p-2.5 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all shadow-md shadow-red-500/20"
            title="Leave Meeting"
          >
            <PhoneOff size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
