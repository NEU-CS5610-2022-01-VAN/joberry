import express from "express";
import { berryController } from '../controllers/index.js';
import { commentController } from '../controllers/index.js';
import { requireAuth } from "../middleware/index.js";

const activityRouter = express.Router();

//berries
activityRouter.get("berries", berryController.getBerriesOfPost);
activityRouter.post("/berries", requireAuth, berryController.createNewBerry);
activityRouter.delete("/berries", requireAuth, berryController.deleteBerry);

//comments
activityRouter.get("/comments", commentController.getCommentsOfPost);
activityRouter.post(
  "/comments",
  requireAuth,
  commentController.createNewComment
);
activityRouter.delete(
  "/comments/:id",
  requireAuth,
  commentController.deleteComment
);

export default activityRouter;