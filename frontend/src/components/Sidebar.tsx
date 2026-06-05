import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Calendar, Clock, Video, Plus } from "lucide-react";

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const links = [
    { name: "Home", url: "/", icon: <Home size={24} /> },
    { name: "Upcoming", url: "/upcoming", icon: <Calendar size={24} /> },
    { name: "Previous", url: "/previous", icon: <Clock size={24} /> },
    { name: "Recordings", url: "/recordings", icon: <Video size={24} /> },
    { name: "Personal Room", url: "/personal-room", icon: <Plus size={24} /> },
  ];

  return (
    <div className="sticky top-0 left-0 flex h-screen w-fit flex-col justify-between bg-white dark:bg-dark-1 p-6 pt-28 text-gray-800 dark:text-white lg:w-[264px] border-r border-gray-200 dark:border-white/5">
      <div className="flex flex-col gap-6">
        {links.map((link) => {
          const isActive = pathname === link.url;
          return (
            <Link
              to={link.url}
              key={link.name}
              className={`flex gap-4 items-center p-4 rounded-xl justify-start transition-colors ${
                isActive ? "bg-blue-primary text-white" : "hover:bg-gray-100 dark:hover:bg-dark-2"
              }`}
            >
              {link.icon}
              <p className="text-lg font-semibold max-lg:hidden">{link.name}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
