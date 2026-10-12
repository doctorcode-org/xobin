import { Calendar, DateTime, TimeSpan, PersianCalendar, ThaiBuddhistCalendar, UmAlQuraCalendar } from '@xobin/globalization';
import { TimeSpan as DirectTimeSpan } from '@xobin/globalization/time-span';
import { PersianCalendar as DirectPersianCalendar } from '@xobin/globalization/persian-calendar';
import { ThaiBuddhistCalendar as DirectThaiBuddhistCalendar } from '@xobin/globalization/thai-buddhist-calendar';
import { UmAlQuraCalendar as DirectUmAlQuraCalendar } from '@xobin/globalization/um-al-qura-calendar';
import { cultureData } from '@xobin/globalization/locales/fa-IR';
import { DateTimeStyles } from '@xobin/globalization/date-time-styles';
import { DateTimeFormatInfo } from '@xobin/globalization/date-time-format-info';

const formatInfo: DateTimeFormatInfo = new DateTimeFormatInfo();
const formatClone: DateTimeFormatInfo = formatInfo.clone();
const readOnlyFormat: DateTimeFormatInfo = DateTimeFormatInfo.readOnly(formatInfo);
const resolvedFormat: DateTimeFormatInfo = DateTimeFormatInfo.getInstance({ getFormat: () => formatInfo });
void [formatClone, readOnlyFormat, resolvedFormat];
// @ts-expect-error locale metadata is not a member of the .NET format-info class
formatInfo.eraNames;
// @ts-expect-error locale pattern collections are not a public property
formatInfo.allDateTimePatterns;
// @ts-expect-error obsolete casing is not part of the class API
formatInfo.rfC1123Pattern;

const parsingStyles: DateTimeStyles = DateTimeStyles.AllowWhiteSpaces | DateTimeStyles.RoundtripKind;
void parsingStyles;

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

import { DateOnly } from '@xobin/globalization/date-only';
import { TimeOnly } from '@xobin/globalization/time-only';
import { CultureInfo, DateTimeKind } from '@xobin/globalization';
import { TypeCode } from '@xobin/core';
const dateOnly: DateOnly = new DateOnly(2024, 2, 29);
const timeOnly: TimeOnly = new TimeOnly(863999999999n);
const combined: DateTime = new DateTime(dateOnly, timeOnly, DateTimeKind.utc);
const dateAndTime: [DateOnly, TimeOnly] = combined.deconstruct();
const dateParts: [number, number, number] = combined.deconstruct('date');
const code: TypeCode = combined.getTypeCode();
const converted: DateTime = combined.toType(DateTime);
export { dateOnly, timeOnly, combined, dateAndTime, dateParts, code, converted };

// @ts-expect-error Gregorian locale metadata is not part of the CLR CultureInfo API.
CultureInfo.invariantCulture.gregorianDateTimeFormat;

import { ISOWeek as DirectISOWeek } from '@xobin/globalization/iso-week';
const isoWeek: number = DirectISOWeek.getWeekOfYear(new DateTime(2021, 1, 1));
const isoYear: number = DirectISOWeek.getYear(new DateOnly(2021, 1, 1));
const isoStart: DateTime = DirectISOWeek.getYearStart(2020);
void [isoWeek, isoYear, isoStart];
// @ts-expect-error ISOWeek is a static type in the reference API
new DirectISOWeek();

const isoDateTime: DateTime = DirectISOWeek.toDateTime(2020, 53, 0);
const isoDateOnly: DateOnly = DirectISOWeek.toDateOnly(2020, 53, 0);
void [isoDateTime, isoDateOnly];

const spanProduct: TimeSpan = span.multiply(0.5);
const spanQuotient: TimeSpan = span.divide(2);
const spanRatio: number = span.divide(new DirectTimeSpan(2n));
const spanHash: number = span.getHashCode();
const integerDays: TimeSpan = DirectTimeSpan.fromDays(1n);
const integerParts: TimeSpan = DirectTimeSpan.fromDays(1, 2, 3n, 4n, 5n, 6n);
const integerSeconds: TimeSpan = DirectTimeSpan.fromSeconds(101n, 832n);
const integerMicroseconds: TimeSpan = DirectTimeSpan.fromMicroseconds(1n);
const floatingMicroseconds: TimeSpan = DirectTimeSpan.fromMicroseconds(1.5);
const ticksPerDay: bigint = DirectTimeSpan.ticksPerDay;
void [spanProduct,spanQuotient,spanRatio,spanHash,integerDays,integerParts,integerSeconds,integerMicroseconds,floatingMicroseconds,ticksPerDay];

const onlyFromNumber: DateOnly = DateOnly.fromDayNumber(100);
const onlyFromDateTime: DateOnly = DateOnly.fromDateTime(combined);
const onlyDateParts: [number, number, number] = dateOnly.deconstruct();
const onlyComparison: number = dateOnly.compareTo(dateOnly);
const onlyObjectComparison: number = dateOnly.compareTo({});
const onlyNullComparison: number = dateOnly.compareTo(null);
const onlyEquality: boolean = dateOnly.equals(dateOnly);
const onlyObjectEquality: boolean = dateOnly.equals({});
const onlyHash: number = dateOnly.getHashCode();
const onlyPrimitive: number = dateOnly.valueOf();
const onlyAdjusted: DateOnly = dateOnly.addDays(1).addMonths(1).addYears(1);
const onlyCombined: DateTime = dateOnly.toDateTime(timeOnly);
const onlyCombinedKind: DateTime = dateOnly.toDateTime(timeOnly, DateTimeKind.utc);
void [onlyFromNumber,onlyFromDateTime,onlyDateParts,onlyComparison,onlyObjectComparison,onlyNullComparison,onlyEquality,onlyObjectEquality,onlyHash,onlyPrimitive,onlyAdjusted,onlyCombined,onlyCombinedKind];
// @ts-expect-error DateOnly requires the project's DateTimeKind enum wrapper.
dateOnly.toDateTime(timeOnly, 1);

import { OutParam } from '@xobin/core';
const wrappedDays: OutParam<number> = { result: 0 };
const adjustedTime: TimeOnly = timeOnly.add(new TimeSpan(1n), wrappedDays).addHours(-1.5, wrappedDays).addMinutes(90, wrappedDays);
const timeDifference: TimeSpan = timeOnly.subtract(adjustedTime);
const within: boolean = timeOnly.isBetween(TimeOnly.minValue, TimeOnly.maxValue);
const timeComparison: number = timeOnly.compareTo({});
const timeEquality: boolean = timeOnly.equals(null);
const timePrimitive: bigint = timeOnly.valueOf();
const timeHash: number = timeOnly.getHashCode();
const timeInterval: TimeSpan = timeOnly.toTimeSpan();
const restoredTime: TimeOnly = TimeOnly.fromTimeSpan(timeInterval);
const dateTimeTime: TimeOnly = TimeOnly.fromDateTime(combined);
const timeParts: OutParam<number>[] = Array.from({ length: 5 }, () => ({ result: 0 }));
timeOnly.deconstruct(timeParts[0]!, timeParts[1]!);
timeOnly.deconstruct(timeParts[0]!, timeParts[1]!, timeParts[2]!);
timeOnly.deconstruct(timeParts[0]!, timeParts[1]!, timeParts[2]!, timeParts[3]!);
timeOnly.deconstruct(timeParts[0]!, timeParts[1]!, timeParts[2]!, timeParts[3]!, timeParts[4]!);
void [adjustedTime,timeDifference,within,timeComparison,timeEquality,timePrimitive,timeHash,restoredTime,dateTimeTime];
// @ts-expect-error A wrapped-day output uses the existing OutParam contract.
timeOnly.addHours(1, 0);
// @ts-expect-error TimeOnly tick constructors require exact bigint ticks.
new TimeOnly(1);
