import express from "express";
import { StreamClient } from "@stream-io/node-sdk";
import { authenticateToken, AuthRequest } from "../middleware/auth";

const router = express.Router();

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

router.get("/token", authenticateToken, async (req: AuthRequest, res: any) => {
  try {
    if (!apiKey || !apiSecret) {
      return res.status(500).json({ error: "Stream API keys are missing" });
    }

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Initialize Stream Client
    const streamClient = new StreamClient(apiKey, apiSecret);

    // Token validity (1 hour)
    const validityInSeconds = 60 * 60;
    const issued = Math.floor(Date.now() / 1000) - 60;

    // Create token
    const token = streamClient.generateUserToken({ user_id: userId, validity_in_seconds: validityInSeconds, iat: issued });

    return res.json({ token });
  } catch (error) {
    console.error("Stream Token Error:", error);
    return res.status(500).json({ error: "Failed to generate stream token" });
  }
});

export default router;
