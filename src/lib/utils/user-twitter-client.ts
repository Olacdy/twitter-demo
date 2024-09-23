import { twitterUploaderClient } from "@/lib/twitter";

export class UserTwitterClient {
  constructor(private accessToken: string) {}

  async me(): Promise<{ id: string; name: string; username: string }> {
    const response = await fetch("https://api.twitter.com/2/users/me", {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch user");

    const { data } = await response.json();

    return data;
  }

  async tweet(text: string, mediaIds: string[] = []) {
    const response = await fetch("https://api.twitter.com/2/tweets", {
      cache: "no-cache",
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        ...(mediaIds.length && {
          media: {
            media_ids: mediaIds,
          },
        }),
      }),
    });

    if (!response.ok) throw new Error("Failed to tweet");

    const data = await response.json();

    return data;
  }

  async uploadMedia(file: File) {
    const { id } = await this.me();

    const buffer = Buffer.from(await file.arrayBuffer());

    const mediaId = await twitterUploaderClient.v1.uploadMedia(buffer, {
      mimeType: file.type,
      additionalOwners: [id],
    });

    return mediaId;
  }
}
