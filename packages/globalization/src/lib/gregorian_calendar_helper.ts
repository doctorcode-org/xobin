import { Calendar, checkAddResult } from './calendar';
import { ArgumentOutOfRangeException, ArgumentException, int } from '@xobin/core';
import {
    TicksPerDay, MillisPerSecond, TicksPerMillisecond, DatePartYear, DatePartMonth, DatePartDay,
    DatePartDayOfYear, DaysPer400Years, DaysPer100Years, DaysPer4Years, DaysPerYear
} from './var';
import { timeToTicks as TimeSpanTimeToTicks } from './time_span';
import { DateTime } from './date_time';
import { DayOfWeek } from './day_of_week';
import { EraInfo } from './era_info';
import { DaysToMonth366, DaysToMonth365, GregorianCalendar } from './gregorian_calendar';
import { CalendarWeekRule } from './calendar_week_rule';

export class GregorianCalendarHelper {

    constructor(public readonly cal: Calendar, public readonly eraInfo: EraInfo[]) {

    }

    get minYear(): number {
        return this.eraInfo[0]!.minEraYear;
    }

    get maxYear(): number {
        return this.eraInfo[0]!.maxEraYear;
    }

    isLeapYear(year: number): boolean {
        year = getGregorianYear.call(this, year);
        return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
    }

    addMonths(time: DateTime, months: number): DateTime {
        if (months < -120000 || months > 120000) {
            throw new ArgumentOutOfRangeException(
                //nameof(months),
                //SR.Format(
                //    SR.ArgumentOutOfRange_Range,
                //    -120000,
                //    120000)
            );
        }
        checkTicksRange.call(this, time.ticks);

        let y = getDatePart.call(this, time.ticks, DatePartYear);
        let m = getDatePart.call(this, time.ticks, DatePartMonth);
        let d = getDatePart.call(this, time.ticks, DatePartDay);
        let i = m - 1 + months;
        if (i >= 0) {
            m = i % 12 + 1;
            y += i / 12;
        }
        else {
            m = 12 + (i + 1) % 12;
            y += (i - 11) / 12;
        }
        const daysArray = (y % 4 == 0 && (y % 100 != 0 || y % 400 == 0)) ? DaysToMonth366 : DaysToMonth365;
        const days = (daysArray[m]! - daysArray[m - 1]!);

        if (d > days) {
            d = days;
        }
        const ticks = dateToTicks(y, m, d) + (time.ticks % TicksPerDay);
        checkAddResult(ticks, this.cal.minSupportedDateTime, this.cal.maxSupportedDateTime);
        return new DateTime(ticks);
    }

    addYears(time: DateTime, years: number): DateTime {
        return this.addMonths(time, years * 12);
    }

    getDayOfMonth(time: DateTime): number {
        return getDatePart.call(this, time.ticks, DatePartDay);
    }

    getDayOfWeek(time: DateTime): DayOfWeek {
        checkTicksRange.call(this, time.ticks);
        return int((time.ticks / TicksPerDay + 1) % 7);
    }

    getDayOfYear(time: DateTime): number {
        return getDatePart.call(this, time.ticks, DatePartDayOfYear);
    }

    getDaysInMonth(year: number, month: number): number {
        year = getGregorianYear.call(this, year);
        if (month < 1 || month > 12) {
            throw new ArgumentOutOfRangeException(/*nameof(month), SR.ArgumentOutOfRange_Month*/);
        }

        const days = ((year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) ? DaysToMonth366 : DaysToMonth365);
        return days[month]! - days[month - 1]!;
    }

    getDaysInYear(year: number): number {
        year = getGregorianYear.call(this, year);
        return (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) ? 366 : 365;
    }

    getMonth(time: DateTime): number {
        return getDatePart.call(this, time.ticks, DatePartMonth);
    }

    getMonthsInYear(_year: number): number {
        return 12;
    }

    getYear(time: DateTime): number;
    getYear(year: number, time: DateTime): number;
    getYear(): number {
        const time: DateTime = arguments[0];

        if (arguments.length == 1) {
            const ticks = time.ticks;
            const year = getDatePart.call(this, ticks, DatePartYear);
            for (let i = 0; i < this.eraInfo.length; i++) {
                if (ticks >= this.eraInfo[i]!.ticks) {
                    return year - this.eraInfo[i]!.yearOffset;
                }
            }
            throw new ArgumentException(/*SR.Argument_NoEra*/);
        }
        else {
            const year: number = arguments[0];
            const time: DateTime = arguments[1];
            const ticks = time.ticks;
            for (let i = 0; i < this.eraInfo.length; i++) {
                // while calculating dates with JapaneseLuniSolarCalendar, we can run into cases right after the start of the era
                // and still belong to the month which is started in previous era. Calculating equivalent calendar date will cause
                // using the new era info which will have the year offset equal to the year we are calculating year = m_EraInfo[i].yearOffset
                // which will end up with zero as calendar year.
                // We should use the previous era info instead to get the right year number. Example of such date is Feb 2nd 1989
                if (ticks >= this.eraInfo[i]!.ticks && year > this.eraInfo[i]!.yearOffset) {
                    return year - this.eraInfo[i]!.yearOffset;
                }
            }
            throw new ArgumentException(/*SR.Argument_NoEra*/);
        }
    }

    isLeapDay(year: number, month: number, day: number): boolean {
        // year/month/era checking is done in GetDaysInMonth()
        if (day < 1 || day > this.getDaysInMonth(year, month)) {
            throw new ArgumentOutOfRangeException(
                //nameof(day),
                //SR.Format(
                //    SR.ArgumentOutOfRange_Range,
                //    1,
                //    GetDaysInMonth(year, month, era))
            );
        }

        if (!this.isLeapYear(year)) {
            return false;
        }

        if (month == 2 && day == 29) {
            return true;
        }

        return false;
    }

    getLeapMonth(_year: number): number {
        return 0;
    }

    isLeapMonth(_year: number, month: number): boolean {
        if (month < 1 || month > 12) {
            throw new ArgumentOutOfRangeException(
                //nameof(month),
                //SR.Format(
                //    SR.ArgumentOutOfRange_Range,
                //    1,
                //    12)
            );
        }
        return false;
    }

    getWeekOfYear(time: DateTime, rule: CalendarWeekRule, firstDayOfWeek: DayOfWeek): number {
        checkTicksRange.call(this, time.ticks);
        // Use GregorianCalendar to get around the problem that the implmentation in Calendar.GetWeekOfYear()
        // can call GetYear() that exceeds the supported range of the Gregorian-based calendars.
        return GregorianCalendar.defaultInstance.getWeekOfYear(time, rule, firstDayOfWeek);
    }

    toFourDigitYear(year: number, twoDigitYearMax: number): number {
        if (year < 0) {
            throw new ArgumentOutOfRangeException(/*nameof(year), SR.ArgumentOutOfRange_NeedPosNum*/);
        }

        if (year < 100) {
            const y = year % 100;
            return (twoDigitYearMax / 100 - (y > twoDigitYearMax % 100 ? 1 : 0)) * 100 + y;
        }

        if (year < this.minYear || year > this.maxYear) {
            throw new ArgumentOutOfRangeException(/*nameof(year), SR.Format(SR.ArgumentOutOfRange_Range, m_minYear, m_maxYear)*/);
        }
        // If the year value is above 100, just return the year value.  Don't have to do
        // the TwoDigitYearMax comparison.
        return year;
    }

    toDateTime(this: GregorianCalendarHelper, year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number): DateTime {
        year = getGregorianYear.call(this, year);
        const ticks = dateToTicks(year, month, day) + timeToTicks(hour, minute, second, millisecond);
        checkTicksRange.call(this, ticks);
        return new DateTime(ticks);
    }

}

function getGregorianYear(this: GregorianCalendarHelper, year: number): number {
    return getYearOffset.call(this, year, true) + year;
}

//function isValidYear(this: GregorianCalendarHelper, year: number): boolean {
//    return getYearOffset.call(this, year, false) >= 0;
//}

function getDatePart(this: GregorianCalendarHelper, ticks: number, part: number): number {
    checkTicksRange.call(this, ticks);
    // n = number of days since 1/1/0001
    let n = (int)(ticks / TicksPerDay);
    // y400 = number of whole 400-year periods since 1/1/0001
    let y400 = n / DaysPer400Years;
    // n = day number within 400-year period
    n -= y400 * DaysPer400Years;
    // y100 = number of whole 100-year periods within 400-year period
    let y100 = n / DaysPer100Years;
    // Last 100-year period has an extra day, so decrement result if 4
    if (y100 == 4) y100 = 3;
    // n = day number within 100-year period
    n -= y100 * DaysPer100Years;
    // y4 = number of whole 4-year periods within 100-year period
    let y4 = n / DaysPer4Years;
    // n = day number within 4-year period
    n -= y4 * DaysPer4Years;
    // y1 = number of whole years within 4-year period
    let y1 = n / DaysPerYear;
    // Last year has an extra day, so decrement result if 4
    if (y1 == 4) y1 = 3;
    // If year was requested, compute and return it
    if (part == DatePartYear) {
        return y400 * 400 + y100 * 100 + y4 * 4 + y1 + 1;
    }
    // n = day number within year
    n -= y1 * DaysPerYear;
    // If day-of-year was requested, return it
    if (part == DatePartDayOfYear) {
        return n + 1;
    }
    // Leap year calculation looks different from IsLeapYear since y1, y4,
    // and y100 are relative to year 1, not year 0
    const leapYear = (y1 == 3 && (y4 != 24 || y100 == 3));
    const days = leapYear ? DaysToMonth366 : DaysToMonth365;
    // All months have less than 32 days, so n >> 5 is a good conservative
    // estimate for the month
    let m = (n >> 5) + 1;
    // m = 1-based month number
    while (n >= days[m]!) m++;
    // If month was requested, return it
    if (part == DatePartMonth) return m;
    // Return 1-based day-of-month
    return n - days[m - 1]! + 1;
}

function getAbsoluteDate(year: number, month: number, day: number): number {
    if (year >= 1 && year <= 9999 && month >= 1 && month <= 12) {
        const days = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) ? DaysToMonth366 : DaysToMonth365;
        if (day >= 1 && (day <= days[month]! - days[month - 1]!)) {
            const y = year - 1;
            const absoluteDate = y * 365 + y / 4 - y / 100 + y / 400 + days[month - 1]! + day - 1;
            return absoluteDate;
        }
    }
    throw new ArgumentOutOfRangeException(/*null, SR.ArgumentOutOfRange_BadYearMonthDay*/);
}

function dateToTicks(year: number, month: number, day: number) {
    return getAbsoluteDate(year, month, day) * TicksPerDay;
}

function timeToTicks(hour: number, minute: number, second: number, millisecond: number) {
    // TimeSpan.TimeToTicks is a family access function which does no error checking, so
    // we need to put some error checking out here.
    if (hour >= 0 && hour < 24 && minute >= 0 && minute < 60 && second >= 0 && second < 60) {
        if (millisecond < 0 || millisecond >= MillisPerSecond) {
            throw new ArgumentOutOfRangeException(
                //nameof(millisecond),
                //SR.Format(
                //    SR.ArgumentOutOfRange_Range,
                //    0,
                //    MillisPerSecond - 1)
            );
        }
        return TimeSpanTimeToTicks(hour, minute, second) + millisecond * TicksPerMillisecond;
    }
    throw new ArgumentOutOfRangeException(/*null, SR.ArgumentOutOfRange_BadHourMinuteSecond*/);
}

function checkTicksRange(this: GregorianCalendarHelper, ticks: number) {
    if (ticks < this.cal.minSupportedDateTime.ticks || ticks > this.cal.maxSupportedDateTime.ticks) {
        throw new ArgumentOutOfRangeException(
            //"time",
            //SR.Format(
            //    CultureInfo.InvariantCulture,
            //    SR.ArgumentOutOfRange_CalendarRange,
            //    m_Cal.MinSupportedDateTime,
            //    m_Cal.MaxSupportedDateTime)
        );
    }
}

// EraInfo.yearOffset:  The offset to Gregorian year when the era starts. Gregorian Year = Era Year + yearOffset
//                      Era Year = Gregorian Year - yearOffset
// EraInfo.minEraYear:  Min year value in this era. Generally, this value is 1, but this may be affected by the DateTime.MinValue;
// EraInfo.maxEraYear:  Max year value in this era. (== the year length of the era + 1)
function getYearOffset(this: GregorianCalendarHelper, _year: number, _throwOnError: boolean): number {
    return this.eraInfo[0]!.yearOffset;
}