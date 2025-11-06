import mongoose from "mongoose";

const url = 'mongodb://localhost:27017/club-player-app';

mongoose.connect(url)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((e) => console.error("MongoDB connection failed:", e));
