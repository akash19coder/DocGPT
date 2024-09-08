//Third-party library imports
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import userRoutes from "./routes/user-routes.js";
import chatRoutes from "./routes/chat-routes.js";

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Parse JSON requests
app.use(morgan("dev")); // Log HTTP requests
app.use(cookieParser(process.env.COOKIE_SECRET)); // Parse cookies

// Routes
app.use("/", userRoutes);
app.use("/chat", chatRoutes);

export default app;
