import express from "express";
import { userController } from "../controllers/index.js";

const userRouter = express.Router();

//current user
userRouter.post("/verify-user",userController.verifyUser);
userRouter.get("/profile", userController.getProfile);
userRouter.put("/profile", userController.updateProfile);
userRouter.delete("/account", userController.deleteAccount);

// other user
userRouter.get("/:id", userController.getUserInfo);

export default userRouter;
