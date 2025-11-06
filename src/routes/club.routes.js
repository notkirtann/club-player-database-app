import express from 'express'
import * as controllers from '../controllers/club.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router()

router.post("/signup", controllers.createClub);

router.post("/login",controllers.clubLogin)

router.get("/admin", auth,controllers.getMyClubs);

router.get("/:id",auth, controllers.getClubById);

router.patch("/:id",auth, controllers.updateClubById);

router.delete("/:id",auth, controllers.deleteClubById);

export default router;