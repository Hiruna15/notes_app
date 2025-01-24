import NotesModel from "../models/note.js";
import { BadRequest, NotFound } from "../errors/index.js";

const getNotes = async (req, res, next) => {
  const { id: userId } = req.params;
  try {
    const notes = await NotesModel.find({ createdBy: userId });
    res.status(200).json({ success: true, data: notes });
  } catch (err) {
    next(err);
  }
};

const addNote = async (req, res) => {
  const note = req.body;

  try {
    const newNote = await NotesModel.create(note);
    res.status(200).json({ success: true, data: newNote });
  } catch (err) {
    next(err);
  }
};

const updateNote = async (req, res, next) => {
  const note = req.body;
  const { id: noteId } = req.params;

  try {
    const updatedNote = await NotesModel.findByIdAndUpdate(noteId, note, {
      new: true,
      runValidators: true,
    });

    if (!updatedNote) {
      return next(new NotFound("no note found with the given id"));
    }

    res.status(200).json({ success: true, data: updatedNote });
  } catch (err) {
    return next(err);
  }
};

const deleteNote = async (req, res) => {
  const { id: noteId } = req.params;

  const deletedNote = await NotesModel.findByIdAndDelete(noteId);

  if (!deletedNote) {
    return next(new NotFound("no note found with the given id"));
  }

  res.status(200).json({ success: true, data: deletedNote });
};

export { getNotes, addNote, updateNote, deleteNote };
