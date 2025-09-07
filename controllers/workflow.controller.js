import { serve } from "@upstash/workflow";
import Subscription from "../models/subscription.model.js";
import dayjs from "dayjs";

const REMINDERS = [7, 5, 2, 1];

export const sendReminders = serve({
  routeFunction: async (context) => {
    const { subscriptionId } = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);

    if (!subscription || subscription.status !== "active") return;

    const renewalDate = dayjs(subscription.renewalDate);

    if (renewalDate.isBefore(dayjs())) {
      console.log(
        `Renewal Date has passed for subscription ${subscriptionId}. stopping workflow`
      );
      return;
    }

    for (const daysbefore of REMINDERS) {
      const reminderDate = renewalDate.subtract(daysbefore, "day"); 
      if (reminderDate.isAfter(dayjs())) {
        await sleepUntilReminder(context, `Reminder ${daysbefore} days before`, reminderDate);
      }

      await triggerReminder(context, `Reminder ${daysbefore} days before`);
    }
  },
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", () => {
    return Subscription.findById(subscriptionId).populate({
      path: "user",
      select: "name email",
    });
  });
};

const sleepUntilReminder = async (context, label, date) => {
  console.log(`sleeping until ${label} reminder at ${date}`);
  await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label) => {
  return await context.run(label, () => {
    console.log(`Triggering ${label} reminder`);
  });
};
