import { Router } from "express";
import { getUsersController, getUserController } from "../controllers/user.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get('/', getUsersController);
userRouter.get('/:id', authorize, getUserController);
export default userRouter;