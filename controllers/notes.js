import NotesModel from "../models/note.js";

const getNotes = async (req, res) => {
  const { id: userId } = req.params;
  const notes = await NotesModel.find({ createdBy: userId }).exec();
  res.status(200).json({ success: true, data: notes });
};

const addNote = async (req, res) => {
  const note = req.body;

  if (Object.keys(note).length === 0) {
    return res
      .status(400)
      .json({ success: false, error: "no note has provided" });
  }

  const newNote = await NotesModel.create(note);
  res.status(200).json({ success: true, data: newNote });
};

const updateNote = async (req, res) => {
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
};

const deleteNote = async (req, res) => {
  const { id: noteId } = req.params;

  const deletedNote = await NotesModel.findByIdAndDelete(noteId);

  if (deletedNote) {
    return res.status(200).json({ success: true, data: deletedNote });
  }

  res
    .status(400)
    .json({ success: false, error: "no note found with the given id" });
};

export { getNotes, addNote, updateNote, deleteNote };
