import User from '@models/user';
import { connectToDatabase } from '@utils/database';
import bcrypt from 'bcryptjs';
import NextAuth, { AuthOptions, DefaultSession, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  providers: [
    // Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
    // GitHub({
    //   clientId: process.env.GITHUB_CLIENT_ID!,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    // }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {},

      async authorize(credentials: any) {
        const { email, password } = credentials;

        try {
          await connectToDatabase();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: '/login',
  },

  callbacks: {
    async session({ session }: { session: Session & DefaultSession }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
  },

  // callbacks: {
  //   async session({ session, token, user }) {
  //     const sessionUser = await User.findOne({ id: user.id });
  //     session.user.id = sessionUser._id.toString();

  //     return session;
  //   },

  //   async signIn({ profile, user }) {
  //     try {
  //       await connectToDatabase();

  //       // check if user exists
  //       const userExists = await User.findOne({ id: user.id });

  //       console.log(user);
  //       // if not, create user
  //       if (!userExists) {
  //         await User.create({
  //           id: user.id,
  //           username: user.name?.replace(' ', '').toLowerCase(),
  //           image: user.image,
  //         });
  //       }

  //       return true;
  //     } catch (error: any) {
  //       console.log('Error checking if user exists: ', error.message);
  //       return false;
  //     }
  //   },
  // },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
