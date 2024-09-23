import { cookies } from "next/headers";

export function getTwitterSession() {
  const accessToken = cookies().get("twitterAccessToken")?.value;

  if (!accessToken) return null;

  return { accessToken };
}
