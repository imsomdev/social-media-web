// Import required modules
import authServices from "@/services/auth.services";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Configure NextAuth
export const { handlers, signIn, signOut, auth } = NextAuth({
  // Use JWT strategy for sessions
  session: {
    strategy: "jwt",
  },
  // Define callbacks for JWT and session management
  callbacks: {
    jwt({ token, user }: any) {
      console.log(token, user, "jwt");
      if (user) {
        token.jwt = user.jwt;
      }
      return token;
    },
    session({ session, token }: any) {
      console.log(token, "session");
      session.jwt = token.jwt;
      return session;
    },
  },
  // Define providers for authentication
  providers: [
    // Custom credentials provider
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials: any) => {
        const data = {
          username: credentials.username,
          password: credentials.password,
        };

        try {
          const user: any = await authServices.login(data);
          console.log(user);
          if (user && user.jwt) {
            return { id: user.id, jwt: user.jwt }; // Return the user object along with the token
          } else {
            throw new Error("Invalid credentials");
          }
        } catch (error) {
          throw new Error("User not found.");
        }
      },
    }),
  ],
});
