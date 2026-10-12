// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

import { ArgumentException, ArgumentOutOfRangeException, getOrCreateValue, setValue } from '@xobin/core';
import { Calendar, checkAddResult, timeToTicks } from './calendar';
import { CalendarAlgorithmType } from './calendar_algorithm_type';
import { calendarRangeMessage, formatGregorianDateTime, throwIfNegativeYear } from './calendar_exception';
import { DateTime } from './date_time';
import { DayOfWeek } from './day_of_week';
import { registerCalendarIdentity } from './calendar_identity';
import { TicksPerDay } from './var';

// Calendar translation data from .NET 10 HebrewCalendar (MIT license).
const hebrewTable = [7, 3, 17, 3, 0, 4, 11, 2, 21, 6, 1, 3, 13, 2, 25, 4, 5, 3, 16, 2, 27, 6, 9, 1, 20, 2, 0, 6, 11, 3, 23, 4, 4, 2, 14, 3, 27, 4, 8, 2, 18, 3, 28, 6, 11, 1, 22, 5, 2, 3, 12, 3, 25, 4, 6, 2, 16, 3, 26, 6, 8, 2, 20, 1, 0, 6, 11, 2, 24, 4, 4, 3, 15, 2, 25, 6, 8, 1, 19, 2, 29, 6, 9, 3, 22, 4, 3, 2, 13, 3, 25, 4, 6, 3, 17, 2, 27, 6, 7, 3, 19, 2, 31, 4, 11, 3, 23, 4, 5, 2, 15, 3, 25, 6, 6, 2, 19, 1, 29, 6, 10, 2, 22, 4, 3, 3, 14, 2, 24, 6, 6, 1, 17, 3, 28, 5, 8, 3, 20, 1, 32, 5, 12, 3, 22, 6, 4, 1, 16, 2, 26, 6, 6, 3, 17, 2, 0, 4, 10, 3, 22, 4, 3, 2, 14, 3, 24, 6, 5, 2, 17, 1, 28, 6, 9, 2, 19, 3, 31, 4, 13, 2, 23, 6, 3, 3, 15, 1, 27, 5, 7, 3, 17, 3, 29, 4, 11, 2, 21, 6, 3, 1, 14, 2, 25, 6, 5, 3, 16, 2, 28, 4, 9, 3, 20, 2, 0, 6, 12, 1, 23, 6, 4, 2, 14, 3, 26, 4, 8, 2, 18, 3, 0, 4, 10, 3, 21, 5, 1, 3, 13, 1, 24, 5, 5, 3, 15, 3, 27, 4, 8, 2, 19, 3, 29, 6, 10, 2, 22, 4, 3, 3, 14, 2, 26, 4, 6, 3, 18, 2, 28, 6, 10, 1, 20, 6, 2, 2, 12, 3, 24, 4, 5, 2, 16, 3, 28, 4, 8, 3, 19, 2, 0, 6, 12, 1, 23, 5, 3, 3, 14, 3, 26, 4, 7, 2, 17, 3, 28, 6, 9, 2, 21, 4, 1, 3, 13, 2, 25, 4, 5, 3, 16, 2, 27, 6, 9, 1, 19, 3, 0, 5, 11, 3, 23, 4, 4, 2, 14, 3, 25, 6, 7, 1, 18, 2, 28, 6, 9, 3, 21, 4, 2, 2, 12, 3, 25, 4, 6, 2, 16, 3, 26, 6, 8, 2, 20, 1, 0, 6, 11, 2, 22, 6, 4, 1, 15, 2, 25, 6, 6, 3, 18, 1, 29, 5, 9, 3, 22, 4, 2, 3, 13, 2, 23, 6, 4, 3, 15, 2, 27, 4, 7, 3, 19, 2, 31, 4, 11, 3, 21, 6, 3, 2, 15, 1, 25, 6, 6, 2, 17, 3, 29, 4, 10, 2, 20, 6, 3, 1, 13, 3, 24, 5, 4, 3, 16, 1, 27, 5, 7, 3, 17, 3, 0, 4, 11, 2, 21, 6, 1, 3, 13, 2, 25, 4, 5, 3, 16, 2, 29, 4, 9, 3, 19, 6, 30, 2, 13, 1, 23, 6, 4, 2, 14, 3, 27, 4, 8, 2, 18, 3, 0, 4, 11, 3, 22, 5, 2, 3, 14, 1, 26, 5, 6, 3, 16, 3, 28, 4, 10, 2, 20, 6, 30, 3, 11, 2, 24, 4, 4, 3, 15, 2, 25, 6, 8, 1, 19, 2, 29, 6, 9, 3, 22, 4, 3, 2, 13, 3, 25, 4, 7, 2, 17, 3, 27, 6, 9, 1, 21, 5, 1, 3, 11, 3, 23, 4, 5, 2, 15, 3, 25, 6, 6, 2, 19, 1, 29, 6, 10, 2, 22, 4, 3, 3, 14, 2, 24, 6, 6, 1, 18, 2, 28, 6, 8, 3, 20, 4, 2, 2, 12, 3, 24, 4, 4, 3, 16, 2, 26, 6, 6, 3, 17, 2, 0, 4, 10, 3, 22, 4, 3, 2, 14, 3, 24, 6, 5, 2, 17, 1, 28, 6, 9, 2, 21, 4, 1, 3, 13, 2, 23, 6, 5, 1, 15, 3, 27, 5, 7, 3, 19, 1, 0, 5, 10, 3, 22, 4, 2, 3, 13, 2, 24, 6, 4, 3, 15, 2, 27, 4, 8, 3, 20, 4, 1, 2, 11, 3, 22, 6, 3, 2, 15, 1, 25, 6, 7, 2, 17, 3, 29, 4, 10, 2, 21, 6, 1, 3, 13, 1, 24, 5, 5, 3, 15, 3, 27, 4, 8, 2, 19, 6, 1, 1, 12, 2, 22, 6, 3, 3, 14, 2, 26, 4, 6, 3, 18, 2, 28, 6, 10, 1, 20, 6, 2, 2, 12, 3, 24, 4, 5, 2, 16, 3, 28, 4, 9, 2, 19, 6, 30, 3, 12, 1, 23, 5, 3, 3, 14, 3, 26, 4, 7, 2, 17, 3, 28, 6, 9, 2, 21, 4, 1, 3, 13, 2, 25, 4, 5, 3, 16, 2, 27, 6, 9, 1, 19, 6, 30, 2, 11, 3, 23, 4, 4, 2, 14, 3, 27, 4, 7, 3, 18, 2, 28, 6, 11, 1, 22, 5, 2, 3, 12, 3, 25, 4, 6, 2, 16, 3, 26, 6, 8, 2, 20, 4, 30, 3, 11, 2, 24, 4, 4, 3, 15, 2, 25, 6, 8, 1, 18, 3, 29, 5, 9, 3, 22, 4, 3, 2, 13, 3, 23, 6, 6, 1, 17, 2, 27, 6, 7, 3, 20, 4, 1, 2, 11, 3, 23, 4, 5, 2, 15, 3, 25, 6, 6, 2, 19, 1, 29, 6, 10, 2, 20, 6, 3, 1, 14, 2, 24, 6, 4, 3, 17, 1, 28, 5, 8, 3, 20, 4, 1, 3, 12, 2, 22, 6, 2, 3, 14, 2, 26, 4, 6, 3, 17, 2, 0, 4, 10, 3, 20, 6, 1, 2, 14, 1, 24, 6, 5, 2, 15, 3, 28, 4, 9, 2, 19, 6, 1, 1, 12, 3, 23, 5, 3, 3, 15, 1, 27, 5, 7, 3, 17, 3, 29, 4, 11, 2, 21, 6, 1, 3, 12, 2, 25, 4, 5, 3, 16, 2, 28, 4, 9, 3, 19, 6, 30, 2, 12, 1, 23, 6, 4, 2, 14, 3, 26, 4, 8, 2, 18, 3, 0, 4, 10, 3, 22, 5, 2, 3, 14, 1, 25, 5, 6, 3, 16, 3, 28, 4, 9, 2, 20, 6, 30, 3, 11, 2, 23, 4, 4, 3, 15, 2, 27, 4, 7, 3, 19, 2, 29, 6, 11, 1, 21, 6, 3, 2, 13, 3, 25, 4, 6, 2, 17, 3, 27, 6, 9, 1, 20, 5, 30, 3, 10, 3, 22, 4, 3, 2, 14, 3, 24, 6, 5, 2, 17, 1, 28, 6, 9, 2, 21, 4, 1, 3, 13, 2, 23, 6, 5, 1, 16, 2, 27, 6, 7, 3, 19, 4, 30, 2, 11, 3, 23, 4, 3, 3, 14, 2, 25, 6, 5, 3, 16, 2, 28, 4, 9, 3, 21, 4, 2, 2, 12, 3, 23, 6, 4, 2, 16, 1, 26, 6, 8, 2, 20, 4, 30, 3, 11, 2, 22, 6, 4, 1, 14, 3, 25, 5, 6, 3, 18, 1, 29, 5, 9, 3, 22, 4, 2, 3, 13, 2, 23, 6, 4, 3, 15, 2, 27, 4, 7, 3, 20, 4, 1, 2, 11, 3, 21, 6, 3, 2, 15, 1, 25, 6, 6, 2, 17, 3, 29, 4, 10, 2, 20, 6, 3, 1, 13, 3, 24, 5, 4, 3, 17, 1, 28, 5, 8, 3, 18, 6, 1, 1, 12, 2, 22, 6, 2, 3, 14, 2, 26, 4, 6, 3, 17, 2, 28, 6, 10, 1, 20, 6, 1, 2, 12, 3, 24, 4, 5, 2, 15, 3, 28, 4, 9, 2, 19, 6, 33, 3, 12, 1, 23, 5, 3, 3, 13, 3, 25, 4, 6, 2, 16, 3, 26, 6, 8, 2, 20, 4, 30, 3, 11, 2, 24, 4, 4, 3, 15, 2, 25, 6, 8, 1, 18, 6, 33, 2, 9, 3, 22, 4, 3, 2, 13, 3, 25, 4, 6, 3, 17, 2, 27, 6, 9, 1, 21, 5, 1, 3, 11, 3, 23, 4, 5, 2, 15, 3, 25, 6, 6, 2, 19, 4, 33, 3, 10, 2, 22, 4, 3, 3, 14, 2, 24, 6, 6, 1];
const lunarMonthLengths = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30, 29, 29, 29, 30, 29, 30, 29, 30, 29, 30, 29, 0, 0, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 0, 0, 30, 30, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 0, 0, 30, 29, 29, 29, 30, 30, 29, 30, 29, 30, 29, 30, 29, 0, 30, 29, 30, 29, 30, 30, 29, 30, 29, 30, 29, 30, 29, 0, 30, 30, 30, 29, 30, 30, 29, 30, 29, 30, 29, 30, 29];

/**
 * Represents the Hebrew calendar.
 */
export class HebrewCalendar extends Calendar {
    /**
     * Represents the current era of the calendar.
     */
    static readonly HebrewEra = 1;

    /**
     * Initializes a new instance of the HebrewCalendar class.
     */
    constructor() {
        super();
    }

    /**
     * Gets the earliest date and time supported by the HebrewCalendar class.
     */
    override get minSupportedDateTime(): DateTime {
        return new DateTime(1583, 1, 1);
    }

    /**
     * Gets the latest date and time supported by the HebrewCalendar class.
     */
    override get maxSupportedDateTime(): DateTime {
        return new DateTime(new DateTime(2239, 9, 30).ticks - 1n);
    }

    /**
     * Gets a value indicating whether the current calendar is solar-based, lunar-based, or a combination of both.
     */
    override get algorithmType(): CalendarAlgorithmType {
        return CalendarAlgorithmType.LunisolarCalendar;
    }

    /**
     * Gets or sets the last year of a 100-year range that can be represented by a 2-digit year.
     */
    override get twoDigitYearMax(): number {
        return getOrCreateValue(this, 'twoDigitYearMax', () => 5810);
    }

    override set twoDigitYearMax(value: number) {
        this.verifyWritable();
        if (value !== 99) this.checkYear(value, HebrewCalendar.HebrewEra, 'value');
        setValue(this, 'twoDigitYearMax', value);
    }

    private checkYear(year: number, era: number, parameter: string = 'year'): void {
        if (era !== 0 && era !== HebrewCalendar.HebrewEra) {
            throw new ArgumentOutOfRangeException('era', era, 'Era value was not valid.');
        }
        if (year < 5343 || year > 5999) {
            throw new ArgumentOutOfRangeException(parameter, year, calendarRangeMessage(5343, 5999));
        }
    }

    private checkMonth(year: number, month: number, era: number): void {
        const maximum = this.getMonthsInYear(year, era);
        if (month < 1 || month > maximum) {
            throw new ArgumentOutOfRangeException('month', month, calendarRangeMessage(1, maximum));
        }
    }

    private checkTime(time: DateTime): void {
        if (time.ticks < this.minSupportedDateTime.ticks || time.ticks > this.maxSupportedDateTime.ticks) {
            throw new ArgumentOutOfRangeException('time', time.ticks,
                `Specified time is not supported in this calendar. It should be between `
                + `${formatGregorianDateTime(this.minSupportedDateTime)} (Gregorian date) and `
                + `${formatGregorianDateTime(this.maxSupportedDateTime)} (Gregorian date), inclusive.`);
        }
    }

    private yearType(year: number): number {
        return hebrewTable[(year - 5343) * 2 + 1]!;
    }

    private yearStart(year: number): bigint {
        const code = hebrewTable[(year - 5343) * 2]!;
        const month = code === 0 || code === 31 || code === 32 ? 5 : code === 30 || code === 33 ? 3 : 4;
        const day = code === 0 ? 1 : code === 31 ? 2 : code === 32 ? 3 : code === 33 ? 29 : code;
        let elapsed = day - 1;
        for (let index = 1; index < month; index++) elapsed += lunarMonthLengths[this.yearType(year) * 14 + index]!;
        return new DateTime(year - 3760, 1, 1).ticks - BigInt(elapsed) * TicksPerDay;
    }

    private absoluteDate(year: number, month: number, day: number): number {
        let elapsed = day - 1;
        for (let index = 1; index < month; index++) elapsed += lunarMonthLengths[this.yearType(year) * 14 + index]!;
        return Number(this.yearStart(year) / TicksPerDay) + elapsed;
    }

    private dateParts(time: DateTime): { year: number; month: number; day: number; dayOfYear: number } {
        this.checkTime(time);
        let year = time.year + 3760;
        if (time.ticks >= this.yearStart(year + 1)) year++;
        const dayOfYear = Number((time.ticks - this.yearStart(year)) / TicksPerDay) + 1;
        let day = dayOfYear;
        let month = 1;
        while (day > lunarMonthLengths[this.yearType(year) * 14 + month]!) {
            day -= lunarMonthLengths[this.yearType(year) * 14 + month]!;
            month++;
        }
        return { year, month, day, dayOfYear };
    }

    /**
     * Returns a DateTime that is the specified number of months away from the specified DateTime.
     * @param time The DateTime to which to add months.
     * @param months The number of months to add.
     */
    addMonths(time: DateTime, months: number): DateTime {
        try {
            let { year, month, day } = this.dateParts(time);
            let index = month + months;
            if (months >= 0) {
                while (index > this.getMonthsInYear(year)) { index -= this.getMonthsInYear(year); year++; }
            } else if (index <= 0) {
                months = -months - month;
                year--;
                while (months > this.getMonthsInYear(year)) { months -= this.getMonthsInYear(year); year--; }
                index = this.getMonthsInYear(year) - months;
            }
            day = Math.min(day, this.getDaysInMonth(year, index));
            return new DateTime(this.toDateTime(year, index, day, 0, 0, 0, 0).ticks + time.ticks % TicksPerDay);
        } catch (error) {
            if (!(error instanceof ArgumentException)) throw error;
            throw new ArgumentOutOfRangeException('months', months, 'Value to add was out of range.');
        }
    }

    /**
     * Returns a DateTime that is the specified number of years away from the specified DateTime.
     * @param time The DateTime to which to add years.
     * @param years The number of years to add.
     */
    addYears(time: DateTime, years: number): DateTime {
        let { year, month, day } = this.dateParts(time);
        year = (year + years) | 0;
        this.checkYear(year, 0, 'years');
        month = Math.min(month, this.getMonthsInYear(year));
        day = Math.min(day, this.getDaysInMonth(year, month));
        const ticks = this.toDateTime(year, month, day, 0, 0, 0, 0).ticks + time.ticks % TicksPerDay;
        checkAddResult(ticks, this.minSupportedDateTime, this.maxSupportedDateTime);
        return new DateTime(ticks);
    }

    /**
     * Returns the day of the month in the specified DateTime.
     * @param time The DateTime to read.
     */
    getDayOfMonth(time: DateTime): number {
        return this.dateParts(time).day;
    }

    /**
     * Returns the day of the week in the specified DateTime.
     * @param time The DateTime to read.
     */
    getDayOfWeek(time: DateTime): DayOfWeek {
        return time.dayOfWeek;
    }

    /**
     * Returns the day of the year in the specified DateTime.
     * @param time The DateTime to read.
     */
    getDayOfYear(time: DateTime): number {
        return this.dateParts(time).dayOfYear;
    }

    /**
     * Returns the year in the specified DateTime.
     * @param time The DateTime to read.
     */
    getYear(time: DateTime): number {
        return this.dateParts(time).year;
    }

    /**
     * Returns the month in the specified DateTime.
     * @param time The DateTime to read.
     */
    getMonth(time: DateTime): number {
        return this.dateParts(time).month;
    }

    /**
     * Returns the era in the specified DateTime.
     * @param time The DateTime to read.
     */
    getEra(time: DateTime): number {
        return HebrewCalendar.HebrewEra;
    }

    /**
     * Gets the list of eras in the current calendar.
     */
    get eras(): number[] {
        return [HebrewCalendar.HebrewEra];
    }

    /**
     * Returns the number of months in the specified year.
     * @param year An integer that represents the year.
     * @param era An integer that represents the era.
     */
    getMonthsInYear(year: number, era: number = 0): number {
        return this.isLeapYear(year, era) ? 13 : 12;
    }

    /**
     * Returns the number of days in the specified year.
     * @param year An integer that represents the year.
     * @param era An integer that represents the era.
     */
    getDaysInYear(year: number, era: number = 0): number {
        this.checkYear(year, era);
        const type = this.yearType(year);
        return type < 4 ? 352 + type : 379 + type;
    }

    /**
     * Returns the number of days in the specified month in the specified year.
     * @param year An integer that represents the year.
     * @param month An integer from 1 to 12 that represents the month.
     * @param era An integer that represents the era.
     */
    getDaysInMonth(year: number, month: number, era: number = 0): number {
        this.checkMonth(year, month, era);
        return lunarMonthLengths[this.yearType(year) * 14 + month]!;
    }

    /**
     * Determines whether the specified year is a leap year.
     * @param year An integer that represents the year.
     * @param era An integer that represents the era.
     */
    isLeapYear(year: number, era: number = 0): boolean {
        this.checkYear(year, era);
        return (year * 7 + 1) % 19 < 7;
    }

    /**
     * Determines whether the specified month is a leap month.
     * @param year An integer that represents the year.
     * @param month An integer from 1 to 12 that represents the month.
     * @param era An integer that represents the era.
     */
    isLeapMonth(year: number, month: number, era: number = 0): boolean {
        const leap = this.isLeapYear(year, era);
        this.checkMonth(year, month, era);
        return leap && month === 7;
    }

    /**
     * Calculates the leap month for a specified year.
     * @param year An integer that represents the year.
     * @param era An integer that represents the era.
     */
    override getLeapMonth(year: number, era: number = 0): number {
        return this.isLeapYear(year, era) ? 7 : 0;
    }

    /**
     * Determines whether the specified date is a leap day.
     * @param year An integer that represents the year.
     * @param month An integer from 1 to 12 that represents the month.
     * @param day An integer that represents the day.
     * @param era An integer that represents the era.
     */
    isLeapDay(year: number, month: number, day: number, era: number = 0): boolean {
        this.checkDay(year, month, day, era);
        return this.isLeapYear(year, era) && (month === 7 || month === 6 && day === 30);
    }

    private checkDay(year: number, month: number, day: number, era: number): void {
        const maximum = this.getDaysInMonth(year, month, era);
        if (day < 1 || day > maximum) {
            throw new ArgumentOutOfRangeException('day', day, calendarRangeMessage(1, maximum));
        }
    }

    /**
     * Returns a DateTime that is set to the specified date and time.
     * @param year An integer that represents the year.
     * @param month An integer from 1 to 12 that represents the month.
     * @param day An integer that represents the day.
     * @param hour An integer from 0 to 23 that represents the hour.
     * @param minute An integer from 0 to 59 that represents the minute.
     * @param second An integer from 0 to 59 that represents the second.
     * @param millisecond An integer from 0 to 999 that represents the millisecond.
     * @param era An integer that represents the era.
     */
    toDateTime(year: number, month: number, day: number, hour: number, minute: number,
        second: number, millisecond: number, era: number = 0): DateTime {
        this.checkDay(year, month, day, era);
        const result = new DateTime(BigInt(this.absoluteDate(year, month, day)) * TicksPerDay
            + timeToTicks(hour, minute, second, millisecond));
        this.checkTime(result);
        return result;
    }

    /**
     * Converts the specified year to a four-digit year using the TwoDigitYearMax property.
     * @param year A two-digit or four-digit integer that represents the year to convert.
     */
    override toFourDigitYear(year: number): number {
        if (year < 0) throwIfNegativeYear(year);
        if (year < 100) return super.toFourDigitYear(year);
        this.checkYear(year, 0);
        return year;
    }
}

registerCalendarIdentity(HebrewCalendar.prototype, 'System.Globalization.HebrewCalendar', () => 8);
