import NextAuth, { type NextAuthOptions, type User } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creds) {
        if (creds?.email && creds.password) {
          // Simple demo authentication
          if (creds.email === "demo@example.com" && creds.password === "password") {
            return { 
              id: "1", 
              name: "Demo User", 
              email: String(creds.email) 
            } as User;
          }
        }
        return null;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET || "fallback-secret-for-development",
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        const u = session.user as { id?: string; name?: string | null; email?: string | null; image?: string | null };
        u.id = String((token as Record<string, unknown>).id ?? "");
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
