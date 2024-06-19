import express, { Request, Response } from "express";
import Task from "../models/task.js";
import Folder from "../models/folder.js";
import { Schema } from "mongoose";
import { body, check, validationResult } from "express-validator";

const router = express.Router();

router.get("/list/:folder_id", async (req, res) => {
  const { folder_id } = req.params || {};
  const tasks = await Task.find({ folder: folder_id });
  return res.json({ success: true, tasks });
});

router.post(
  "/set",
  [
    body("name").notEmpty().trim(),
    body("color").notEmpty().trim(),
    body("folder").notEmpty().trim(),
  ],
  async (req: Request, res: Response) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        throw new Error("Invalid data");
      }
      const { name, color, folder: folder_id, _id, state } = req.body || {};
      if (_id) {
        const task = await Task.findOneAndUpdate(
          { _id },
          { name, color, state },
        );
        if (task) {
          await task.save();
        }
      } else {
        const task = new Task({ name, color, folder: folder_id });
        await task.save();
        const folder = await Folder.findOne({ _id: folder_id });
        if (folder) {
          folder.tasks.push(task._id as Schema.Types.ObjectId);
          folder.save();
        }
      }
      return res.json({ success: true });
    } catch (e) {
      return res.json({ success: false });
    }
  },
);

router.post("/set_order", async (req, res) => {
  const { destination, source, folder_id } = req.body || {};
  const folder = await Folder.findOne({ _id: folder_id });
  if (folder) {
    const targetTasks = [...folder.tasks];
    const [task] = targetTasks.splice(source, 1);
    targetTasks.splice(destination, 0, task as Schema.Types.ObjectId);
    folder.tasks = targetTasks;
    await folder.save();
  }
  return res.json({ success: true });
});

router.post("/delete", async (req, res) => {
  const { _id, folder: folder_id } = req.body || {};
  const task = await Task.findOneAndDelete({ _id });
  const folder = await Folder.findOne({ _id: folder_id });
  if (folder) {
    folder.tasks = folder.tasks.filter((c) => c !== _id);
    await folder.save();
  }
  return res.json({ success: true });
});

export default router;
