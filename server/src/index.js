import dotenv from "dotenv";
import { connectToDatabase } from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

const PORT = process.env.PORT || 3000;
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`app listening successfully at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("app failed", err);
  });
