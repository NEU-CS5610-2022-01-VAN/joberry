import express from "express";
import { followController } from "../controllers/index.js";
import { requireAuth } from "../middleware/index.js";

const followRouter = express.Router();

followRouter.post("/", requireAuth, followController.createNewFollowing);
followRouter.delete("/:id", requireAuth, followController.deleteFollowing);

export default followRouter;