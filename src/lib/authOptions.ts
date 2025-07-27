import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./mongodb";
import { connectMongo } from "./mongodb";
import User, { IUser } from "@/models/User";
import { compare } from "bcryptjs";
import { JWT } from "next-auth/jwt";

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise),

  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Email ve Şifre",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Şifre", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("E-posta ve şifre gerekli");
        }

        await connectMongo();

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("Bu e-posta adresi ile kullanıcı bulunamadı");
        }

        const isValidPassword = await compare(
          credentials.password,
          user.password
        );

        if (!isValidPassword) {
          throw new Error("Şifre yanlış");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          gender: user.gender,
          birthDate: user.birthDate.toISOString(),
        };
      },
    }),
  ],

  pages: {
    signIn: "/signin",
  },

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // İlk giriş yaparken user bilgilerini token'a ekle
      if (user) {
        const customUser = user as IUser & {
          gender?: string;
          birthDate?: string;
        };
        token.id = customUser.id;
        token.email = customUser.email;
        token.name = customUser.name;
        token.gender = customUser.gender;
        token.birthDate = customUser.birthDate;
      }

      // Eğer bir update tetiklenmişse (örneğin update() fonksiyonu kullanıldıysa)
      if (trigger === "update" && session) {
        token.name = session.name;
        token.email = session.email;
        token.birthDate = session.birthDate;
      }

      return token;
    },

    async session({ session, token }: { session: any; token: JWT }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.gender = token.gender;
        session.user.birthDate = token.birthDate;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
