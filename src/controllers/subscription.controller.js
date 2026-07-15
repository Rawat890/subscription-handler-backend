
import Subscription from "../models/subscription.model.js";

export const createSubscriptionController = async (req, res, next) => {
 console.log("req.user:", req.user);
 console.log("req.body:", req.body);
 try {
  const subscription = await Subscription.create({
   ...req.body,
   user: req.user._id
  });

  res.status(200).json({
   success: true,
   data: subscription,
   message: "Subscription created successfully"
  })
 } catch (error) {
  console.log("Subscription creation error: ", error);
  next(error)
 }
}


export const getUserSubscriptionsController = async (req, res, next) => {
 try {
  if (req.user.id !== req.params.id) {
   return res.status(401).json({
    success: false,
    message: "Unauthorized to access this route"
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