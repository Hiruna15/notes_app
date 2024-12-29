import express from "express";
const app = express();
import "dotenv/config";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`app is running on the port number ${PORT}`);
});
