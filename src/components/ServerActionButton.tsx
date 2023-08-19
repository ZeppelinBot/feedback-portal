import { HTMLAttributes, HTMLProps, ReactElement, useState } from "react";
import { FormSubmit } from "./FormSubmit";

type ServerActionButtonProps = Omit<HTMLProps<HTMLFormElement>, "children"> & {
  $data?: any;
  children: (loading: boolean) => ReactElement;
};

export function ServerActionButton(props: ServerActionButtonProps) {
  const [loading, setLoading] = useState(false);
  const { children, $data, ...rest } = props;

  return (
    <form {...rest}>
      <input type="hidden" name="data" value={JSON.stringify($data)} />
      <FormSubmit
        onSubmit={() => setLoading(true)}
        afterSubmit={() => setLoading(false)}
      >
        {children(loading)}
      </FormSubmit>
    </form>
  );
}
