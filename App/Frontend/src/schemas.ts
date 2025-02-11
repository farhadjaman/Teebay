import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
  name: z.string().min(3).max(100),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
