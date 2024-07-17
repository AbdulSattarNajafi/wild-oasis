import NextAuth, { Account, Profile, Session, User } from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request }: { auth: any; request: any }) {
      return !!auth?.user;
    },
    async signIn({
      user,
      account,
      profile,
    }: {
      user: User;
      account: Account;
      profile: Profile;
    }) {
      try {
        const existedGuest = await getGuest(user?.email ?? "");

        if (!existedGuest) {
          await createGuest({ email: user.email, fullName: user.name });
        }

        return true;
      } catch {
        return false;
      }
    },
    async session({ session }: { session: Session }) {
      const guest = await getGuest(session?.user?.email ?? "");

      session.user.guestId = guest.id;

      return session;
    },
  },
};

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth(authConfig);
