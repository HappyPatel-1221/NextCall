import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Copy, Video } from "lucide-react";
import toast from "react-hot-toast";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { apiFetch } from "../utils/api";

const TableRow = ({ title, value }: { title: string; value: string }) => (
  <div className="flex flex-col gap-2 xl:flex-row xl:items-center py-4 border-b border-gray-100 dark:border-white/5">
    <h1 className="text-base font-semibold text-gray-500 dark:text-gray-400 xl:min-w-32">{title}</h1>
    <h1 className="text-sm font-bold text-gray-900 dark:text-white max-xl:break-all">{value}</h1>
  </div>
);

export const PersonalRoom: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const client = useStreamVideoClient();

  if (!user) return null;

  const meetingId = user.id.replace(/-/g, "").substring(0, 12); // clean alphanumeric ID
  const meetingLink = `${window.location.origin}/meeting/${meetingId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(meetingLink);
    toast.success("Meeting link copied to clipboard");
  };

  const startRoom = async () => {
    if (!client || !user) return;

    try {
      const call = client.call("default", meetingId);
      
      // Get or create the call
      await call.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
          custom: {
            description: `${user.name}'s Personal Meeting Room`,
          },
        },
      });

      // Also save to database as a record of active call
      try {
        await apiFetch("/meetings", {
          method: "POST",
          body: JSON.stringify({
            title: `${user.name}'s Personal Room`,
            description: "Personal meeting room call",
            time: new Date().toISOString(),
            code: meetingId,
          }),
        });
      } catch (dbErr) {
        console.warn("Failed to log personal room start to DB:", dbErr);
      }

      navigate(`/meeting/${meetingId}`);
    } catch (error) {
      console.error("Failed to start personal room call:", error);
      toast.error("Failed to start meeting");
    }
  };

  return (
    <section className="flex size-full flex-col gap-10 text-gray-900 dark:text-white p-6">
      <h1 className="text-3xl font-bold">Personal Room</h1>

      <div className="flex w-full flex-col gap-2 xl:max-w-[900px] rounded-[14px] bg-white dark:bg-dark-1 border border-gray-200 dark:border-white/5 p-6 shadow-lg">
        <TableRow title="Topic" value={`${user.name}'s Meeting Room`} />
        <TableRow title="Meeting ID" value={meetingId} />
        <TableRow title="Invite Link" value={meetingLink} />
      </div>

      <div className="flex gap-5">
        <button
          onClick={startRoom}
          className="flex items-center gap-2 rounded-lg bg-blue-primary px-6 py-3 text-sm font-semibold text-white shadow hover:bg-blue-600 transition"
        >
          <Video size={18} />
          Start Meeting
        </button>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 rounded-lg bg-gray-100 dark:bg-dark-2 px-5 py-3 text-sm font-semibold text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-dark-3 transition"
        >
          <Copy size={16} />
          Copy Invitation
        </button>
      </div>
    </section>
  );
};
