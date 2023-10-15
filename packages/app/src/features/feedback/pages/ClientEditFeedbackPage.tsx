"use client";

import { useState } from "react";
import { Button } from "../../../components/Button";
import { FormSubmit } from "../../../components/FormSubmit";
import { H1 } from "../../../components/H1";
import { Loader } from "../../../components/Loader";
import { TextWithLoading } from "../../../components/TextWithLoading";
import { VSpacer } from "../../../components/VSpacer";
import { ClientFeedbackPost } from "../entities/ClientFeedbackPost";
import { FeedbackFormFields } from "../components/FeedbackFormFields";
import { editFeedback } from "../actions/editFeedback";

export type ClientEditFeedbackPageProps = {
  post: ClientFeedbackPost;
};

export function ClientEditFeedbackPage(props: ClientEditFeedbackPageProps) {
  const [submitting, setSubmitting] = useState(false);

  return <>
    <H1>Edit feedback post</H1>
    <VSpacer size="6" />
    <form action={editFeedback}>
      <input type="hidden" name="post_id" value={props.post.id} />
      <FeedbackFormFields
        title={props.post.title}
        description={props.post.body}
      />
      <FormSubmit
        onSubmit={() => setSubmitting(true)}
        afterSubmit={() => setSubmitting(false)}
      >
        <Button $variant="primary">
          <TextWithLoading
            loading={submitting}
            component={<Loader />}
          >
            Save
          </TextWithLoading>
        </Button>
      </FormSubmit>
    </form>
  </>;
}
