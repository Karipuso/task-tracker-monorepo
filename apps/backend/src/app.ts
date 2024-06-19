import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import folderRoutes from "./routes/folderRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

mongoose
  .connect(
    (process.env.MONGO_URI as string) ||
      "mongodb://localhost:27017/task_tracker",
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

app.use(bodyParser.json());
app.use(cors());

app.use("/api/folder", folderRoutes);
app.use("/api/task", taskRoutes);

if (process.env.NODE_ENV === "production") app.listen(8000);

export const viteNodeApp = app;
