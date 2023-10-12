import User from '@models/user';
import { connectToDatabase } from '@utils/database';
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    // Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async session({ session, token, user }) {
      const sessionUser = await User.findOne({ id: user.id });
      session.user.id = sessionUser._id.toString();

      return session;
    },

    async signIn({ profile, user }) {
      try {
        await connectToDatabase();

        // check if user exists
        const userExists = await User.findOne({ id: user.id });

        console.log(user);
        // if not, create user
        if (!userExists) {
          await User.create({
            id: user.id,
            username: user.name?.replace(' ', '').toLowerCase(),
            image: user.image,
          });
        }

        return true;
      } catch (error: any) {
        console.log('Error checking if user exists: ', error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
