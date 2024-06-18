import { Schema, model, Document } from "mongoose";

interface Task extends Document {
  name: string;
  color: string;
  folder: Schema.Types.ObjectId;
  state: boolean;
}

const schema = new Schema<Task>({
  name: { type: String, required: true },
  color: { type: String, required: true },
  folder: { type: Schema.Types.ObjectId, ref: "Folder" },
  state: { type: Boolean, default: false },
});

const Task = model<Task>("Task", schema);

export default Task;
