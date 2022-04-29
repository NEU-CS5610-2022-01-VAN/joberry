import express from "express";
import { userController } from "../controllers/index.js";
import { requireAuth } from "../middleware/index.js";

const userRouter = express.Router();

//current user
userRouter.post("/verify-user",requireAuth, userController.verifyUser);
userRouter.get("/profile", requireAuth, userController.getProfile);
userRouter.put("/profile", requireAuth, userController.updateProfile);
userRouter.delete("/account", requireAuth, userController.deleteAccount);

// other user
userRouter.get("/:id", userController.getUserInfo);

export default userRouter;
