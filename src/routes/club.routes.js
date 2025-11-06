import express from 'express'
import * as controllers from '../controllers/club.controller.js';

const router = express.Router()

router.post("/", controllers.createClub);

router.post("/login",controllers.clubLogin)

router.get("/", controllers.getAllClubs);

router.get("/:id", controllers.getClubById);

router.patch("/:id", controllers.updateClubById);

router.delete("/:id", controllers.deleteClubById);

export default router;