import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://ep-damp-flower-w4j0yrjv-pooler.neonauth.c-2.us-east-2.aws.neon.build/neondb/auth",
});

export const { signIn, signUp, signOut, useSession } = authClient;
