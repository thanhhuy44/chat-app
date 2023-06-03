import http from "http";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./src/router/index.js";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server({
  cors: {
    origin: server,
  },
});

dotenv.config();
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.raw());

app.get("/", (req, res) => {
  return res.send("App is running...");
});

routes(app);

server.listen(3030, () => {
  console.log("App listening on port 3030");
});
