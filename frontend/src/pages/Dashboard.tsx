import React, { useState, useEffect } from "react";
import { MeetingTypeList } from "../components/MeetingTypeList";

export const Dashboard: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  const dateString = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(time);

  return (
    <section className="flex size-full flex-col gap-10 text-gray-900 dark:text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-[url('/src/assets/hero.png')] bg-cover bg-center shadow-lg relative overflow-hidden">
        {/* We can use a default blue background if hero image is missing */}
        <div className="absolute inset-0 bg-blue-primary/80 dark:bg-dark-3/80" />
        <div className="relative z-10 flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11 p-8">
          <h2 className="glassmorphism max-w-[270px] rounded py-2 px-4 text-center text-base font-normal text-white">
            Upcoming Meeting at: 12:30 PM
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl text-white">{timeString}</h1>
            <p className="text-lg font-medium text-white/80 lg:text-2xl">{dateString}</p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  );
};
