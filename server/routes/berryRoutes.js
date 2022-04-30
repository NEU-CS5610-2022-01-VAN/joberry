import express from "express";
import { berryController } from "../controllers/index.js";
import { requireAuth } from "../middleware/index.js";

const router = express.Router();
router.get("/", berryController.getBerriesOfPost);
router.post("/", requireAuth, berryController.createNewBerry);
router.delete("/:id", requireAuth, berryController.deleteBerry);

export default router