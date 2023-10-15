import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

const defaultOptions: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric" };

type ClientTimeProps = {
  time: Dayjs;
  options?: Intl.DateTimeFormatOptions;
};

export function ClientTime(props: ClientTimeProps) {
  const [formattedTime, setFormattedTime] = useState(props.time.toISOString());

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat(undefined, props.options ?? defaultOptions);
    setFormattedTime(formatter.format(props.time.local().toDate()));
  }, [props.time, props.options]);

  return <time dateTime={props.time.toISOString()} suppressHydrationWarning>{formattedTime}</time>;
}
