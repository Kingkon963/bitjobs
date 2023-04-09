/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import NextAuth, { User } from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../../../server/auth";
import { type GoogleProfile } from "next-auth/providers/google";
import { type OAuthUserConfig } from "next-auth/providers";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Do whatever you want here, before the request is passed down to `NextAuth`
  if (req.query.nextauth?.includes("signin")) {
    const userRole = req.query.userRole as string;
    authOptions.providers.forEach((provider) => {
      if (provider.id === "google") {
        console.log(
          "🚀 ~ file: [...nextauth].ts:12 ~ auth ~ userRole:",
          userRole
        );
        (provider as OAuthUserConfig<GoogleProfile>).profile = (profile) => {
          return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            image: profile.picture,
            role: userRole,
          } as Awaited<User>;
        };
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await NextAuth(req, res, {
    ...authOptions,
  });
}
