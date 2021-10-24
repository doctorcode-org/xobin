import { Calendar, checkAddResult } from './calendar';
import { GregorianCalendarTypes } from './gregorian_calendar_types';
import { CalendarAlgorithmType } from './calendar_algorithm_type';
import { getValue, setValue, getOrCreateValue, int, ArgumentOutOfRangeException } from '@xobin/core';
import { DateTime, getDate } from './date_time';
import { DayOfWeek } from './day_of_week';
import { TicksPerDay } from './var';

export const MaxYear = 9999;
//const MinYear = 1;
export const DaysToMonth365 = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365]
export const DaysToMonth366 = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366]

/**
 * Represents the Gregorian calendar.
 */
export class GregorianCalendar extends Calendar {

    /**
     * Initializes a new instance of the GregorianCalendar class using the default GregorianCalendarTypes value.
     */
    constructor();
    /**
     * Initializes a new instance of the GregorianCalendar class using the specified GregorianCalendarTypes value.
     * @param type
     */
    constructor(type: GregorianCalendarTypes);
    constructor(type: GregorianCalendarTypes = GregorianCalendarTypes.Localized) {
        super();
        setValue(this, 'calendarType', type);
    }

    /**
     * Gets a value that indicates whether the current calendar is solar-based, lunar-based, or a combination of both.
     */
    override get algorithmType(): CalendarAlgorithmType {
        return CalendarAlgorithmType.SolarCalendar;
    }

    /**
     * Gets or sets the GregorianCalendarTypes value that denotes the language version of the current GregorianCalendar.
     */
    get calendarType(): GregorianCalendarTypes {
        return getValue(this, 'calendarType');
    }

    set calendarType(value: GregorianCalendarTypes) {
        if (value < GregorianCalendarTypes.Localized || value > GregorianCalendarTypes.TransliteratedFrench) {
            throw new ArgumentOutOfRangeException(
                //nameof(type),
                //type,
                //SR.Format(SR.ArgumentOutOfRange_Range, GregorianCalendarTypes.Localized, GregorianCalendarTypes.TransliteratedFrench)
            );
        }

        setValue(this, 'calendarType', value);
    }

    /**
     * Gets or sets the last year of a 100-year range that can be represented by a 2-digit year.
     */
    override get twoDigitYearMax(): number {
        return getOrCreateValue(this, 'twoDigitYearMax', () => 2029);
    }

    override set twoDigitYearMax(value) {
        if (value < 99 || value > MaxYear) {
            throw new ArgumentOutOfRangeException(
                //nameof(value),
                //value,
                //SR.Format(SR.ArgumentOutOfRange_Range, 99, MaxYear)
            );
        }

        setValue(this, 'twoDigitYearMax', value);
    }

    /**
     *
     */
    static get defaultInstance(): GregorianCalendar {
        return getOrCreateValue(this, "defaultInstance", () => new GregorianCalendar());
    }

    /**
     * Returns a DateTime that is the specified number of years away from the specified DateTime.
     * @param time The DateTime to which to add years.
     * @param years The number of years to add.
     */
    addYears(time: DateTime, years: number): DateTime {
        return this.addMonths(time, years * 12);
    }

    /**
     * Returns a DateTime that is the specified number of months away from the specified DateTime.
     * @param time The DateTime to which to add months.
     * @param months The number of months to add.
     */
    addMonths(time: DateTime, months: number): DateTime {
        if (months < -120000 || months > 120000) {
            throw new ArgumentOutOfRangeException(
                //nameof(months),
                //months,
                //SR.Format(SR.ArgumentOutOfRange_Range, -120000, 120000)
            );
        }

        let { year, month, day } = getDate.call(time);
        let i = month - 1 + months;
        if (i >= 0) {
            month = i % 12 + 1;
            year += i / 12;
        }
        else {
            month = 12 + (i + 1) % 12;
            year += (i - 11) / 12;
        }

        const daysArray = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) ? DaysToMonth366 : DaysToMonth365;
        const days = (daysArray[month]! - daysArray[month - 1]!);

        if (day > days) {
            day = days;
        }
        const ticks = dateToTicks(year, month, day) + time.ticks % TicksPerDay;
        checkAddResult(ticks, this.minSupportedDateTime, this.maxSupportedDateTime);

        return new DateTime(ticks);
    }

    /**
     * Returns the day of the year in the specified DateTime.
     * @param time The DateTime to read.
     */
    getDayOfYear(time: DateTime): number {
        return time.dayOfYear;
    }

    /**
     * Returns the day of the month in the specified DateTime.
     * @param time The DateTime to read.
     */
    getDayOfMonth(time: DateTime): number {
        return time.day;
    }

    /**
     * Returns the day of the week in the specified DateTime.
     * @param time The DateTime to read.
     */
    getDayOfWeek(time: DateTime): DayOfWeek {
        return int((time.ticks / TicksPerDay + 1) % 7);
    }

    /**
     * Returns the year in the specified DateTime.
     * @param time The DateTime to read.
     */
    getYear(time: DateTime): number {
        return time.year;
    }

    /**
     * Returns the month in the specified DateTime.
     * @param time The DateTime to read.
     */
    getMonth(time: DateTime): number {
        return time.month;
    }

    /**
     * Returns the number of days in the specified month in the specified year.
     * @param year An integer that represents the year.
     * @param month An integer from 1 to 12 that represents the month.
     */
    getDaysInMonth(year: number, month: number): number {
        if (year < 1 || year > MaxYear) {
            throw new ArgumentOutOfRangeException(
                //nameof(year),
                //year,
                //SR.Format(SR.ArgumentOutOfRange_Range, 1, MaxYear)
            );
        }
        if (month < 1 || month > 12) {
            throw new ArgumentOutOfRangeException(/*nameof(month), month, SR.ArgumentOutOfRange_Month*/);
        }

        const days = ((year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) ? DaysToMonth366 : DaysToMonth365);
        return days[month]! - days[month - 1]!;
    }

    /**
     * Returns the number of days in the specified year.
     * @param year An integer that represents the year.
     */
    getDaysInYear(year: number): number {
        if (year < 1 || year > MaxYear) {
            throw new ArgumentOutOfRangeException(
                //nameof(year),
                //year,
                //SR.Format(SR.ArgumentOutOfRange_Range, 1, MaxYear)
            );
        }

        return (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) ? 366 : 365;
    }

    /**
     * Returns the number of months in the specified year.
     * @param year An integer that represents the year.
     */
    getMonthsInYear(year: number): number {
        if (year < 1 || year > MaxYear) {
            throw new ArgumentOutOfRangeException(
                //nameof(year),
                //year,
                //SR.Format(SR.ArgumentOutOfRange_Range, 1, MaxYear)
            );
        }

        return 12;
    }

    /**
     * Determines whether the specified date in the specified era is a leap day.
     * @param year An integer that represents the year.
     * @param month An integer from 1 to 12 that represents the month.
     * @param day An integer from 1 to 31 that represents the day.
     */
    isLeapDay(year: number, month: number, day: number): boolean {
        if (month < 1 || month > 12) {
            throw new ArgumentOutOfRangeException(
                //nameof(month),
                //month,
                //SR.Format(SR.ArgumentOutOfRange_Range, 1, 12)
            );
        }

        if (year < 1 || year > MaxYear) {
            throw new ArgumentOutOfRangeException(
                //nameof(year),
                //year,
                //SR.Format(SR.ArgumentOutOfRange_Range, 1, MaxYear)
            );
        }
        if (day < 1 || day > this.getDaysInMonth(year, month)) {
            throw new ArgumentOutOfRangeException(
                //nameof(day),
                //day,
                //SR.Format(SR.ArgumentOutOfRange_Range, 1, GetDaysInMonth(year, month))
            );
        }

        return this.isLeapYear(year) && month == 2 && day == 29;
    }

    /**
     * Determines whether the specified month in the specified year in the specified era is a leap month.
     * @param year An integer that represents the year.
     * @param month An integer from 1 to 12 that represents the month.
     */
    isLeapMonth(year: number, month: number): boolean {
        if (year < 1 || year > MaxYear) {
            throw new ArgumentOutOfRangeException(
                //nameof(year),
                //year,
                //SR.Format(SR.ArgumentOutOfRange_Range, 1, MaxYear)
            );
        }
        if (month < 1 || month > 12) {
            throw new ArgumentOutOfRangeException(
                //nameof(month),
                //month,
                //SR.Format(SR.ArgumentOutOfRange_Range, 1, 12)
            );
        }

        return false;
    }

    /**
     * Determines whether the specified year in the specified era is a leap year.
     * @param year An integer that represents the year.
     */
    isLeapYear(year: number): boolean {
        if (year < 1 || year > MaxYear) {
            throw new ArgumentOutOfRangeException(
                //nameof(year),
                //year,
                //SR.Format(SR.ArgumentOutOfRange_Range, 1, MaxYear)
            );
        }

        return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
    }

    /**
     * Calculates the leap month for a specified year.
     * @param year A year.
     */
    override getLeapMonth(year: number): number {
        if (year < 1 || year > MaxYear) {
            throw new ArgumentOutOfRangeException(
                //nameof(year),
                //year,
                //SR.Format(SR.ArgumentOutOfRange_Range, 1, MaxYear)
            );
        }

        return 0;
    }

    /**
     * Converts the specified year to a four-digit year by using the TwoDigitYearMax property to determine the appropriate century.
     * @param year A two-digit or four-digit integer that represents the year to convert.
     */
   override toFourDigitYear(year: number): number {
        if (year < 0) {
            throw new ArgumentOutOfRangeException(/*nameof(year), year, SR.ArgumentOutOfRange_NeedNonNegNum*/);
        }
        if (year > MaxYear) {
            throw new ArgumentOutOfRangeException(
                //nameof(year),
                //year,
                //SR.Format(SR.ArgumentOutOfRange_Range, 1, MaxYear)
            );
        }

        return super.toFourDigitYear(year);
    }

    /**
     * Returns a DateTime that is set to the specified date and time.
     * @param year An integer that represents the year.
     * @param month An integer from 1 to 12 that represents the month.
     * @param day An integer from 1 to 31 that represents the day.
     * @param hour An integer from 0 to 23 that represents the hour.
     * @param minute An integer from 0 to 59 that represents the minute.
     * @param second An integer from 0 to 59 that represents the second.
     * @param millisecond An integer from 0 to 999 that represents the millisecond.
     */
    toDateTime(year: number, month: number, day: number, hour: number, minute: number, second: number, millisecond: number): DateTime {
        return new DateTime(year, month, day, hour, minute, second, millisecond);
    }

}

function dateToTicks(year: number, month: number, day: number): number {
    return getAbsoluteDate(year, month, day) * TicksPerDay;
}

export function getAbsoluteDate(year: number, month: number, day: number): number {
    if (year >= 1 && year <= MaxYear && month >= 1 && month <= 12) {
        const days = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) ? DaysToMonth366 : DaysToMonth365;
        if (day >= 1 && (day <= days[month]! - days[month - 1]!)) {
            const y = year - 1;
            return y * 365 + y / 4 - y / 100 + y / 400 + days[month - 1]! + day - 1;
        }
    }

    throw new ArgumentOutOfRangeException(/*null, SR.ArgumentOutOfRange_BadYearMonthDay*/);
}


//internal override bool IsValidYear(int year, int era) => year >= 1 && year <= MaxYear;

//internal override bool IsValidDay(int year, int month, int day, int era)
//{
//    if ((era != CurrentEra && era != ADEra) ||
//        year < 1 || year > MaxYear ||
//        month < 1 || month > 12 ||
//        day < 1) {
//        return false;
//    }

//    int[] days = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) ? DaysToMonth366 : DaysToMonth365;
//    return day <= (days[month] - days[month - 1]);
//}

//internal override bool TryToDateTime(int year, int month, int day, int hour, int minute, int second, int millisecond, int era, out DateTime result)
//{
//    if (era != CurrentEra && era != ADEra) {
//        result = DateTime.MinValue;
//        return false;
//    }

//    return DateTime.TryCreate(year, month, day, hour, minute, second, millisecond, out result);
//}
