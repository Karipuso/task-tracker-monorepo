import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  process.env.MONGO_URI as string,
  {
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions,
);

const taskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
});

const Task = mongoose.model("Task", taskSchema);

app.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.send(task);
});

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});

app.put("/tasks/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(task);
});

app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.send({ message: "Task deleted" });
});

// Serve client and dashboard
app.use("/client", express.static(path.join(__dirname, "../../client/.next")));
app.use(
  "/dashboard",
  express.static(path.join(__dirname, "../../dashboard/.next")),
);

app.get("/client/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/.next", "index.html"));
});

app.get("/dashboard/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../dashboard/.next", "index.html"));
});

app.listen(8000, () => {
  console.log("Backend running on http://localhost:8000");
});
