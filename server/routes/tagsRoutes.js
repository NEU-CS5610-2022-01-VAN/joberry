import express from "express";
import { tagController } from "../controllers/index.js";

const tagRouter = express.Router();

tagRouter.get("/", tagController.getAllTags);

tagRouter.post("/search", tagController.searchTag);

tagRouter.post("/", tagController.createNewTag);
tagRouter.put("/:id", tagController.updateTag);
tagRouter.delete("/:id", tagController.deleteTag);

export default tagRouter;
