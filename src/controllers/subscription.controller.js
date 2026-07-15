
import { workflowClient } from "../config/upstash.js";
import Subscription from "../models/subscription.model.js";
import { SERVER_URL } from "../config/config.js";

export const createSubscriptionController = async (req, res, next) => {
 console.log("req.user:", req.user);
 console.log("req.body:", req.body);
 try {
  const subscription = await Subscription.create({
   ...req.body,
   user: req.user._id
  });

  const { workflowRunId } = await workflowClient.trigger({
   url: `${SERVER_URL}/api/v1/workflows/subscriptions/reminder`,
   body: {
    subscriptionId: subscription.id
   },
   headers: {
    "Content-Type": "application/json"
   },
   retries: 0
  })

  console.log("Workflow run id -", workflowRunId)

  res.status(200).json({
   success: true,
   data: { subscription, workflowRunId },
   message: "Subscription created successfully"
  })
 } catch (error) {
  console.log("Subscription creation error: ", error);
  next(error)
 }
}


export const getUserSubscriptionsController = async (req, res, next) => {
 try {
  // check if the user is the same as the one in the token
  if (req.user.id !== req.params.id) {
   return res.status(401).json({
    success: false,
    message: "Unauthorized to access getUsersSubscription route"
   })
  }

  const subscriptions = await Subscription.find({ user: req.user._id });

  res.status(200).json({
   success: true,
   data: subscriptions,
   message: "Subscriptions fetched successfully"
  })
 } catch (error) {
  next(error);
 }
}