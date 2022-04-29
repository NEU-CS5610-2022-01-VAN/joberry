import express from "express";
import { postController } from "../controllers/index.js";
import {requireAuth} from "../middleware/index.js";

const postRouter = express.Router();

postRouter.get("/posts", (req, res) => postController.getAllPosts);
postRouter.get("/posts/:id", postController.getPostDetail);
postRouter.post("/posts-search", postController.searchPost);

postRouter.post("/posts", requireAuth, postController.createNewPost);
postRouter.put("/posts/:id", requireAuth, postController.updatePost);
postRouter.delete("/posts/:id", requireAuth, postController.deletePost);

export default postRouter;
