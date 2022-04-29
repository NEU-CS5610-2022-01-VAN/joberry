import express from "express";
import { activityController } from '../controllers/index.js';

const activityRouter = express.Router();

//berries
activityRouter.get("berries", activityController.getBerriesOfPost);
activityRouter.post("/berries", activityController.createNewBerry);
activityRouter.delete("/berries", activityController.deleteBerry);

//comments
activityRouter.get("/comments", activityController.getCommentsOfPost);
activityRouter.post("/comments", activityController.createNewComment);
activityRouter.delete("/comments/:id", activityController.deleteComment);

export default activityRouter;