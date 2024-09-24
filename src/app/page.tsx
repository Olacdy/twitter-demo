import { FC } from "react";

import { redirect } from "next/navigation";

import AuthButton from "@/components/auth/auth-button";

import { getTwitterAuthLink } from "@/server/get-twitter-auth-link";

import { getTwitterSession } from "@/lib/utils/auth";

type PageProps = {};

const Page: FC<PageProps> = async ({}) => {
  const twitterSession = getTwitterSession();

  if (twitterSession) return redirect("/upload");

  const { url, codeVerifier } = await getTwitterAuthLink();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <AuthButton authLink={url} codeVerifier={codeVerifier} />
    </main>
  );
};

export default Page;
