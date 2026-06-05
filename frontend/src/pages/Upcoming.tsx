import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../utils/api";
import { MeetingCard } from "../components/MeetingCard";

interface MeetingData {
  id: string;
  title: string;
  description?: string;
  time: string;
  code: string;
  status: string;
}

export const Upcoming: React.FC = () => {
  const [meetings, setMeetings] = useState<MeetingData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const data = await apiFetch("/meetings/upcoming");
        setMeetings(data);
      } catch (error) {
        console.error("Failed to fetch upcoming meetings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  return (
    <section className="flex size-full flex-col gap-10 text-gray-900 dark:text-white p-6">
      <h1 className="text-3xl font-bold">Upcoming Meetings</h1>

      {isLoading ? (
        <div className="flex-center h-[200px] text-lg font-medium">Loading...</div>
      ) : meetings.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {meetings.map((meeting) => (
            <MeetingCard
              key={meeting.id}
              id={meeting.id}
              title={meeting.title}
              description={meeting.description}
              time={meeting.time}
              code={meeting.code}
              type="upcoming"
              onStartClick={() => navigate(`/meeting/${meeting.code}`)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-[14px] bg-white dark:bg-dark-1 border border-gray-200 dark:border-white/5 p-10 text-center shadow">
          <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">
            No upcoming meetings scheduled.
          </p>
        </div>
      )}
    </section>
  );
};
