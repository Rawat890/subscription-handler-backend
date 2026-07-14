
import Subscription from "../models/subscription.model.js";

export const createSubscriptionController = async (req, res, next) => {
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
  console.log("Subscription creation error: ",error);
  next(error)
 }
}


export const getUserSubscriptionsController = async (req, res, next) =>{
 
}