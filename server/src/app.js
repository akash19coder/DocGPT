import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);
// app.use((req, res, next) => {
//   // Set the Access-Control-Allow-Origin header to the specific origin.
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
//   // Allow credentials (cookies, authorization headers) to be sent.
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   // Allow common HTTP methods.
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, OPTIONS",
//   );
//   // Allow common headers.
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser(process.env.COOKIE_SECRET));

import userRoutes from "./routes/user.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import chatRoutes from "./routes/chat.routes.js";

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/document", uploadRoutes);
app.use("/api/v1", chatRoutes);

export { app };
