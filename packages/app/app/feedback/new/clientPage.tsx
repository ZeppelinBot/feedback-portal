"use client";

import { useState } from "react";
import { styled } from "styled-components";
import { Button } from "../../../src/components/Button";
import { FormSubmit } from "../../../src/components/FormSubmit";
import { H1 } from "../../../src/components/H1";
import { Loader } from "../../../src/components/Loader";
import { TextWithLoading } from "../../../src/components/TextWithLoading";
import { VSpacer } from "../../../src/components/VSpacer";
import { FeedbackFormFields } from "../FeedbackFormFields";
import { postFeedback } from "./postFeedback";

export default function NewFeedbackClientPage() {
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
