"use client";

import { useState } from "react";
import { Button } from "../../../../src/components/Button";
import { FormSubmit } from "../../../../src/components/FormSubmit";
import { H1 } from "../../../../src/components/H1";
import { Loader } from "../../../../src/components/Loader";
import { TextWithLoading } from "../../../../src/components/TextWithLoading";
import { VSpacer } from "../../../../src/components/VSpacer";
import { ClientFeedbackPost } from "../../../../src/features/feedback/entities/ClientFeedbackPost";
import { FeedbackFormFields } from "../../FeedbackFormFields";
import { editFeedback } from "./editFeedback";

export type EditFeedbackPostClientPageProps = {
  post: ClientFeedbackPost;
};

export function EditFeedbackPostClientPage(props: EditFeedbackPostClientPageProps) {
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
