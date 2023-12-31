"use client";

import { useState } from "react";
import { Button } from "../../../components/Button";
import { FormSubmit } from "../../../components/FormSubmit";
import { H1 } from "../../../components/H1";
import { Loader } from "../../../components/Loader";
import { TextWithLoading } from "../../../components/TextWithLoading";
import { VSpacer } from "../../../components/VSpacer";
import { FeedbackFormFields } from "../components/FeedbackFormFields";
import { postFeedback } from "../actions/postFeedback";

export function ClientNewFeedbackPage() {
  const [submitting, setSubmitting] = useState(false);

  return <>
    <H1>New feedback post</H1>
    <VSpacer size="6" />
    <form action={postFeedback}>
      <FeedbackFormFields
        title=""
        description=""
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
            Post feedback
          </TextWithLoading>
        </Button>
      </FormSubmit>
    </form>
  </>;
}
