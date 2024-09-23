import { NextRequest, NextResponse } from "next/server";

import { callbackListener, twitterClient } from "@/lib/twitter";

import { TWITTER_AUTH_REDIRECT_URL } from "@/helpers/twitter";

export const GET = async (req: NextRequest) => {
  const { pathname, origin } = req.nextUrl;

  const searchParams = req.nextUrl.searchParams;

  const code = searchParams.get("code")!;

  try {
    const { accessToken } = await twitterClient.loginWithOAuth2({
      code,
      codeVerifier: callbackListener.codeVerifier,
      redirectUri: TWITTER_AUTH_REDIRECT_URL,
    });

    const response = NextResponse.redirect(`${origin}/upload`, { status: 308 });

    response.cookies.set("twitterAccessToken", accessToken);

    return response;
  } catch (error) {
    console.error("Error during OAuth callback:", error);

    return NextResponse.json(
      { error: "OAuth Authentication Failed" },
      { status: 401 }
    );
  }
};
