import express from "express";
import { sendMessage } from "../controllers/message.controller";
import protectRoute from "../middlewares/protectRoute";

const router = express.Router();

router.post('/send/:id', protectRoute, sendMessage)
router.get(':id')

export default router;