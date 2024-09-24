import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { twitterClient } from "@/lib/twitter";

import { TWITTER_AUTH_REDIRECT_URL } from "@/helpers/twitter";

export const GET = async (req: NextRequest) => {
  const { origin } = req.nextUrl;

  const searchParams = req.nextUrl.searchParams;

  const code = searchParams.get("code")!;

  const codeVerifier = cookies().get("codeVerifier")?.value;

  if (!codeVerifier)
    return NextResponse.json(
      { error: "Code verifier not found" },
      { status: 400 }
    );

  try {
    const { accessToken } = await twitterClient.loginWithOAuth2({
      code,
      codeVerifier,
      redirectUri: TWITTER_AUTH_REDIRECT_URL,
    });

    const response = NextResponse.redirect(`${origin}/upload`, { status: 308 });

    response.cookies.delete("codeVerifier");
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
