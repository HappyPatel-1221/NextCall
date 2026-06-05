import React, { useEffect, useState } from "react";
import { useStreamVideoClient, type CallRecording } from "@stream-io/video-react-sdk";
import { useAuth } from "../context/AuthContext";
import { Video, Play, Copy, Calendar } from "lucide-react";
import toast from "react-hot-toast";

export const Recordings: React.FC = () => {
  const client = useStreamVideoClient();
  const { user } = useAuth();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecordings = async () => {
      if (!client || !user) return;
      try {
        // Query calls created by the user or where the user is a member
        const { calls } = await client.queryCalls({
          filter_conditions: {
            $or: [
              { created_by_user_id: user.id },
              { members: { $in: [user.id] } },
            ],
          },
          limit: 20,
        });

        // Query recordings for all found calls in parallel
        const allRecordings = await Promise.all(
          calls.map(async (call) => {
            try {
              const res = await call.queryRecordings();
              return res.recordings;
            } catch (err) {
              console.error(`Failed to fetch recordings for call ${call.id}:`, err);
              return [];
            }
          })
        );

        // Flatten the array of recording lists
        const flattened = allRecordings.flat();
        // Sort by start_time descending
        flattened.sort((a, b) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime());

        setRecordings(flattened);
      } catch (error) {
        console.error("Failed to fetch recordings:", error);
        toast.error("Failed to load recordings");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecordings();
  }, [client, user]);

  const copyShareLink = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("Recording share link copied");
  };

  const formatDateTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <section className="flex size-full flex-col gap-10 text-gray-900 dark:text-white p-6">
      <h1 className="text-3xl font-bold">Meeting Recordings</h1>

      {isLoading ? (
        <div className="flex-center h-[200px] text-lg font-medium">Loading...</div>
      ) : recordings.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {recordings.map((recording, idx) => (
            <div
              key={recording.url || idx}
              className="flex flex-col justify-between w-full rounded-[14px] bg-white dark:bg-dark-1 border border-gray-200 dark:border-white/5 p-5 min-h-[180px] shadow-lg hover:scale-[1.01] transition-transform duration-200"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex-center size-10 rounded-[10px] bg-gray-100 dark:bg-dark-2 text-yellow-primary flex items-center justify-center">
                    <Video size={20} />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Calendar size={14} />
                      {formatDateTime(recording.start_time)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
                    {recording.filename || "Meeting Recording"}
                  </h2>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 mt-6 pt-4 border-t border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-2">
                  <a
                    href={recording.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-lg bg-blue-primary px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-600 transition"
                  >
                    <Play size={14} />
                    Play
                  </a>
                  <button
                    onClick={() => copyShareLink(recording.url)}
                    className="flex items-center gap-1.5 rounded-lg bg-gray-100 dark:bg-dark-2 px-3 py-2 text-sm font-semibold text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-dark-3 transition"
                  >
                    <Copy size={14} />
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-[14px] bg-white dark:bg-dark-1 border border-gray-200 dark:border-white/5 p-10 text-center shadow">
          <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">
            No recordings found. Make sure recordings are enabled in your Stream Dashboard.
          </p>
        </div>
      )}
    </section>
  );
};
