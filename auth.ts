import authServices from "@/services/auth.services";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ trigger, token, user }: any) {
      if (trigger == "signIn") {
        if (user) {
          token.id = user.id;
          token.jwt = user.jwt;
          token.username = user.username;
          token.email = user.email;
          token.firstName = user.firstName;
          token.lastName = user.lastName;
        }
      }
      return token;
    },
    async session({ session, token }: any) {
      console.log(token, "session");
      session.id = token.id;
      session.jwt = token.jwt;
      session.username = token.username;
      session.email = token.email;
      session.firstName = token.firstName;
      session.lastName = token.lastName;
      return session;
    },
  },
  providers: [
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
            console.log(user);

            return {
              id: user.user.id,
              jwt: user.jwt,
              username: user.user.username,
              email: user.user.email,
              firstName: user.user.first_name,
              lastName: user.user.last_name,
            };
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
