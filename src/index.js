import express from "express";
import "./db/mongoose.js";
import clubRoutes from "./routes/club.routes.js";
import playerRoutes from "./routes/player.routes.js";

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/clubs', clubRoutes);
app.use('/players', playerRoutes);

app.listen(PORT, () => {
  console.log(`🚀⚽⚽⚽ Server running on port ${PORT}⚽⚽⚽⚽`);
});
