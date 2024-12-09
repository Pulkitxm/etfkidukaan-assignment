import { z } from "zod";

export const validateUser = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

export type USER = z.infer<typeof validateUser>;
