import { withSession } from "../../session/session";
import { getCurrentUser } from "../auth";

export const GET = withSession(async () => {
  const currentUser = await getCurrentUser();
  if (! currentUser) {
    return Response.json({ user: null });
  }
  return Response.json({
    user: {
      id: currentUser.id,
      discord_id: currentUser.discord_id,
      name: currentUser.name,
      avatar: currentUser.avatar,
    },
  });
});
