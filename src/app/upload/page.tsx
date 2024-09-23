import { FC } from "react";

import { redirect } from "next/navigation";

import UploadForm from "@/components/upload/upload-form";

import { getTwitterSession } from "@/lib/utils/auth";

type PageProps = {};

const Page: FC<PageProps> = ({}) => {
  const twitterSession = getTwitterSession();

  if (!twitterSession) return redirect("/");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <UploadForm />
    </main>
  );
};

export default Page;
