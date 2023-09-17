import { RelationsToLoad } from "@snadi/core";
import { orm } from "../../orm";
import { userDef } from "./entities/User";

export const users = {
  getById<R extends RelationsToLoad | undefined>(id: string, relations?: R) {
    return orm.getOne(
      userDef,
      qb => qb.where("id", "=", id),
      relations,
    );
  },
};
