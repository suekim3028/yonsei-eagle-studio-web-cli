import webpush from "web-push";

import { NextRequest } from "next/server";

webpush.setVapidDetails(
  "mailto:example@yourdomain.org",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  process.env.NEXT_PUBLIC_VAPID_PRIVATE_KEY
);

export const POST = async ({ nextUrl: { searchParams } }: NextRequest) => {
  const subscriptionJSON = searchParams.get("subscription");

  if (!subscriptionJSON) return;
  const subscription = JSON.parse(subscriptionJSON);

  if (isPushSubscription(subscription)) {
    webpush.sendNotification(subscription, "사진이 완성되었어요!");
  }
  return;
};

const isPushSubscription = (
  subscription: any
): subscription is webpush.PushSubscription => {
  return (
    typeof subscription === "object" &&
    "endpoint" in subscription &&
    typeof subscription.endpoint === "string" &&
    "keys" in subscription &&
    typeof subscription.keys === "object" &&
    "p256dh" in subscription.keys &&
    typeof subscription.keys.p256dh === "string" &&
    "auth" in subscription.keys &&
    typeof subscription.keys.auth === "string"
  );
};
