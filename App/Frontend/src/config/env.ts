import * as z from "zod";

const createEnv = () => {
  const EnvSchema = z.object({
    API_URL: z.string().url(),
  });

  const envVars = {
    API_URL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  };

  const parsedEnv = EnvSchema.safeParse(envVars);

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid environment variables:
${Object.entries(parsedEnv.error.flatten().fieldErrors)
  .map(([k, v]) => `- ${k}: ${v}`)
  .join("\n")}
            `,
    );
  }

  return parsedEnv.data;
};

export const env = createEnv();
