import React, { useEffect, useState } from "react";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../utils/api";

const apiKey = import.meta.env.VITE_STREAM_API_KEY;

export const StreamVideoProvider = ({ children }: { children: React.ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    if (!apiKey) throw new Error("Stream API key is missing");

    const tokenProvider = async () => {
      const response = await apiFetch("/stream/token");
      return response.token;
    };

    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user.id,
        name: user.name || user.email,
        image: `https://getstream.io/random_svg/?id=${user.id}&name=${user.name}`,
      },
      tokenProvider,
    });

    setVideoClient(client);

    return () => {
      client.disconnectUser();
    };
  }, [user]);

  if (!videoClient) return <div className="flex-center h-screen text-white">Loading...</div>;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};
