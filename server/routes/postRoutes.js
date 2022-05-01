import express from "express";
import { postController } from "../controllers/index.js";
import { requireAuth } from "../middleware/index.js";

const postRouter = express.Router();

postRouter.get("/", postController.getAllPosts);
postRouter.get("/:id", postController.getPostDetail);
postRouter.post("/search", postController.searchPost);

postRouter.post("/",requireAuth, postController.createNewPost);
postRouter.put("/:id",requireAuth, postController.updatePost);
postRouter.delete("/:id",requireAuth, postController.deletePost);

postRouter.post("/search", postController.searchPostByTags); // newly added by Eric

export default postRouter;
