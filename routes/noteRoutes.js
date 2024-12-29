import express from "express";
import checkObjectIdValid from "../middlewares/checkObjectIdValid.js";
import NotesModel from "../models/note.js";
const router = express.Router();

router.get("/:userid", checkObjectIdValid, async (req, res) => {
  const { userid } = req.params;
  const notes = await NotesModel.find({ createdBy: userid }).exec();
  res.status(200).json({ success: true, data: notes });
});

export default router;
