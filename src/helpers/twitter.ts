export const TWITTER_AUTH_REDIRECT_URL = `${
  process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000"
}/api/auth/twitter/callback`;
