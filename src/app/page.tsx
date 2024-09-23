import { FC } from "react";

import { redirect } from "next/navigation";

import AuthButton from "@/components/auth/auth-button";

import { getTwitterSession } from "@/lib/utils/auth";

type PageProps = {};

const Page: FC<PageProps> = ({}) => {
  const twitterSession = getTwitterSession();

  if (twitterSession) return redirect("/upload");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <AuthButton />
    </main>
  );
};

export default Page;
