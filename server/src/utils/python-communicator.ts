import { Request, Response, NextFunction } from "express";
import ChatHistory from "../models/ChatHistory.js";

import { spawn } from "child_process";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const pdfDataExtractor = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const pythonProcess = spawn("python", [
    path.resolve(__dirname, "../../pythons-scripts/pdfparser.py"),
  ]);

  let pythonOutput = Buffer.from([]);

  pythonProcess.stdout.on("data", (data) => {
    pythonOutput = Buffer.concat([pythonOutput, data]);
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Python Error: ${data}`);
  });

  pythonProcess.on("close", async (code) => {
    const decodedOutput = pythonOutput.toString("utf-8");

    const conversationData = {
      role: "user",
      content: decodedOutput,
    };
    try {
      const randomLength = Math.floor(Math.random() * 3) + 3;
      let title = conversationData.content
        .split("\n")
        .slice(0,randomLength ) 
        .join(" ");
      if(title.length > 35){
        title = title.substring(0,35);
      }
      const userChatHistory = await ChatHistory.findByIdAndUpdate(
        { _id: req.locals },
        { $set: { title }, $push: { conversation: conversationData } },
        { new: true },
      );
      res.status(200).json({ message: "OK" });
    } catch (error) {
      console.error("Error updating conversation:", error.message);
      return null;
    }
  }); 
};
