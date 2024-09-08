import app from "./app.js";
import { connectToDatabase } from "./config/db-config.js"

connectToDatabase()
  .then(() => {
    app.listen(3001, () => {
      console.log("app connected successfullly");
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
