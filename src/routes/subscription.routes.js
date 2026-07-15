import { Router } from "express";
import { authorize } from "../middlewares/auth.middleware.js";
import { createSubscriptionController, getUserSubscriptionsController } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.post("/", authorize, createSubscriptionController);
subscriptionRouter.get("/user/:id", authorize, getUserSubscriptionsController);

subscriptionRouter.get("/", (req, res)=> res.send({title: "GET all subscriptions"}))
subscriptionRouter.put("/:id", (req, res)=> res.send({title: "UPDATE subscription"}))
subscriptionRouter.put("/:id/cancel", (req, res)=> res.send({title: "CANCEL subscription"}))
subscriptionRouter.get("/upcoming-renewals", (req, res)=> res.send({title: "GET Upcoming renewals subscriptions"}))

export default subscriptionRouter;