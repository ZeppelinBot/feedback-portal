import { UpdateInput } from "@snadi/kysely";
import { orm } from "../../../orm";
import { userDef } from "../entities/User";
import { v4 as uuidV4 } from "uuid";
import { roles } from "../roles";

export const users = {
  getById(id: string) {
    return orm.getOne(userDef, qb => qb.where("id", "=", id));
  },

  getUserByDiscordId(discordId: string) {
    return orm.getOne(userDef, qb => qb.where("discord_id", "=", discordId));
  },

  async createUser(discordId: string, name: string, avatar: string | null) {
    const id = uuidV4();
    await orm.insert(userDef, {
      id,
      discord_id: discordId,
      name,
      avatar,
      role: roles.Enum.MEMBER,
    });
    return id;
  },

  async update(id: string, data: UpdateInput<typeof userDef>) {
    await orm.update(userDef, qb => qb.where("id", "=", id), data);
  },
};
