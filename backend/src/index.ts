import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth";
import streamRoutes from "./routes/stream";
import meetingsRoutes from "./routes/meetings";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://next-call-six.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith(".vercel.app") ||
      origin === process.env.CLIENT_URL
    ) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true,
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/stream", streamRoutes);
app.use("/api/meetings", meetingsRoutes);

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "NextCall Server API is running smoothly" });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "NextCall Server is running smoothly" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
