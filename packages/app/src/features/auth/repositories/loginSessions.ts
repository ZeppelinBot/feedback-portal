import { v4 as uuidV4 } from "uuid";
import { dayjs } from "../../../utils/dayjs";
import { orm } from "../../../orm";
import { loginSessionDef } from "../entities/LoginSession";

const LOGIN_EXPIRY_DAYS = 30;

export const loginSessions = {
  async create(userId: string) {
    const id = uuidV4();
    const expiryDate = dayjs().add(LOGIN_EXPIRY_DAYS, "days").toDate();
    await orm.insert(loginSessionDef, {
      id,
      user_id: userId,
      expires_at: expiryDate,
      logged_in_at: new Date(),
    });
    return id;
  },

  getById(id: string) {
    return orm.getOne(loginSessionDef, qb => qb.where("id", "=", id));
  },

  async markAsExpired(id: string) {
    await orm.update(loginSessionDef, qb => qb.where("id", "=", id), { expires_at: new Date() });
  },
};
