import { Calendar, DateTime, TimeSpan, PersianCalendar, ThaiBuddhistCalendar, UmAlQuraCalendar } from '@xobin/globalization';
import { TimeSpan as DirectTimeSpan } from '@xobin/globalization/time-span';
import { PersianCalendar as DirectPersianCalendar } from '@xobin/globalization/persian-calendar';
import { ThaiBuddhistCalendar as DirectThaiBuddhistCalendar } from '@xobin/globalization/thai-buddhist-calendar';
import { UmAlQuraCalendar as DirectUmAlQuraCalendar } from '@xobin/globalization/um-al-qura-calendar';
import { cultureData } from '@xobin/globalization/locales/fa-IR';

const span: TimeSpan = new DirectTimeSpan(1n);
const ticks: bigint = new DateTime(1n).ticks;
// @ts-expect-error numeric tick values are intentionally unsupported
new DateTime(1);
const calendar: PersianCalendar = new DirectPersianCalendar();
const persianEra: number = calendar.getEra(new DateTime(638464896000000000n));
const persianEras: number[] = calendar.eras;
const persianDate: DateTime = calendar.toDateTime(1403, 1, 1, 0, 0, 0, 0, PersianCalendar.PersianEra);
const thaiCalendar: ThaiBuddhistCalendar = new DirectThaiBuddhistCalendar();
const thaiEra: number = thaiCalendar.getEra(new DateTime(1n));
const thaiEras: number[] = thaiCalendar.eras;
const thaiDate: DateTime = thaiCalendar.toDateTime(2567, 1, 1, 0, 0, 0, 0, ThaiBuddhistCalendar.ThaiBuddhistEra);
const umAlQuraCalendar: UmAlQuraCalendar = new DirectUmAlQuraCalendar();
const umAlQuraEra: number = umAlQuraCalendar.getEra(new DateTime(2024, 3, 20));
const umAlQuraEras: number[] = umAlQuraCalendar.eras;
const umAlQuraDate: DateTime = umAlQuraCalendar.toDateTime(1445, 9, 10, 0, 0, 0, 0, UmAlQuraCalendar.UmAlQuraEra);
const readOnlyPersian: PersianCalendar = Calendar.readOnly(calendar);
const clonedPersian: PersianCalendar = readOnlyPersian.clone();
const readOnlyFlag: boolean = readOnlyPersian.isReadOnly;
export { span, calendar, ticks, persianEra, persianEras, persianDate, thaiCalendar, thaiEra, thaiEras, thaiDate,
  umAlQuraCalendar, umAlQuraEra, umAlQuraEras, umAlQuraDate, readOnlyPersian, clonedPersian, readOnlyFlag };
export const localeName: string = cultureData.name;
