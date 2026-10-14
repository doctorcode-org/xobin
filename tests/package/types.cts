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
import { DateTimeKind } from '@xobin/globalization';
const dateOnly: DateOnly = new DateOnly(2024, 2, 29);
const onlyComparison: number = dateOnly.compareTo({});
const onlyEquality: boolean = dateOnly.equals(null);
const onlyAdjusted: DateOnly = dateOnly.addDays(1).addMonths(-1).addYears(1);
const onlyDayNumber: number = DateOnly.fromDayNumber(100).valueOf();
void [onlyComparison,onlyEquality,onlyAdjusted,onlyDayNumber];
const timeOnly: TimeOnly = new TimeOnly(863999999999n);
const wrappedDays = { result: 0 };
const adjustedTime: TimeOnly = timeOnly.addHours(1, wrappedDays).addMinutes(-60, wrappedDays).add(new TimeSpan(1n), wrappedDays);
const timeDifference: TimeSpan = timeOnly.subtract(adjustedTime);
const timePrimitive: bigint = timeOnly.valueOf();
const timeComparison: number = timeOnly.compareTo(null);
void [adjustedTime,timeDifference,timePrimitive,timeComparison];
const combined: DateTime = new DateTime(dateOnly, timeOnly, DateTimeKind.utc);
export { dateOnly, timeOnly, combined };

import { ISOWeek as DirectISOWeek } from '@xobin/globalization/iso-week';
const isoWeeks: number = DirectISOWeek.getWeeksInYear(2020);
void isoWeeks;

const isoConverted: DateTime = DirectISOWeek.toDateTime(2020, 53, 0);
void isoConverted;

const integerSpan: TimeSpan = DirectTimeSpan.fromDays(1, 2, 3n);
const floatingSpan: TimeSpan = DirectTimeSpan.fromMicroseconds(1.5);
const multipliedSpan: TimeSpan = integerSpan.multiply(0.5);
const ratio: number = integerSpan.divide(floatingSpan);
const tickScale: bigint = DirectTimeSpan.ticksPerMicrosecond;
void [integerSpan,floatingSpan,multipliedSpan,ratio,tickScale];

// DateOnly and TimeOnly expose the reference's formatting overloads and helpers.
import { DateOnly as FormatDateOnly } from '@xobin/globalization/date-only';
import { TimeOnly as FormatTimeOnly } from '@xobin/globalization/time-only';
const formatDate: FormatDateOnly = new FormatDateOnly(2024, 2, 29);
const formatTime: FormatTimeOnly = new FormatTimeOnly(123456789n);
const formatWritten = { result: 0 };
for (const value of [formatDate, formatTime]) {
    const text: string = value.toString();
    const byFormat: string = value.toString('O');
    const byProvider: string = value.toString(formatInfo);
    const formatted: string = value.toString('R', formatInfo);
    const utf16: boolean = value.tryFormat(new Uint16Array(30), formatWritten, 'O', formatInfo);
    const utf8: boolean = value.tryFormat(new Uint8Array(30), formatWritten);
    const chars: boolean = value.tryFormat(Array<string>(30), formatWritten, null, null);
    void [text, byFormat, byProvider, formatted, utf16, utf8, chars];
}
const dateHelpers: string[] = [formatDate.toLongDateString(), formatDate.toShortDateString()];
const timeHelpers: string[] = [formatTime.toLongTimeString(), formatTime.toShortTimeString()];
const spanFormatted: string = span.toString('g', formatInfo);
const spanBuffer: boolean = span.tryFormat(new Uint8Array(30), formatWritten, 'G', formatInfo);
void [dateHelpers, timeHelpers, spanFormatted, spanBuffer];
// @ts-expect-error The output uses the existing OutParam contract.
formatDate.tryFormat(new Uint16Array(30), 0);
// @ts-expect-error TimeSpan has no provider-only ToString overload.
span.toString(formatInfo);
// @ts-expect-error TimeSpan's decimal separator remains private format-info state.
formatInfo.decimalSeparator;

import { Exception, FormatException, InvalidCastException, SerializationException } from '@xobin/core';
const exceptionCause: Exception = new Exception('cause');
for (const Type of [FormatException, InvalidCastException, SerializationException]) {
    const defaultException: Exception = new Type();
    const customException: Exception = new Type(null);
    const nestedException: Exception = new Type('', exceptionCause);
    const innerException: Exception | null = nestedException.innerException;
    void [defaultException, customException, innerException];
}

import { SystemException, ArithmeticException, ArgumentException, ArgumentNullException, ArgumentOutOfRangeException, OverflowException, NullReferenceException, NotImplementedException, AmbiguousMatchException, InvalidOperationException, IndexOutOfRangeException, InvalidProgramException, NotSupportedException } from '@xobin/core';
import { CultureNotFoundException } from '@xobin/globalization';
const systemError: SystemException = new ArithmeticException(null, exceptionCause);
const argumentError: ArgumentException = new ArgumentException('', 'value', exceptionCause);
const argumentInner: ArgumentException = new ArgumentException('', exceptionCause);
const nullError: ArgumentNullException = new ArgumentNullException(null, exceptionCause);
const rangeError: ArgumentOutOfRangeException = new ArgumentOutOfRangeException(null, 42n, null);
const rangeInner: ArgumentOutOfRangeException = new ArgumentOutOfRangeException(null, exceptionCause);
const cultureNameError: CultureNotFoundException = new CultureNotFoundException('name', 'abcd', null);
const cultureIdError: CultureNotFoundException = new CultureNotFoundException(null, 1033, exceptionCause);
const cultureInvalidName: string | null = cultureNameError.invalidCultureName;
const cultureInvalidId: number | null = cultureIdError.invalidCultureId;
const customCast = new InvalidCastException(null, exceptionCause);
for (const Type of [OverflowException, NullReferenceException, NotImplementedException, AmbiguousMatchException, InvalidOperationException, IndexOutOfRangeException, InvalidProgramException, NotSupportedException]) {
    void [new Type(), new Type(null), new Type('', exceptionCause)];
}
void [systemError, argumentError, argumentInner, nullError, rangeError, rangeInner, cultureInvalidName, cultureInvalidId, customCast];
