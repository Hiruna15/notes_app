import express from "express";
import checkObjectIdValid from "../middlewares/checkObjectIdValid.js";
import {
  getNotes,
  addNote,
  updateNote,
  deleteNote,
} from "../controllers/notes.js";

const router = express.Router();

router.get("/:id", checkObjectIdValid, getNotes);

router.post("/", addNote);

router.patch("/:id", checkObjectIdValid, updateNote);

router.delete("/:id", checkObjectIdValid, deleteNote);

export default router;
