import humanizeDuration, { Humanizer } from "humanize-duration";

const defaultHumanizer = humanizeDuration.humanizer({
  language: "en",
  largest: 1,
  round: true,
});

type ClientTimeProps = {
  time: Date;
  humanizer?: Humanizer;
};

export function HumanizedTime(props: ClientTimeProps) {
  const humanized = (props.humanizer ?? defaultHumanizer)(Date.now() - props.time.valueOf());
  return <time dateTime={props.time.toISOString()} suppressHydrationWarning>{humanized}</time>;
}
