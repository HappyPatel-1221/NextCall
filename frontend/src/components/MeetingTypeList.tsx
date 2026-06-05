import React from "react";
import { Plus, Users, Calendar as CalendarIcon, Video } from "lucide-react";

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
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <ActionCard
        title="New Meeting"
        description="Start an instant meeting"
        icon={<Plus size={24} />}
        colorClass="bg-orange-primary"
        onClick={() => {}}
      />
      <ActionCard
        title="Join Meeting"
        description="via invitation link"
        icon={<Users size={24} />}
        colorClass="bg-blue-primary"
        onClick={() => {}}
      />
      <ActionCard
        title="Schedule Meeting"
        description="Plan your meeting"
        icon={<CalendarIcon size={24} />}
        colorClass="bg-purple-primary"
        onClick={() => {}}
      />
      <ActionCard
        title="View Recordings"
        description="Meeting recordings"
        icon={<Video size={24} />}
        colorClass="bg-yellow-primary"
        onClick={() => {}}
      />
    </section>
  );
};
