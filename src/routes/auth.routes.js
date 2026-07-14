import { Router } from "express";
import { registerUserController, loginUserController } from "../controllers/auth.controller.js";
import errorMiddleware from "../middlewares/error.middleware.js";

const authRouter = Router();

authRouter.post("/register", errorMiddleware, registerUserController);
authRouter.post("/login", loginUserController);

export default authRouter;