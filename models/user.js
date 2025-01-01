import mongoose from "mongoose";
const { Schema, model } = mongoose;

const pwdRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: [true, "this username is already taken"],
    minLength: [2, "username cannot have less than 2 characters"],
    maxLength: [20, "username cannot have more than 20 characters"],
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "a password must be provided"],
    minLength: [8, "password must have at least 8 characters"],
    maxLength: [25, "password cannot have more than 25 characters"],
    match: [pwdRegex, "weak password"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "email must be provided"],
    unique: [
      true,
      "an account has been already registered with the email you provided",
    ],
    match: [emailRegex, "Invalid email address"],
  },
});

const UserModel = model("User", userSchema);

export default UserModel;
