import * as SR from '@xobin/core/internal/exception-resources';
import { formatExceptionResource } from '@xobin/core/internal/exception-format';
import { registerCalendarIdentity } from './calendar_identity';
import { Calendar } from './calendar';
import { DateTime } from './date_time';
import { CalendarAlgorithmType } from './calendar_algorithm_type';
import { GregorianCalendarHelper } from './gregorian_calendar_helper';
import { DayOfWeek } from './day_of_week';
import { CalendarWeekRule } from './calendar_week_rule';
import { getOrCreateValue, ArgumentOutOfRangeException, setValue } from '@xobin/core';
import { EraInfo } from './era_info';
import { MaxYear } from './gregorian_calendar';
import { calendarRangeMessage, throwIfYearGreaterThan } from './calendar_exception';

/**
 * Represents the Japanese calendar.
 */
export class JapaneseCalendar extends Calendar {
    private readonly _helper = new GregorianCalendarHelper(this,
        [
            new EraInfo(5, 2019, 5, 1, 2018, 1, MaxYear - 2018),
            new EraInfo(4, 1989, 1, 8, 1988, 1, 31),
            new EraInfo(3, 1926, 12, 25, 1925, 1, 64),
            new EraInfo(2, 1912, 7, 30, 1911, 1, 15),
            new EraInfo(1, 1868, 9, 8, 1867, 1, 45)
        ]);

    /**
     * Initializes a new instance of the JapaneseCalendar class.
     */
    constructor() {
        super();
    }

    /**
     * Gets the earliest date and time supported by the JapaneseCalendar class.
     */
    override get minSupportedDateTime(): DateTime {
        return new DateTime(1868, 9, 8);
    }

    /**
     * Gets the latest date and time supported by the JapaneseCalendar class.
     */
    override get maxSupportedDateTime(): DateTime {
        return DateTime.maxValue;
    }

    /**
     * Gets a value indicating whether the current calendar is solar-based, lunar-based, or a combination of both.
     */
    override get algorithmType(): CalendarAlgorithmType {
        return CalendarAlgorithmType.SolarCalendar;
    }

    /**
     * Gets or sets the last year of a 100-year range that can be represented by a 2-digit year.
     */
    override get twoDigitYearMax(): number {
        return getOrCreateValue(this, "twoDigitYearMax", () => 99);
    }

    override set twoDigitYearMax(value) {
        this.verifyWritable();
        if (value < 99 || value > this._helper.maxYear) {
            throw new ArgumentOutOfRangeException('value', value,
                calendarRangeMessage(99, this._helper.maxYear));
        }

        setValue(this, "twoDigitYearMax", value);
    }

    /**
     * Determines whether the specified year is a leap year.
     * @param year An integer that represents the year.
     */
    isLeapYear(year: number, era: number = 0): boolean {
        return this._helper.isLeapYear(year, era);
    }

    /**
     * Determines whether the specified month in the specified year in the specified era is a leap month.
     * @param year An integer that represents the year.
     * @param month An integer from 1 to 12 that represents the month.
     */
    isLeapMonth(year: number, month: number, era: number = 0): boolean {
        return this._helper.isLeapMonth(year, month, era);
    }

    /**
     * Determines whether the specified date is a leap day.
     * @param year An integer that represents the year.
     * @param month An integer from 1 to 12 that represents the month.
     * @param day An integer from 1 to 31 that represents the day.
     */
    isLeapDay(year: number, month: number, day: number, era: number = 0): boolean {
        return this._helper.isLeapDay(year, month, day, era);
    }

    /**
     * Returns a DateTime that is the specified number of years away from the specified DateTime.
     * @param time The DateTime to which to add years.
     * @param years The number of years to add.
     */
    addYears(time: DateTime, years: number): DateTime {
        return this._helper.addYears(time, years);
    }

    /**
     * Returns a DateTime that is the specified number of months away from the specified DateTime.
     * @param time The DateTime to which to add months.
     * @param years The number of months to add.
     */
    addMonths(time: DateTime, months: number): DateTime {
        return this._helper.addMonths(time, months);
    }

    /**
     * Returns the day of the month in the specified DateTime.
     * @param time The DateTime to read.
     */
    getDayOfMonth(time: DateTime): number {
        return this._helper.getDayOfMonth(time);
    }

    /**
     * Returns the day of the week in the specified DateTime.
     * @param time The DateTime to read.
     */
    getDayOfWeek(time: DateTime): DayOfWeek {
        return this._helper.getDayOfWeek(time);
    }

    /**
     * Returns the day of the year in the specified DateTime.
     * @param time The DateTime to read.
     */
    getDayOfYear(time: DateTime): number {
        return this._helper.getDayOfYear(time);
    }

    /**
     * Returns the year in the specified DateTime.
     * @param time The DateTime to read.
     */
    getYear(time: DateTime): number {
        return this._helper.getYear(time);
    }

    /**
     * Returns the month in the specified DateTime.
     * @param time The DateTime to read.
     */
    getMonth(time: DateTime): number {
        return this._helper.getMonth(time);
    }

    /**
     * Returns the number of months in the specified year.
     * @param year An integer that represents the year.
     */
    getMonthsInYear(year: number, era: number = 0): number {
        return this._helper.getMonthsInYear(year, era);
    }

    /**
     * Returns the number of days in the specified year.
     * @param year An integer that represents the year.
     */
    getDaysInYear(year: number, era: number = 0): number {
        return this._helper.getDaysInYear(year, era);
    }

    /**
     * Returns the number of days in the specified month in the specified year.
     * @param year An integer that represents the year.
     * @param month An integer from 1 to 12 that represents the month.
     */
    getDaysInMonth(year: number, month: number, era: number = 0): number {
        return this._helper.getDaysInMonth(year, month, era);
    }

    /**
     * Returns the week of the year that includes the date in the specified DateTime.
     * @param time The DateTime to read.
     * @param rule One of the CalendarWeekRule values that defines a calendar week.
     * @param firstDayOfWeek One of the DayOfWeek values that represents the first day of the week.
     */
    override getWeekOfYear(time: DateTime, rule: CalendarWeekRule, firstDayOfWeek: DayOfWeek): number {
        return this._helper.getWeekOfYear(time, rule, firstDayOfWeek);
    }

    /**
     * Calculates the leap month for a specified year.
     * @param year A year.
     */
    override getLeapMonth(year: number, era: number = 0): number {
        return this._helper.getLeapMonth(year, era);
    }

    /**
     * Converts the specified year to a four-digit year by using the TwoDigitYearMax property to determine the appropriate century.
     * @param year A two-digit or four-digit integer that represents the year to convert.
     */
    override toFourDigitYear(year: number): number {
        if (year <= 0) {
            throw new ArgumentOutOfRangeException('year', year, formatExceptionResource(SR.ArgumentOutOfRange_Generic_MustBeNonNegativeNonZero, 'year', year));
        }
        if (year > this._helper.maxYear) {
            throwIfYearGreaterThan(year, this._helper.maxYear);
        }

        return year;
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
    toDateTime(year: number, month: number, day: number, hour: number, minute: number,
        second: number, millisecond: number, era: number = 0): DateTime {
        return this._helper.toDateTime(year, month, day, hour, minute, second, millisecond, era);
    }

    /**
     * Returns the era in the specified DateTime.
     * @param time The DateTime to read.
     */
    getEra(time: DateTime): number {
        return this._helper.getEra(time);
    }

    /**
     * Gets the list of eras in the current calendar.
     */
    get eras(): number[] {
        return this._helper.eras;
    }

}

registerCalendarIdentity(JapaneseCalendar.prototype, 'System.Globalization.JapaneseCalendar', () => 3);
