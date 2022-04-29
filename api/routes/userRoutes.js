import express from "express";
import { userController } from "../controllers/index.js";
import {requireAuth} from "../middleware/index.js";

const userRouter = express.Router();

// verify user status, if not registered in our database we will create it
userRouter.post("/verify-user",requireAuth, userController.verifyUser);
// get Profile information of authenticated user
userRouter.get("/profile", requireAuth, userController.getProfile);
// get user information
userRouter.get("/:id", requireAuth, userController.getUserInfo);

export default userRouter;