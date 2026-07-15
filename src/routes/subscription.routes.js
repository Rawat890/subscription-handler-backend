import { Router } from "express";
import { authorize } from "../middlewares/auth.middleware.js";
import { createSubscriptionController, getUserSubscriptionsController } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.post("/create-subscription", authorize, createSubscriptionController);
subscriptionRouter.post("/get-user-subscriptions/:id", authorize, getUserSubscriptionsController);
export default subscriptionRouter;