import express from "express";
import { prisma } from "../db";
import { authenticateToken, AuthRequest } from "../middleware/auth";

const router = express.Router();

// Create a meeting
router.post("/", authenticateToken, async (req: AuthRequest, res: any) => {
  try {
    const { title, description, time, code } = req.body;
    const creatorId = req.user?.id;

    if (!creatorId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!title || !time || !code) {
      return res.status(400).json({ error: "Title, time, and meeting code are required" });
    }

    const meeting = await prisma.meeting.create({
      data: {
        creatorId,
        title,
        description,
        time: new Date(time),
        code,
        status: new Date(time) > new Date() ? "upcoming" : "previous",
      },
    });

    return res.status(201).json(meeting);
  } catch (error: any) {
    console.error("Create meeting error:", error);
    if (error.code === "P2002") {
      return res.status(400).json({ error: "A meeting with this code already exists" });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Get upcoming meetings
router.get("/upcoming", authenticateToken, async (req: AuthRequest, res: any) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const meetings = await prisma.meeting.findMany({
      where: {
        creatorId: userId,
        time: {
          gte: new Date(),
        },
      },
      orderBy: {
        time: "asc",
      },
    });

    return res.json(meetings);
  } catch (error) {
    console.error("Get upcoming meetings error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Get previous meetings
router.get("/previous", authenticateToken, async (req: AuthRequest, res: any) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const meetings = await prisma.meeting.findMany({
      where: {
        creatorId: userId,
        time: {
          lt: new Date(),
        },
      },
      orderBy: {
        time: "desc",
      },
    });

    return res.json(meetings);
  } catch (error) {
    console.error("Get previous meetings error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
