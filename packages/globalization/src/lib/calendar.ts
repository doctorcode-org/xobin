import { DateTime } from './date_time';
import { CalendarAlgorithmType } from './calendar_algorithm_type';
import { ArgumentOutOfRangeException, ArgumentException, getOrCreateValue, int } from '@xobin/core';
import {
    MillisPerDay,
    MillisPerHour,
    MillisPerMinute,
    MillisPerSecond,
    TicksPerHour,
    TicksPerMillisecond,
    TicksPerMinute,
    TicksPerSecond,
    MaxMillis,
    timeToTicks as timeToTickHelper,
} from './var';
import { DayOfWeek } from './day_of_week';
import { CalendarWeekRule } from './calendar_week_rule';

/**
 * Represents time in divisions, such as weeks, months, and years.
 */
export abstract class Calendar {

    /**
     * Gets the number of days in the year that precedes the year that is specified by the MinSupportedDateTime property.
     */
    protected get daysInYearBeforeMinSupportedYear(): number {
        return 365;
    }

    /**
     * Gets the earliest date and time supported by this Calendar object.
     */
    get minSupportedDateTime(): DateTime {
        return DateTime.minValue;
    }

    /**
     * Gets the latest date and time supported by this Calendar object.
     */
    get maxSupportedDateTime(): DateTime {
        return DateTime.maxValue;
    }

    /**
     * Gets a value indicating whether the current calendar is solar-based, lunar-based, or a combination of both.
     */
    get algorithmType(): CalendarAlgorithmType {
        return CalendarAlgorithmType.Unknown;
    }

    /**
     * Gets or sets the last year of a 100-year range that can be represented by a 2-digit year.
     */
    get twoDigitYearMax(): number {
        return getOrCreateValue(this, "twoDigitYearMax", () => -1);
    }

    /**
     * Returns a DateTime that is the specified number of milliseconds away from the specified DateTime.
     * @param time The DateTime to add milliseconds to.
     * @param milliseconds The number of milliseconds to add.
     */
    addMilliseconds(time: DateTime, milliseconds: number): DateTime {
        return add.call(this, time, milliseconds, 1);
    }

    /**
     * Returns a DateTime that is the specified number of days away from the specified DateTime.
     * @param time The DateTime to which to add days.
     * @param days The number of days to add.
     */
    addDays(time: DateTime, days: number): DateTime {
        return add.call(this, time, days, MillisPerDay);
    }

    /**
     * Returns a DateTime that is the specified number of hours away from the specified DateTime.
     * @param time The DateTime to which to add hours.
     * @param hours The number of hours to add.
     */
    addHours(time: DateTime, hours: number) {
        return add.call(this, time, hours, MillisPerHour);
    }

    /**
     * Returns a DateTime that is the specified number of minutes away from the specified DateTime.
     * @param time The DateTime to which to add minutes.
     * @param minutes The number of minutes to add.
     */
    addMinutes(time: DateTime, minutes: number) {
        return add.call(this, time, minutes, MillisPerMinute);
    }

    /**
     * Returns a DateTime that is the specified number of seconds away from the specified DateTime.
     * @param time The DateTime to which to add seconds.
     * @param seconds The number of seconds to add.
     */
    addSeconds(time: DateTime, seconds: number): DateTime {
        return add.call(this, time, seconds, MillisPerSecond);
    }

    /**
     * Returns a DateTime that is the specified number of weeks away from the specified DateTime.
     * @param time The DateTime to which to add weeks.
     * @param weeks The number of weeks to add.
     */
    addWeeks(time: DateTime, weeks: number): DateTime {
        return this.addDays(time, weeks * 7);
    }

    /**
     * Returns the hours value in the specified DateTime.
     * @param time The DateTime to read.
     */
    getHour(time: DateTime): number {
        return int((time.ticks / TicksPerHour) % 24);
    }

    /**
     * Returns the milliseconds value in the specified DateTime.
     * @param time The DateTime to read.
     */
    getMilliseconds(time: DateTime): number {
        return int((time.ticks / TicksPerMillisecond) % 1000);
    }

    /**
     * Returns the minutes value in the specified DateTime.
     * @param time The DateTime to read.
     */
    getMinute(time: DateTime): number {
        return int((time.ticks / TicksPerMinute) % 60);
    }

    /**
     * Returns the seconds value in the specified DateTime.
     * @param time The DateTime to read.
     */
    getSecond(time: DateTime): number {
        return int((time.ticks / TicksPerSecond) % 60);
    }

    /**
     * Returns the week of the year that includes the date in the specified DateTime value.
     * @param time A date and time value.
     * @param rule An enumeration value that defines a calendar week.
     * @param firstDayOfWeek An enumeration value that represents the first day of the week.
     */
    getWeekOfYear(time: DateTime, rule: CalendarWeekRule, firstDayOfWeek: DayOfWeek): number {
        if (firstDayOfWeek < DayOfWeek.Sunday || firstDayOfWeek > DayOfWeek.Saturday) {
            throw new ArgumentOutOfRangeException(
                //nameof(firstDayOfWeek),
                //firstDayOfWeek,
                //SR.Format(SR.ArgumentOutOfRange_Range, DayOfWeek.Sunday, DayOfWeek.Saturday)
            );
        }

        switch (rule) {
            case CalendarWeekRule.FirstDay:
                return getFirstDayWeekOfYear.call(this, time, firstDayOfWeek);
            case CalendarWeekRule.FirstFullWeek:
                return getWeekOfYearFullDays.call(this, time, firstDayOfWeek, 7);
            case CalendarWeekRule.FirstFourDayWeek:
                return getWeekOfYearFullDays.call(this, time, firstDayOfWeek, 4);
            default:
                throw new ArgumentOutOfRangeException(
                    //nameof(rule),
                    //rule,
                    //SR.Format(SR.ArgumentOutOfRange_Range, CalendarWeekRule.FirstDay, CalendarWeekRule.FirstFourDayWeek)
                );
        }
    }

    /**
     * Converts the specified year to a four-digit year by using the TwoDigitYearMax property to determine the appropriate century.
     * @param year A two-digit or four-digit integer that represents the year to convert.
     */
    toFourDigitYear(year: number): number {
        if (year < 0) {
            throw new ArgumentOutOfRangeException('year'/*, year, SR.ArgumentOutOfRange_NeedNonNegNum*/);
        }
        if (year < 100) {
            return (this.twoDigitYearMax / 100 - (year > this.twoDigitYearMax % 100 ? 1 : 0)) * 100 + year;
        }

        // If the year value is above 100, just return the year value.  Don't have to do
        // the TwoDigitYearMax comparison.
        return year;
    }

    /**
     * Calculates the leap month for a specified year.
     * @param year A year.
     */
    getLeapMonth(year: number): number {
        if (!this.isLeapYear(year)) {
            return 0;
        }

        const monthsCount = this.getMonthsInYear(year);
        for (let month = 1; month <= monthsCount; month++) {
            if (this.isLeapMonth(year, month)) {
                return month;
            }
        }

        return 0;
    }

    /**
     * When overridden in a derived class, determines whether a year is a leap year.
     * @param year An integer that represents the year.
     */
    abstract isLeapYear(year: number): boolean;

    /**
     * When overridden in a derived class, determines whether a month is a leap month.
     * @param year An integer that represents the year.
     * @param month A positive integer that represents the month.
     */
    abstract isLeapMonth(year: number, month: number): boolean;

    /**
     * When overridden in a derived class, determines whether a date is a leap day.
     * @param year An integer that represents the year.
     * @param month A positive integer that represents the month.
     * @param day A positive integer that represents the day.
     */
    abstract isLeapDay(year: number, month: number, day: number): boolean;

    /**
     * When overridden in a derived class, returns a DateTime that is the specified number of years away from the specified DateTime.
     * @param time The DateTime to which to add years.
     * @param years The number of years to add.
     */
    abstract addYears(time: DateTime, years: number): DateTime;

    /**
     * When overridden in a derived class, returns a DateTime that is the specified number of months away from the specified DateTime.
     * @param time The DateTime to which to add months.
     * @param months The number of months to add.
     */
    abstract addMonths(time: DateTime, months: number): DateTime;

    /**
     * When overridden in a derived class, returns the day of the month in the specified DateTime.
     * @param time The DateTime to read.
     */
    abstract getDayOfMonth(time: DateTime): number;

    /**
     * When overridden in a derived class, returns the day of the week in the specified DateTime.
     * @param time The DateTime to read.
     */
    abstract getDayOfWeek(time: DateTime): DayOfWeek;

    /**
     * When overridden in a derived class, returns the day of the year in the specified DateTime.
     * @param time The DateTime to read.
     */
    abstract getDayOfYear(time: DateTime): number;

    /**
     * When overridden in a derived class, returns the year in the specified DateTime.
     * @param time The DateTime to read.
     */
    abstract getYear(time: DateTime): number;

    /**
     * When overridden in a derived class, returns the month in the specified DateTime.
     * @param time The DateTime to read.
     */
    abstract getMonth(time: DateTime): number;

    /**
     * When overridden in a derived class, returns the number of months in the specified year.
     * @param year An integer that represents the year.
     */
    abstract getMonthsInYear(year: number): number;

    /**
     * When overridden in a derived class, returns the number of days in the specified year.
     * @param year An integer that represents the year.
     */
    abstract getDaysInYear(year: number): number;

    /**
     * When overridden in a derived class, returns the number of days in the specified month.
     * @param year An integer that represents the year.
     * @param month A positive integer that represents the month.
     */
    abstract getDaysInMonth(year: number, month: number): number;

    /**
     * When overridden in a derived class, returns a DateTime that is set to the specified date and time.
     * @param year An integer that represents the year.
     * @param month A positive integer that represents the month.
     * @param day A positive integer that represents the day.
     * @param hour An integer from 0 to 23 that represents the hour.
     * @param minute An integer from 0 to 59 that represents the minute.
     * @param second An integer from 0 to 59 that represents the second.
     * @param millisecond An integer from 0 to 999 that represents the millisecond.
     */
    abstract toDateTime(year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number): DateTime;
}

//internal
function add(this: Calendar, time: DateTime, value: number, scale: number): DateTime {
    // From ECMA CLI spec, Partition III, section 3.27:
    //
    // If overflow occurs converting a floating-point type to an integer, or if the floating-point value
    // being converted to an integer is a NaN, the value returned is unspecified.
    //
    // Based upon this, this method should be performing the comparison against the double
    // before attempting a cast. Otherwise, the result is undefined.
    const tempMillis = (value * scale + (value >= 0 ? 0.5 : -0.5));
    if (!((tempMillis > -MaxMillis) && (tempMillis < MaxMillis))) {
        throw new ArgumentOutOfRangeException(/*nameof(value), value, SR.ArgumentOutOfRange_AddValue*/);
    }

    const millis = int(tempMillis);
    const ticks = time.ticks + millis * TicksPerMillisecond;
    checkAddResult(ticks, this.minSupportedDateTime, this.maxSupportedDateTime);
    return new DateTime(ticks);
}

export function checkAddResult(ticks: number, minValue: DateTime, maxValue: DateTime) {
    if (ticks < minValue.ticks || ticks > maxValue.ticks) {
        throw new ArgumentException(/*SR.Format(SR.Argument_ResultCalendarRange, minValue, maxValue)*/);
    }
}

export function timeToTicks(hour: number, minute: number, second: number, millisecond: number): number {
    if (hour < 0 || hour >= 24 || minute < 0 || minute >= 60 || second < 0 || second >= 60) {
        throw new ArgumentOutOfRangeException(/*null, SR.ArgumentOutOfRange_BadHourMinuteSecond*/);
    }

    if (millisecond < 0 || millisecond >= MillisPerSecond) {
        throw new ArgumentOutOfRangeException(
            //nameof(millisecond),
            //millisecond,
            //SR.Format(SR.ArgumentOutOfRange_Range, 0, MillisPerSecond - 1)
        );
    }

    return timeToTickHelper(hour, minute, second) + millisecond * TicksPerMillisecond;
}

function getFirstDayWeekOfYear(this: Calendar, time: DateTime, firstDayOfWeek: number) {
    const dayOfYear = this.getDayOfYear(time) - 1; // Make the day of year to be 0-based, so that 1/1 is day 0.
    const dayForJan1 = this.getDayOfWeek(time) - (dayOfYear % 7);
    const offset = (dayForJan1 - firstDayOfWeek + 14) % 7;
    return (dayOfYear + offset) / 7 + 1;
}

function getWeekOfYearFullDays(this: Calendar, time: DateTime, firstDayOfWeek: number, fullDays: number): number {
    let dayForJan1: number,
        offset: number,
        day: number;

    const dayOfYear = this.getDayOfYear(time) - 1;
    dayForJan1 = this.getDayOfWeek(time) - (dayOfYear % 7);

    // Now, calculate the offset.  Subtract the first day of week from the dayForJan1.  And make it a positive value.
    offset = (firstDayOfWeek - dayForJan1 + 14) % 7;
    if (offset != 0 && offset >= fullDays) {
        // If the offset is greater than the value of fullDays, it means that
        // the first week of the year starts on the week where Jan/1 falls on.
        offset -= 7;
    }


    // Calculate the day of year for specified time by taking offset into account.
    day = dayOfYear - offset;
    if (day >= 0) {
        // If the day of year value is greater than zero, get the week of year.
        return day / 7 + 1;
    }

    // Otherwise, the specified time falls on the week of previous year.
    // Call this method again by passing the last day of previous year.
    // the last day of the previous year may "underflow" to no longer be a valid date time for
    // this calendar if we just subtract so we need the subclass to provide us with
    // that information
    if (time <= this.minSupportedDateTime.addDays(dayOfYear)) {
        return getWeekOfYearOfMinSupportedDateTime.call(this, firstDayOfWeek, fullDays);
    }

    return getWeekOfYearFullDays.call(this, time.addDays(-(dayOfYear + 1)), firstDayOfWeek, fullDays);
}

function getWeekOfYearOfMinSupportedDateTime(this: Calendar, firstDayOfWeek: number, minimumDaysInFirstWeek: number): number {
    const dayOfYear = this.getDayOfYear(this.minSupportedDateTime) - 1;
    const dayOfWeekOfFirstOfYear = this.getDayOfWeek(this.minSupportedDateTime) - dayOfYear % 7;
    const offset = (firstDayOfWeek + 7 - dayOfWeekOfFirstOfYear) % 7;
    if (offset == 0 || offset >= minimumDaysInFirstWeek) {
        // First of year falls in the first week of the year
        return 1;
    }

    const daysInYearBeforeMinSupportedYear = this.daysInYearBeforeMinSupportedYear - 1;
    const dayOfWeekOfFirstOfPreviousYear = dayOfWeekOfFirstOfYear - 1 - (daysInYearBeforeMinSupportedYear % 7);
    const daysInInitialPartialWeek = (firstDayOfWeek - dayOfWeekOfFirstOfPreviousYear + 14) % 7;
    let day = daysInYearBeforeMinSupportedYear - daysInInitialPartialWeek;
    if (daysInInitialPartialWeek >= minimumDaysInFirstWeek) {
        // If the offset is greater than the minimum Days in the first week, it means that
        // First of year is part of the first week of the year even though it is only a partial week
        // add another week
        day += 7;
    }

    return day / 7 + 1;
}

//function isValidYear(this: Calendar, year: number): boolean {
//    return year >= this.getYear(this.minSupportedDateTime) && year <= this.getYear(this.maxSupportedDateTime);
//}

//function isValidMonth(this: Calendar, year: number, month: number): boolean {
//    return isValidYear.call(this, year) && month >= 1 && month <= this.getMonthsInYear(year);
//}

//function tryToDateTime(this: Calendar, year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number, out: OutParam<DateTime>): boolean {
//    try {
//        out.result = this.toDateTime(year, month, day, hour, minute, second, millisecond);
//        return true;
//    } catch (e) {
//        return false;
//    }
//}

//function isValidDay(this: Calendar, year: number, month: number, day: number): boolean {
//    return isValidMonth.call(this, year, month) && day >= 1 && day <= this.getDaysInMonth(year, month);
//}



//function GetSystemTwoDigitYearSetting(CalendarId CalID, int defaultYearValue) {
//    int twoDigitYearMax = GlobalizationMode.UseNls ? CalendarData.NlsGetTwoDigitYearMax(CalID) : CalendarData.IcuGetTwoDigitYearMax(CalID);
//    return twoDigitYearMax >= 0 ? twoDigitYearMax : defaultYearValue;
//}