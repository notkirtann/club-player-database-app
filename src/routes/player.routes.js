import express from 'express'
import * as controllers from '../controllers/player.controller.js'

const router = express.Router()

router.post("/", controllers.createPlayer);

router.get("/", controllers.getAllPlayers);

router.get("/:id", controllers.getPlayerById);

// router.get("/club/:clubId", controllers.getPlayersByClub);

router.patch("/:id", controllers.updatePlayerById);

router.delete("/:id", controllers.deletePlayerById);

export default router;