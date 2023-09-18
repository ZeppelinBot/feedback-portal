"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { ButtonProps } from "./Button";
import { ReactNode, useEffect, useRef } from "react";

export type SubmitButtonProps = ButtonProps & {
  children: ReactNode;
  onSubmit?: () => void;
  afterSubmit?: () => void;
};

/**
 * NOTE: Needs to be nested within a <form> for useFormStatus() to work.
 * A logical place is around the submit button.
 */
export function FormSubmit(props: SubmitButtonProps) {
  const { pending } = useFormStatus();
  const prevPending = useRef(false);

  useEffect(() => {
    if (prevPending.current === pending) {
      // Initial call
      return;
    }

    if (prevPending.current === false) {
      props.onSubmit?.();
    } else {
      props.afterSubmit?.();
    }

    prevPending.current = pending;

    return () => {
      // The component might be removed while the form is submitting and so afterSubmit() never gets called
      // To fix this, call afterSubmit() is the form is pending when this component is removed
      if (prevPending.current) {
        props.afterSubmit?.();
      }
    };
  }, [pending]);

  return props.children;
}
