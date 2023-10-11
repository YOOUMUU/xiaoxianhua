import User from '@models/user';
import { connectToDatabase } from '@utils/database';
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],

  // callbacks: {
  //   async session({ session, token, user }) {
  //     session.accessToken = token.accessToken;
  //     session.user.id = token.id;

  //     return session;
  //   },

  //   async signIn({ account, profile, user, credentials }) {
  //     try {
  //       await connectToDatabase();

  //       // check if user exists
  //       const userExists = await User.findOne({ email: profile.email });

  //       // if not, create user
  //       if (!userExists) {
  //         await User.create({
  //           email: profile.email,
  //           name: profile.name.replace(' ', '').toLowerCase(),
  //           image: profile.picture,
  //         });
  //       }

  //       return true;
  //     } catch (error) {
  //       console.log('Error checking if user exists: ', error.message);
  //       return false;
  //     }
  //   },
  // },
});

export { handler as GET, handler as POST };
