import "server-only";

import { IOAuth2RequestTokenResult, TwitterApi } from "twitter-api-v2";

import { TWITTER_AUTH_REDIRECT_URL } from "@/helpers/twitter";

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var cachedTwitterClient: TwitterApi;
  var cachedTwitterUploaderClient: TwitterApi;
  var cachedCallbackListener: IOAuth2RequestTokenResult;
}

export let twitterClient: TwitterApi;
export let twitterUploaderClient: TwitterApi;
export let callbackListener: IOAuth2RequestTokenResult;

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

  callbackListener = twitterClient.generateOAuth2AuthLink(
    TWITTER_AUTH_REDIRECT_URL,
    {
      scope: ["tweet.read", "tweet.write", "users.read"],
    }
  );
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

  if (!global.cachedCallbackListener && global.cachedTwitterClient)
    global.cachedCallbackListener =
      global.cachedTwitterClient.generateOAuth2AuthLink(
        TWITTER_AUTH_REDIRECT_URL,
        {
          scope: ["tweet.read", "tweet.write", "users.read"],
        }
      );

  twitterClient = global.cachedTwitterClient;
  twitterUploaderClient = global.cachedTwitterUploaderClient;
  callbackListener = global.cachedCallbackListener;
}
