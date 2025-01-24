import express from "express";
import "dotenv/config";
import connectDB from "./config/connectDB.js";
import errorHandlere from "./middlewares/errorHandlere.js";
import cookieParser from "cookie-parser";

import noteRoutes from "./routes/noteRoutes.js";
import userRoutes from "./routes/userRoutes..js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoutes);
app.use("/notes", noteRoutes);

app.use(errorHandlere);

async function main() {
  await connectDB();
  console.log("Successfully connected to the MongoDB");
  app.listen(PORT, () => {
    console.log(`app is running on the port number ${PORT}`);
  });
}

main();
