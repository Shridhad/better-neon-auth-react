import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://ep-steep-heart-74438120.neonauth.localtest.me:30443/neondb/auth",
});

export const { signIn, signUp, signOut, useSession } = authClient;
