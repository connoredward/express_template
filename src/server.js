import express from "express";
import {port} from "./config";

import { handler } from "./controller.js";

const db = process.env.MONGODB_URL;

const app = express();

app.get("/", handler);

app.listen(port, () => console.log(
    `Example app listening on port ${port}!`
));


const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB()