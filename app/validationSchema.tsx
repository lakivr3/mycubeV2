import { z } from "zod";

export const reviewSchema = z.object({
  description: z.string().min(1, "Description is required").max(65535),
  grade: z.string().min(1, "Description is required").max(65535),
  image: z.string().min(1, "Description is required").max(65535),
  user: z.string().min(1, "Description is required").max(65535),
});
