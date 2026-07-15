//responsible for sending the reminders to users about subscriptions

import { serve } from "@upstash/workflow/express";
import Subscription from "../models/subscription.model.js";
import dayjs from "dayjs";

const REMINDERS = [7, 5, 2, 1];

export const sendRemindersController = serve(async (context) => {
 // 👇 Access context properties
 const { subscriptionId } = context.requestPayload;
 const subscription = await fetchSubscription(context, subscriptionId);

 if (!subscription || subscription.status !== 'active') {
  return;
 }

 const renewalDate = dayjs(subscription.renewalDate);
 const today = dayjs();

 if (renewalDate.isBefore(dayjs())) { //checks if the renewal date has passed
  console.log(`Renewal date has passed for subscription - ${subscriptionId}. Stopping workflow`);
  return;
 }

 for (const daysBefore of REMINDERS) {
  const reminderDate = renewalDate.subtract(daysBefore, 'day');

  if (reminderDate.isAfter(dayjs())) {
   await sleepUntilReminder(context, `reminder-${daysBefore} days before`, reminderDate);
  }
  await triggerReminder(context, `Reminder ${daysBefore} days before`);
 }
})

const fetchSubscription = async (context, subscriptionId) => {
 return await context.run('get subscription', async() => {
  return await Subscription.findById(subscriptionId).populate('user', 'name email');
 })
}

const sleepUntilReminder = async (context, label, date) => {
 console.log(`Sleep until ${label}, reminder at ${date}`);
 await context.sleepUntil(label, date.toDate());
}

const triggerReminder = async (context, label) => {
 console.log(`Triggering reminder for subscription - ${label}`);
 //send email, sms , notification
}