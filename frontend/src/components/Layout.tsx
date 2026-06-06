import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { useMeeting } from "../context/MeetingContext";
import { StreamCall } from "@stream-io/video-react-sdk";
import { MinimizedMeeting } from "./MinimizedMeeting";

export const Layout: React.FC = () => {
  const { activeCall } = useMeeting();

  const content = (
    <main className="relative bg-light-1 dark:bg-dark-2 min-h-screen">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
          <div className="w-full">
            <Outlet />
          </div>
        </section>
      </div>
      <MinimizedMeeting />
    </main>
  );

  if (activeCall) {
    return <StreamCall call={activeCall}>{content}</StreamCall>;
  }

  return content;
};
