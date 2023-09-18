import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

type ClientTimeProps = {
  time: Dayjs;
  format: string;
};

export function ClientTime(props: ClientTimeProps) {
  const [clientTime, setClientTime] = useState(props.time);
  useEffect(() => {
    setClientTime(props.time.local());
  }, [props.time]);

  return <time dateTime={clientTime.format()} suppressHydrationWarning>{clientTime.format(props.format)}</time>;
}
