import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import userSchema from "@/server/models/user.schema";
import { connectDatabase } from "@/server/config/mongodb";

export const authOptions = {
  // adapter: MongoDBAdapter(clientPromise),
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      await connectDatabase();
      const newUser = new userSchema({
        name: profile.name,
        email: profile.email,
        image: profile.picture,
        picture: profile.picture,
        rollNo: 0,
        phoneNumber: 0,
        userRights: ["regester"],
        provider: {
          google: profile,
        },
      });
      try {
        await newUser.save();
      } catch (err) {}
      return true;
    },
    async session({ session, token, user }) {
      if (session) {
        await connectDatabase();
        return {
          user: await userSchema.findOne({ email: session.user.email }),
        };
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
