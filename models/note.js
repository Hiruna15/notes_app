import mongoose from "mongoose";
const { Schema, model } = mongoose;

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Note must have a title"],
    },
    content: String,
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    tags: [String],
    isPinned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const NotesModel = model("Note", noteSchema);

export default NotesModel;
