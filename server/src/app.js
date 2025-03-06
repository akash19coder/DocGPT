//Third-party library imports
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser(process.env.COOKIE_SECRET));

import userRoutes from "./routes/user.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
// import chatRoutes from "./routes/chat.routes.js";

// Routes
app.use("/api/v1/document", uploadRoutes);
app.use("/api/v1/user", userRoutes);
// app.use("/api/v1/chat", chatRoutes);

export { app };
