import { z } from "zod";

export const validateEmployee = z.object({
  name: z.string(),
  email: z.string().email(),
  pictureUrl: z.string().url(),
  phone: z.string(),
  jobTitle: z.string(),
  department: z.string(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
  }),
  workTime: z.record(z.string(), z.number()),
  hireDate: z.string(),
});

export type Employee = z.infer<typeof validateEmployee>;
