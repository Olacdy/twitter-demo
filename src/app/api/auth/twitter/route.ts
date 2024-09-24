import { NextRequest, NextResponse } from "next/server";

import { twitterClient } from "@/lib/twitter";

import { TWITTER_AUTH_REDIRECT_URL } from "@/helpers/twitter";

export const GET = async (req: NextRequest) => {
  const { url, codeVerifier } = twitterClient.generateOAuth2AuthLink(
    TWITTER_AUTH_REDIRECT_URL,
    {
      scope: ["tweet.read", "tweet.write", "users.read"],
    }
  );

  const response = NextResponse.redirect(url, { status: 308 });

  response.cookies.set("codeVerifier", codeVerifier);

  return response;
};
