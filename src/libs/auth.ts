// import { NextAuthOptions } from "next-auth";
// import { SanityAdapter, SanityCredentials } from "next-auth-sanity";
// import GoogleProvider from "next-auth/providers/google";

// import sanityClient from "./sanity";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//     SanityCredentials(sanityClient),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   adapter: SanityAdapter(sanityClient),
//   debug: process.env.NODE_ENV === "development",
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
//     session: async ({ session, token }) => {
//       const userEmail = token.email;
//       const userIdObj = await sanityClient.fetch<{ _id: string }>(
//         `*[_type == "user" && email == $email][0] {
//             _id
//         }`,
//         { email: userEmail }
//       );
//       return {
//         ...session,
//         user: {
//           ...session.user,
//           id: userIdObj._id,
//         },
//       };
//     },
//   },
// };

// libs/auth.ts
import { NextAuthOptions } from "next-auth";
import { SanityAdapter, SanityCredentials } from "next-auth-sanity";
import GoogleProvider from "next-auth/providers/google";
import sanityClient from "./sanity";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    SanityCredentials(sanityClient),
  ],
  session: {
    strategy: "jwt",
  },
  adapter: SanityAdapter(sanityClient),
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // ✅ Safe session callback
    session: async ({ session, token }) => {
      // If no token/email (i.e., user not logged in), return session as-is
      if (!token?.email) {
        return session;
      }

      try {
        const userEmail = token.email;

        // Fetch user ID from Sanity
        const userIdObj = await sanityClient.fetch<{ _id: string }>(
          `*[_type == "user" && email == $email][0]{_id}`,
          { email: userEmail }
        );

        return {
          ...session,
          user: {
            ...session.user,
            id: userIdObj?._id, // optional chaining to avoid crash
          },
        };
      } catch (err) {
        console.error("Error fetching user ID in session callback:", err);
        return session; // fallback to basic session
      }
    },
  },
};
