import { z } from "zod";

export const LoginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z
    .string("Password must be string")
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export type TLoginPayload = z.infer<typeof LoginSchema>;
