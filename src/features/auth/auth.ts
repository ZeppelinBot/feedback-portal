import NextAuth, { DefaultSession } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { REST } from "@discordjs/rest";
import { Routes, RESTGetCurrentUserGuildMemberResult } from "@discordjs/core/http-only";
import { env } from "@src/env";
import { customNextAuthAdapter } from "@src/features/auth/customNextAuthAdapter";

declare module "next-auth" {
  export interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

const provider = DiscordProvider({
  clientId: env.DISCORD_CLIENT_ID,
  clientSecret: env.DISCORD_CLIENT_SECRET,
});
provider.authorization = "https://discord.com/api/oauth2/authorize?scope=identify+guilds.members.read";

export const nextAuth = NextAuth({
  adapter: customNextAuthAdapter,
  pages: {
    error: "/errors/auth",
  },
  providers: [
    provider,
  ],
  secret: env.SECRET,
  callbacks: {
    async signIn({ account }) {
      if (! account?.access_token) {
        return false;
      }

      const rest = new REST({ version: "10", authPrefix: "Bearer" }).setToken(account.access_token);
      const guildMember = await rest.get(Routes.userGuildMember(env.AUTH_GUILD_ID)).catch(() => null) as RESTGetCurrentUserGuildMemberResult | null;
      if (! guildMember || ! guildMember.roles.includes(env.AUTH_ROLE_ID)) {
        console.log(guildMember?.user?.id, "does not have role", env.AUTH_ROLE_ID, "| all:", guildMember?.roles.join(" "));
        return false;
      }

      return true;
    },
    async session({ session, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
    },
  },
});

export const GET = nextAuth.handlers.GET.bind(nextAuth.handlers);
export const POST = nextAuth.handlers.POST.bind(nextAuth.handlers);
export const auth = nextAuth.auth.bind(nextAuth);
