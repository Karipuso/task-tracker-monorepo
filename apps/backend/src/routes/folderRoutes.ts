import express from "express";
import Folder from "../models/folder.js";
import Task from "../models/task.js";

const router = express.Router();

router.get("/list", async (req, res) => {
  const folders = await Folder.find().populate("tasks");
  return res.json({ success: true, folders });
});

router.post("/set", async (req, res) => {
  const { name, color, _id } = req.body || {};
  if (_id) {
    const folder = await Folder.findOneAndUpdate({ _id }, { name, color });
    if (folder) {
      await folder.save();
    }
  } else {
    const folder = new Folder({ name, color });
    await folder.save();
  }
  return res.json({ success: true });
});

router.post("/delete", async (req, res) => {
  const { folder_id } = req.body || {};
  await Folder.findOneAndDelete({ _id: folder_id });
  await Task.deleteMany({ folder: folder_id });
  return res.json({ success: true });
});

export default router;
