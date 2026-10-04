import { DateTime, TimeSpan, PersianCalendar, ThaiBuddhistCalendar } from '@xobin/globalization';
import { TimeSpan as DirectTimeSpan } from '@xobin/globalization/time-span';
import { PersianCalendar as DirectPersianCalendar } from '@xobin/globalization/persian-calendar';
import { ThaiBuddhistCalendar as DirectThaiBuddhistCalendar } from '@xobin/globalization/thai-buddhist-calendar';
import { cultureData } from '@xobin/globalization/locales/fa-IR';

const span: TimeSpan = new DirectTimeSpan(1n);
const ticks: bigint = new DateTime(1n).ticks;
// @ts-expect-error numeric tick values are intentionally unsupported
new DateTime(1);
const calendar: PersianCalendar = new DirectPersianCalendar();
const thaiCalendar: ThaiBuddhistCalendar = new DirectThaiBuddhistCalendar();
const thaiEra: number = thaiCalendar.getEra(new DateTime(1n));
const thaiEras: number[] = thaiCalendar.eras;
const thaiDate: DateTime = thaiCalendar.toDateTime(2567, 1, 1, 0, 0, 0, 0, ThaiBuddhistCalendar.ThaiBuddhistEra);
export { span, calendar, ticks, thaiCalendar, thaiEra, thaiEras, thaiDate };
export const localeName: string = cultureData.name;
