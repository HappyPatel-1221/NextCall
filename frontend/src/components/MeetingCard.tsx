import React from "react";
import { Calendar, Clock, Copy, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

interface MeetingCardProps {
  id: string;
  title: string;
  description?: string;
  time: string;
  code: string;
  type: "upcoming" | "previous";
  onStartClick?: () => void;
}

export const MeetingCard: React.FC<MeetingCardProps> = ({
  title,
  description,
  time,
  code,
  type,
  onStartClick,
}) => {
  const meetingLink = `${window.location.origin}/meeting/${code}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(meetingLink);
    toast.success("Meeting link copied to clipboard");
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
    <div className="flex flex-col justify-between w-full rounded-[14px] bg-white dark:bg-dark-1 border border-gray-200 dark:border-white/5 p-5 min-h-[200px] shadow-lg transition-transform duration-200 hover:scale-[1.01]">
      <div className="flex flex-col gap-4">
        {/* Top Header Row with Icon and Date */}
        <div className="flex items-center gap-3">
          <div className="flex-center size-10 rounded-[10px] bg-gray-100 dark:bg-dark-2 text-blue-primary flex items-center justify-center">
            {type === "upcoming" ? <Calendar size={20} /> : <Clock size={20} />}
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {formatDateTime(time)}
            </p>
          </div>
        </div>

        {/* Title and Description */}
        <div className="flex flex-col gap-1.5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">
            {title}
          </h2>
          {description && (
            <p className="text-sm font-normal text-gray-600 dark:text-gray-300 line-clamp-2">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Footer / Buttons Row */}
      <div className="flex items-center justify-between gap-4 mt-6 pt-4 border-t border-gray-100 dark:border-white/5">
        {type === "upcoming" ? (
          <div className="flex items-center gap-2">
            <button
              onClick={onStartClick}
              className="rounded-lg bg-blue-primary px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-600 transition"
            >
              Start
            </button>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 rounded-lg bg-gray-100 dark:bg-dark-2 px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-dark-3 transition"
            >
              <Copy size={16} />
              Copy Code
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-500">
              <CheckCircle size={14} />
              Completed
            </span>
          </div>
        )}

        <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
          ID: {code}
        </span>
      </div>
    </div>
  );
};
