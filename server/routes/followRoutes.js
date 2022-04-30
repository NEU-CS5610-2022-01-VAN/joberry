import express from "express";
import { followController } from "../controllers/index.js";

const followRouter = express.Router();

followRouter.post("/", followController.createNewFollowing);
followRouter.delete("/:id", followController.deleteFollowing);

export default followRouter;