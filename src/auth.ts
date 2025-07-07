import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { login, registerGoogleAccount } from "./lib/actions/authActionServer";
import { getUserProfile } from "./lib/actions/userActionServer";

export class InvalidLoginError extends AuthError {
  constructor(public code: any, public details?: string) {
    super(details);
    this.code = code;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = credentials as any;

          const response: any = await login({
            email,
            password,
            typeAccount: "credentials",
          });

          if (!response?.status) {
            throw new InvalidLoginError(response?.code, response?.message);
          }

          return response?.result;
        } catch (error) {
          throw error;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }: any) {
      /**
       * TODO:
       * 1.
       *  1.1 Nếu là tài khoản credentials thì lấy accessToken từ user
       *  1.2 Nếu là tài khoản google thì lấy accessToken từ account
       *   1.2.1 Nếu là tài khoản google thì gọi api getUserProfile để kiểm tra tài khoản đã tồn tại hay chưa
       *   1.2.2 Nếu tài khoản chưa tồn tại thì gọi api registerGoogleAccount để tạo mới tài khoản
       * 2. Gọi api getUserProfile để lấy thông tin người dùng từ backend
       * 3. Gán thông tin người dùng vào token
       * 4. Trả về token
       */

      if (account?.provider === "credentials") {
        if (user?.accessToken) {
          token.accessToken = user?.accessToken;
        }
      } else if (account?.provider === "google") {
        if (account?.id_token) {
          token.accessToken = account?.id_token;
        }
      }

      if (account?.provider === "google") {
        const response = await getUserProfile({
          email: profile?.email,
          typeAccount: "google",
          accessToken: token.accessToken,
        });

        if (!response?.status) {
          await registerGoogleAccount({
            email: profile?.email,
            name: profile?.name,
            avatar: profile?.picture,
            typeAccount: "google",
            password: null,
          });
        }

        token.typeAccount = "google";
      } else if (account?.provider === "credentials") {
        token.typeAccount = "credentials";
      }

      const response = await getUserProfile({
        email: token?.email,
        typeAccount: account?.provider ?? token?.typeAccount,
        accessToken: token?.accessToken,
      });

      token.id = response?.result?.id;
      token.role = response?.result?.role;
      token.email = response?.result?.email;
      token.image = response?.result?.avatar;
      token.username = response?.result?.username;
      token.typeAccount = response?.result?.typeAccount;
      token.gender = response?.result?.gender;
      token.createdAt = response?.result?.createdAt;

      return token;
    },
    // nhận token từ jwt callback và trả về session
    async session({ session, token }: any) {
      session.user.id = token?.id ?? token?.sub;
      session.user.username = token.username;
      session.user.email = token.email;
      session.user.image = token.image;
      session.user.role = token.role;
      session.user.gender = token.gender;
      session.user.typeAccount = token.typeAccount;
      session.user.createdAt = token.createdAt;
      session.user.accessToken = token.accessToken;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
