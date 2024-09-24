import "server-only";

import { TwitterApi } from "twitter-api-v2";

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var cachedTwitterClient: TwitterApi;
  var cachedTwitterUploaderClient: TwitterApi;
}

export let twitterClient: TwitterApi;
export let twitterUploaderClient: TwitterApi;

if (process.env.NODE_ENV === "production") {
  twitterClient = new TwitterApi({
    clientId: process.env.X_CLIENT_ID!,
    clientSecret: process.env.X_CLIENT_SECRET!,
  });

  twitterUploaderClient = new TwitterApi({
    appKey: process.env.X_APP_KEY!,
    appSecret: process.env.X_APP_SECRET!,
    accessToken: process.env.X_ACCESS_TOKEN!,
    accessSecret: process.env.X_ACCESS_SECRET!,
  });
} else {
  if (!global.cachedTwitterClient)
    global.cachedTwitterClient = new TwitterApi({
      clientId: process.env.X_CLIENT_ID!,
      clientSecret: process.env.X_CLIENT_SECRET!,
    });

  if (!global.cachedTwitterUploaderClient)
    global.cachedTwitterUploaderClient = new TwitterApi({
      appKey: process.env.X_APP_KEY!,
      appSecret: process.env.X_APP_SECRET!,
      accessToken: process.env.X_ACCESS_TOKEN!,
      accessSecret: process.env.X_ACCESS_SECRET!,
    });

  twitterClient = global.cachedTwitterClient;
  twitterUploaderClient = global.cachedTwitterUploaderClient;
}
