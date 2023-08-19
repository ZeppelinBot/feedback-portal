import type { Adapter, AdapterSession, AdapterUser, VerificationToken as AdapterVerificationToken } from "@auth/core/adapters";
import { v4 as uuidV4 } from "uuid";
import { orm } from "../../orm";
import { accountDef, accountUser } from "./entities/Account";
import { Session, sessionDef, sessionUser } from "./entities/Session";
import { User, userDef } from "./entities/User";
import { verificationTokenDef } from "./entities/VerificationToken";
import { defaultRole } from "./roles";

function userToAdapterUser(user: User): AdapterUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    emailVerified: user.email_verified,
    image: user.image,
  };
}

function sessionToAdapterSession(session: Session): AdapterSession {
  return {
    userId: session.user_id,
    expires: session.expires,
    sessionToken: session.session_token,
  };
}

export const customNextAuthAdapter: Adapter = {
  async createUser(data): Promise<AdapterUser> {
    const user = await orm.create(userDef, {
      id: uuidV4(),
      name: data.name,
      email: data.email,
      email_verified: data.emailVerified,
      image: data.image,
      role: defaultRole,
    });

    return userToAdapterUser(user);
  },

  async getUser(id) {
    const user = await orm.getOne(userDef, qb => qb.where("id", "=", id));
    return user ? userToAdapterUser(user) : null;
  },

  async getUserByEmail(email) {
    const user = await orm.getOne(userDef, qb => qb.where("email", "=", email));
    return user ? userToAdapterUser(user) : null;
  },

  async getUserByAccount({ provider, providerAccountId }) {
    const account = await orm.getOne(accountDef, qb => qb.where("provider", "=", provider).where("provider_account_id", "=", providerAccountId), {
      user: accountUser()(orm),
    });
    return account?.user ? userToAdapterUser(account.user) : null;
  },

  async updateUser(data) {
    await orm.update(
      userDef,
      qb => qb.where("id", "=", data.id!),
      {
        name: data.name,
        email: data.email,
        email_verified: data.emailVerified,
        image: data.image,
      },
    );

    const user = await orm.getOne(userDef, qb => qb.where("id", "=", data.id!));
    if (! user) {
      throw new Error("User not found");
    }

    return userToAdapterUser(user);
  },

  async deleteUser(id) {
    await orm.delete(userDef, qb => qb.where("id", "=", id));
  },

  async linkAccount(data) {
    const user = await orm.getOne(userDef, qb => qb.where("id", "=", data.userId));
    if (! user) {
      throw new Error("User not found");
    }

    await orm.create(accountDef, {
      id: uuidV4(),
      user_id: data.userId,
      type: data.type,
      provider: data.provider,
      provider_account_id: data.providerAccountId,
      refresh_token: data.refresh_token,
      access_token: data.access_token,
      expires_at: data.expires_at,
      token_type: data.token_type,
      scope: data.scope,
      id_token: data.id_token,
      session_state: data.session_state,
    });
  },

  async unlinkAccount({ provider, providerAccountId }) {
    const account = await orm.getOne(accountDef, qb => qb.where("provider", "=", provider).where("provider_account_id", "=", providerAccountId));
    if (! account) {
      throw new Error("Account not found");
    }

    await orm.qb(accountDef)
      .where("id", account.id)
      .delete();
  },

  async getSessionAndUser(sessionToken) {
    const session = await orm.getOne(sessionDef, qb => qb.where("session_token", "=", sessionToken), {
      user: sessionUser()(orm),
    });
    if (! session?.user) {
      return null;
    }

    return {
      session: sessionToAdapterSession(session),
      user: userToAdapterUser(session.user),
    };
  },

  async createSession(data) {
    const user = await orm.getOne(userDef, qb => qb.where("id", "=", data.userId));
    if (! user) {
      throw new Error("User not found");
    }

    const session = await orm.create(sessionDef, {
      id: uuidV4(),
      user_id: data.userId,
      expires: data.expires,
      session_token: data.sessionToken,
    });

    return sessionToAdapterSession(session);
  },

  async updateSession(data) {
    await orm.update(
      sessionDef,
      qb => qb.where("session_token", "=", data.sessionToken),
      {
        user_id: data.userId,
        expires: data.expires,
      },
    );

    const session = await orm.getOne(sessionDef, qb => qb.where("session_token", "=", data.sessionToken));
    if (! session) {
      throw new Error("Session not found");
    }

    return sessionToAdapterSession(session);
  },

  async deleteSession(sessionToken) {
    await orm.delete(sessionDef, qb => qb.where("session_token", "=", sessionToken));
  },

  async createVerificationToken(data): Promise<AdapterVerificationToken> {
    const token = await orm.create(verificationTokenDef, {
      token: data.token,
      expires: data.expires,
      identifier: data.identifier,
    });

    return token;
  },

  async useVerificationToken(params): Promise<AdapterVerificationToken | null> {
    const token = await orm.getOne(verificationTokenDef, qb => qb.where("token", "=", params.token).where("identifier", "=", params.identifier));
    if (! token) {
      return null;
    }

    await orm.delete(verificationTokenDef, qb => qb.where("token", "=", token.token));

    return token;
  },
};
