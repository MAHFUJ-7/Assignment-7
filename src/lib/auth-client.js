import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "https://assignment-7-sage-six.vercel.app"
})

export const { signIn, signUp, signOut,updateUser,useSession } = authClient;
