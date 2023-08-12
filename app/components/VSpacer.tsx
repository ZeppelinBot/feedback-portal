import { ds } from "../style/designSystem";

type SpacerProps = {
  size: keyof typeof ds.spacing;
};

export function VSpacer(props: SpacerProps) {
  return (
    <div style={{ height: ds.spacing[props.size] }}></div>
  );
}
