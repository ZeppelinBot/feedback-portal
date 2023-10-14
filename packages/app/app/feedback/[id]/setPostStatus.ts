"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "../../../src/features/auth/auth";
import { feedbackStatus } from "../../../src/features/feedback/feedbackStatus";
import { roles } from "../../../src/features/auth/roles";
import { users } from "../../../src/features/auth/users";
import { feedbackPosts } from "../../../src/features/feedback/repositories/feedbackPosts";

const zData = z.object({
  post_id: z.string().uuid(),
  status: feedbackStatus,
});

export async function setPostStatus(fd: FormData) {
  const session = await auth();
  if (! session) {
    throw new Error("Not logged in");
  }

  const data = zData.parse({
    post_id: fd.get("post_id"),
    status: fd.get("status"),
  });

  const post = await feedbackPosts.getById(data.post_id);
  if (! post) {
    throw new Error("Post not found");
  }

  const user = await users.getById(session.user.id);
  if (user!.role !== roles.Enum.ADMIN) {
    throw new Error("Unauthorized");
  }

  await feedbackPosts.updateById(post.id, {
    status: data.status,
  });

  redirect(`/feedback/${post.id}`);
}
