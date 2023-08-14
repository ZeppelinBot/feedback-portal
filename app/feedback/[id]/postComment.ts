"use server";

import { z } from "zod";
import { auth } from "../../../src/features/auth/auth";
import { feedbackCommentDef } from "../../../src/features/feedback/entities/FeedbackComment";
import { orm } from "../../../src/orm";
import { zFormData } from "../../../src/utils/zFormData";
import { v4 as uuidV4 } from "uuid";
import { redirect } from "next/navigation";

const zData = zFormData(z.object({
  post_id: z.string(),
  body: z.string(),
}));

export async function postComment(rawData: FormData) {
  const session = await auth();
  if (! session?.user?.id) {
    throw new Error("Not logged in");
  }

  const data = zData.parse(rawData);
  await orm.create(feedbackCommentDef, {
    id: uuidV4(),
    post_id: data.post_id,
    body: data.body,
    author_id: session.user.id,
    posted_at: (new Date()).toISOString(),
  });

  redirect(`/feedback/${data.post_id}`);
}
