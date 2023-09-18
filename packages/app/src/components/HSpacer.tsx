import { ds } from "../features/style/designSystem";

type SpacerProps = {
  size: keyof typeof ds.spacing;
};

export function HSpacer(props: SpacerProps) {
  return (
    <div style={{ width: ds.spacing[props.size] }}></div>
  );
}
