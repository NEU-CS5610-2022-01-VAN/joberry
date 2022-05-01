import express from "express";
import { commentController } from "../controllers/index.js";
import { requireAuth } from "../middleware/index.js";

const router = express.Router();
router.get("/", commentController.getCommentsOfPost);
router.post("/", requireAuth, commentController.createNewComment);
router.delete("/:id", requireAuth, commentController.deleteComment);

export default router;
