import { Schema, model, Document } from "mongoose";

interface Folder extends Document {
  name: string;
  color: string;
  tasks: Schema.Types.ObjectId[];
}

const schema = new Schema<Folder>({
  name: { type: String, required: true },
  color: { type: String, required: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

const Folder = model<Folder>("Folder", schema);

export default Folder;
