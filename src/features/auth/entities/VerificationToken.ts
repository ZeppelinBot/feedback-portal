import { EntitySchema } from "@mikro-orm/core";
import { VerificationToken as AdapterVerificationToken } from "@auth/core/adapters";

export class VerificationToken implements AdapterVerificationToken {
  token!: string;

  expires!: Date;

  identifier!: string;
}

export const VerificationTokenSchema = new EntitySchema<VerificationToken>({
  class: VerificationToken,
  properties: {
    token: { type: String, primary: true },
    expires: { type: Date },
    identifier: { type: String },
  },
});
