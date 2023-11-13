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
  const diff = Date.now() - props.time.valueOf();
  const humanized = (props.humanizer ?? defaultHumanizer)(diff);
  const str = diff > 0 ? `${humanized} ago` : `in ${humanized}`;
  return <time dateTime={props.time.toISOString()} title={props.time.toISOString()} suppressHydrationWarning>{str}</time>;
}
