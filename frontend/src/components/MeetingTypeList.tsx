import React, { useState } from "react";
import { Plus, Users, Calendar as CalendarIcon, Video } from "lucide-react";
import { MeetingModal } from "./MeetingModal";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  colorClass: string;
  onClick: () => void;
}

const ActionCard: React.FC<ActionCardProps> = ({ title, description, icon, colorClass, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`${colorClass} px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer hover:scale-[1.02] transition-transform duration-300 shadow-lg`}
    >
      <div className="flex-center glassmorphism size-12 rounded-[10px] flex items-center justify-center text-white mb-auto">
        {icon}
      </div>
      <div className="flex flex-col gap-2 mt-4 text-white">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal text-white/80">{description}</p>
      </div>
    </div>
  );
};

export const MeetingTypeList: React.FC = () => {
  const [meetingState, setMeetingState] = useState<"isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined>();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const navigate = useNavigate();

  const createMeeting = async () => {
    // Basic validation before step 5 implementation
    if (!values.dateTime && meetingState === "isScheduleMeeting") {
      toast.error("Please select a date and time");
      return;
    }
    toast.success("Meeting feature will be integrated in Step 5");
    setMeetingState(undefined);
  };

  const joinMeeting = () => {
    if (!values.link) {
      toast.error("Please provide a valid meeting link");
      return;
    }
    toast.success("Joining meeting...");
    setMeetingState(undefined);
  };

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <ActionCard
        title="New Meeting"
        description="Start an instant meeting"
        icon={<Plus size={24} />}
        colorClass="bg-orange-primary"
        onClick={() => setMeetingState("isInstantMeeting")}
      />
      <ActionCard
        title="Join Meeting"
        description="via invitation link"
        icon={<Users size={24} />}
        colorClass="bg-blue-primary"
        onClick={() => setMeetingState("isJoiningMeeting")}
      />
      <ActionCard
        title="Schedule Meeting"
        description="Plan your meeting"
        icon={<CalendarIcon size={24} />}
        colorClass="bg-purple-primary"
        onClick={() => setMeetingState("isScheduleMeeting")}
      />
      <ActionCard
        title="View Recordings"
        description="Meeting recordings"
        icon={<Video size={24} />}
        colorClass="bg-yellow-primary"
        onClick={() => navigate("/recordings")}
      />

      {/* Instant Meeting Modal */}
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />

      {/* Join Meeting Modal */}
      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={joinMeeting}
      >
        <input
          type="text"
          placeholder="Meeting Link"
          className="w-full bg-[#252A41] text-white placeholder-gray-500 rounded-lg px-4 py-2.5 border border-white/5 focus:outline-none focus:border-blue-primary text-sm transition"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
        />
      </MeetingModal>

      {/* Schedule Meeting Modal */}
      <MeetingModal
        isOpen={meetingState === "isScheduleMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Create Meeting"
        handleClick={createMeeting}
        buttonText="Schedule Meeting"
      >
        <div className="flex flex-col gap-2.5">
          <label className="text-base text-gray-900 dark:text-gray-200">
            Add a description
          </label>
          <textarea
            className="w-full bg-gray-100 dark:bg-[#252A41] text-gray-900 dark:text-white rounded-lg px-4 py-2.5 border border-gray-300 dark:border-white/5 focus:outline-none focus:border-blue-primary transition"
            onChange={(e) => setValues({ ...values, description: e.target.value })}
            placeholder="What is this meeting about?"
          />
        </div>
        <div className="flex flex-col gap-2.5 mt-4">
          <label className="text-base text-gray-900 dark:text-gray-200">
            Select Date and Time
          </label>
          <input
            type="datetime-local"
            className="w-full bg-gray-100 dark:bg-[#252A41] text-gray-900 dark:text-white rounded-lg px-4 py-2.5 border border-gray-300 dark:border-white/5 focus:outline-none focus:border-blue-primary transition"
            onChange={(e) => setValues({ ...values, dateTime: new Date(e.target.value) })}
          />
        </div>
      </MeetingModal>
    </section>
  );
};
