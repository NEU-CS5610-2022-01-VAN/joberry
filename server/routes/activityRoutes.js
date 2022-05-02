import express from "express";
import { activityController } from '../controllers/index.js';
import { requireAuth } from "../middleware/index.js";

const activityRouter = express.Router();

//berries
activityRouter.get("berries", activityController.getBerriesOfPost);
activityRouter.post("/berries", requireAuth, activityController.createNewBerry);
activityRouter.delete("/berries", requireAuth, activityController.deleteBerry);

//comments
activityRouter.get("/comments", activityController.getCommentsOfPost);
activityRouter.post(
  "/comments",
  requireAuth,
  activityController.createNewComment
);
activityRouter.delete(
  "/comments/:id",
  requireAuth,
  activityController.deleteComment
);

export default activityRouter;