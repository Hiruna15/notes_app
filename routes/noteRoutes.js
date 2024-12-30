import express from "express";
import checkObjectIdValid from "../middlewares/checkObjectIdValid.js";
import NotesModel from "../models/note.js";
const router = express.Router();

router.get("/:id", checkObjectIdValid, async (req, res) => {
  const { id: userId } = req.params;
  const notes = await NotesModel.find({ createdBy: userId }).exec();
  res.status(200).json({ success: true, data: notes });
});

router.post("/", async (req, res) => {
  const note = req.body;

  if (Object.keys(note).length === 0) {
    return res
      .status(400)
      .json({ success: false, error: "no note has provided" });
  }

  const newNote = await NotesModel.create(note);
  res.status(200).json({ success: true, data: newNote });
});

router.patch("/:id", checkObjectIdValid, async (req, res) => {
  const note = req.body;
  const { id: noteId } = req.params;

  const updatedNote = await NotesModel.findByIdAndUpdate(noteId, note, {
    new: true,
    runValidators: true,
  });

  if (!updatedNote) {
    return res
      .status(400)
      .json({ success: false, error: "no note found with that id" });
  }

  res.status(200).json({ success: true, data: updatedNote });
});

export default router;
