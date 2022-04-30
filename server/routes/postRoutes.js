import express from "express";
import { postController } from "../controllers/index.js";

const postRouter = express.Router();

postRouter.get("/", postController.getAllPosts);
postRouter.get("/:id", postController.getPostDetail);
postRouter.post("/search", postController.searchPost);

postRouter.post("/", postController.createNewPost);
postRouter.put("/:id", postController.updatePost);
postRouter.delete("/:id", postController.deletePost);

postRouter.post("/search", postController.searchPostByTags); // newly added by Eric

export default postRouter;
