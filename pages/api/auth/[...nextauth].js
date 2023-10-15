import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import {login} from "../../../services/userServices";


export default NextAuth({

  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "email",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async(credentials) => {
        // database look up
        const {user , error} =await login(credentials?.username , credentials?.password);
        if (user) {
          return {
            ...user
          };
        }

        // login failed
        return null;
      },
    }),
  ],
  callbacks: {

    jwt: async ({ token, user }) => {
      if(user)
      {
        token.user = user.data.data
        token.id = user.headers['x-auth-token'];
      }
      // user && (token.user = user.data.data)
      token.id
      return token
    },
    session: async ({ session, token }) => {
      if (token.user) 
      {
        session.user = token.user
        session.id = token.id
      } 
      return session
    },
    async redirect() {
      return process.env.NEXTAUTH_URL
    }
  },
  secret: "test",
  jwt: {
    secret: "test",
  },
  pages: {
    signIn: '/signIn',
    signUp: '/SignUp'
  },
});