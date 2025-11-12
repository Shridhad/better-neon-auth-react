import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: "https://ep-long-river-38106241.neonauth.localtest.me:30443/neondb/auth",
  plugins: [emailOTPClient()],
});

export const { signIn, signUp, signOut, useSession } = authClient;