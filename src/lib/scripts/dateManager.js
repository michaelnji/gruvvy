import { format, parseISO } from "date-fns";
import { isString } from "mathjs";

export function getReadableDate(date) {
	const formatConfig = " do MMM yyyy";
	return isString(date)
		? format(parseISO(date), formatConfig)
		: format(date, formatConfig);
}
export function getReadableDateShort(date) {
	const formatConfig = " dd/LL";
	return isString(date)
		? format(parseISO(date), formatConfig)
		: format(date, formatConfig);
}

export function getDayFromDate(date) {
	const formatConfig = "eeee LLL do";
	return isString(date)
		? format(parseISO(date), formatConfig)
		: format(date, formatConfig);
}
