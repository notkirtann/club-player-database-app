import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
  processEnv: process.env,
});

console.log("Loaded MONGODB_URL:", process.env.MONGODB_URL);

import express from "express";
import "./db/mongoose.js";
import clubRoutes from "./routes/club.routes.js";
import playerRoutes from "./routes/player.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/clubs', clubRoutes);
app.use('/players', playerRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
