import { DateTime, TimeSpan, PersianCalendar } from '@xobin/globalization';
import { TimeSpan as DirectTimeSpan } from '@xobin/globalization/time-span';
import { PersianCalendar as DirectPersianCalendar } from '@xobin/globalization/persian-calendar';
import { cultureData } from '@xobin/globalization/locales/fa-IR';

const span: TimeSpan = new DirectTimeSpan(1n);
const ticks: bigint = new DateTime(1n).ticks;
// @ts-expect-error numeric tick values are intentionally unsupported
new DateTime(1);
const calendar: PersianCalendar = new DirectPersianCalendar();
export { span, calendar, ticks };
export const localeName: string = cultureData.name;
