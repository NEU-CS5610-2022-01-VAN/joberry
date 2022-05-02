import express from "express";
import { discoverController } from "../controllers/index.js";

const router = express.Router();

router.post("/hot", discoverController.getHotCommentPosts);
router.post("/most-berries", discoverController.getHotBerryPosts);


export default router;
