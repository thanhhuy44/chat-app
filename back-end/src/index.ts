import Express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import AppRouter from "./router";

const app: Application = Express();
dotenv.config();

app.use(
  cors({
    origin: ["http://localhost:*", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.raw());

mongoose.connect(process.env.DB_URL as string);

AppRouter(app);

app.listen(4040, () => {
  console.log("Server start at port 4040");
  console.log("URL: http://localhost:4040");
});
