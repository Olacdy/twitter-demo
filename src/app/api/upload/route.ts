import { NextRequest, NextResponse } from "next/server";

import { getTwitterSession } from "@/lib/utils/auth";
import { UserTwitterClient } from "@/lib/utils/user-twitter-client";

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();

  const twitterSession = getTwitterSession();

  if (!twitterSession) return NextResponse.redirect("/");

  const { accessToken } = twitterSession;

  const file = formData.get("file") as File;
  const text = formData.get("text") as string;

  if (!file)
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

  try {
    const userTwitterClient = new UserTwitterClient(accessToken);

    const mediaId = await userTwitterClient.uploadMedia(file);

    const tweetData = await userTwitterClient.tweet(text, [mediaId]);

    return NextResponse.json(tweetData, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Error uploading file" },
      { status: 400 }
    );
  }
};
