import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./src/router/index.js";
import { createServer } from "http";
import socket from "./src/socket/index.js";

const uri = process.env.DB_URL;

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {});
    console.log("Çonnected to MongoDB");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const app = express();
const server = createServer(app);

socket(server);

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "https://chat-app-ofzl.vercel.app",
    ],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.raw());

app.get("/", (req, res) => {
  return res.send("App is running...");
});

connectDB();

routes(app);

const port = 3030; // or any other port you want to use
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
