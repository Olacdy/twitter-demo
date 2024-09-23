import { NextRequest } from "next/server";
import { redirect } from "next/navigation";

import { callbackListener } from "@/lib/twitter";

export const GET = async (req: NextRequest) => {
  return redirect(callbackListener.url);
};
