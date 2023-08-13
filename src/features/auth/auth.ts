import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { REST } from "@discordjs/rest";
import { Routes, RESTGetCurrentUserGuildMemberResult } from "@discordjs/core/http-only";
import { env } from "@src/env";
import { customNextAuthAdapter } from "@src/features/auth/customNextAuthAdapter";

export const nextAuth = NextAuth({
  adapter: customNextAuthAdapter,
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      authorization: { params: { scope: "identify guilds.members.read" } },
    }),
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
        return false;
      }

      return true;
    },
  },
});

export const GET = nextAuth.handlers.GET.bind(nextAuth.handlers);
export const POST = nextAuth.handlers.POST.bind(nextAuth.handlers);
export const auth = nextAuth.auth.bind(nextAuth);
