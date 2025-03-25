import dotenv from "dotenv";
import { connectToDatabase } from "./db/index.js";
import { app } from "./app.js";
// import { startWorker } from "./utils/worker.js";

dotenv.config({
  path: "./env",
});

const PORT = process.env.PORT || 3002;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`app listening successfully at port: ${PORT}`);
    });
    // startWorker();
  })
  .catch((err) => {
    console.log("app failed", err);
  });
