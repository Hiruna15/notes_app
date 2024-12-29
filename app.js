import express from "express";
import "dotenv/config";
import connectDB from "./config/connectDB.js";

const app = express();

const PORT = process.env.PORT || 3000;

async function main() {
  await connectDB();
  console.log("Successfully connected to the MongoDB");
  app.listen(PORT, () => {
    console.log(`app is running on the port number ${PORT}`);
  });
}

main();
