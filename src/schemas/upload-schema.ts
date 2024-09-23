import { z } from "zod";

export const uploadSchema = z.object({
  text: z.string(),
  file: typeof window === "undefined" ? z.any() : z.instanceof(FileList),
});
