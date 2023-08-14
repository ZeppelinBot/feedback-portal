import _dayjs from "dayjs";
import utcPlugin from "dayjs/plugin/utc";
import timezonePlugin from "dayjs/plugin/timezone";
import advancedFormatPlugin from "dayjs/plugin/advancedFormat";

_dayjs.extend(utcPlugin);
_dayjs.extend(timezonePlugin);
_dayjs.extend(advancedFormatPlugin);

export const dayjs = _dayjs;
