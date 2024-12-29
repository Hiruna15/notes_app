import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const checkObjectIdValid = (req, res, next) => {
  const { userid } = req.params;
  ObjectId.isValid(userid)
    ? next()
    : res.status(400).json({ error: "Invalid Object Id" });
};

export default checkObjectIdValid;
