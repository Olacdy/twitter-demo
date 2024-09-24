"use server";

import { twitterClient } from "@/lib/twitter";

import { TWITTER_AUTH_REDIRECT_URL } from "@/helpers/twitter";

export async function getTwitterAuthLink() {
  const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(
    TWITTER_AUTH_REDIRECT_URL,
    {
      scope: ["tweet.read", "tweet.write", "users.read"],
    }
  );

  return { url, codeVerifier, state };
}
