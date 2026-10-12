// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

import { ArgumentOutOfRangeException, getOrCreateValue, setValue } from '@xobin/core';
import { Calendar, checkAddResult } from './calendar';
import { CalendarAlgorithmType } from './calendar_algorithm_type';
import { registerCalendarIdentity } from './calendar_identity';
import { calendarRangeMessage, throwIfNegativeYear } from './calendar_exception';
import { DateTime } from './date_time';
import { DayOfWeek } from './day_of_week';
import { TicksPerDay, TicksPerMillisecond, TicksPerSecond } from './var';

const daysToMonth365 = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
const daysToMonth366 = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366];

/**
 * Represents the Julian calendar.
 */
export class JulianCalendar extends Calendar {
    /**
     * Represents the current era of the Julian calendar.
     */
    static readonly JulianEra = 1;

    /**
     * Initializes a new instance of the JulianCalendar class.
     */
    constructor() {
        super();
    }

    /**
     * Gets the earliest date and time supported by this calendar.
     */
    override get minSupportedDateTime(): DateTime {
        return DateTime.minValue;
    }

    /**
     * Gets the latest date and time supported by this calendar.
     */
    override get maxSupportedDateTime(): DateTime {
        return DateTime.maxValue;
    }

    /**
     * Gets the calendar's algorithm type.
     */
    override get algorithmType(): CalendarAlgorithmType {
        return CalendarAlgorithmType.SolarCalendar;
    }

    /**
     * Gets the eras supported by this calendar.
     */
    override get eras(): number[] {
        return [JulianCalendar.JulianEra];
    }

    /**
     * Gets or sets the last year of a range represented by a two-digit year.
     */
    override get twoDigitYearMax(): number {
        return getOrCreateValue(this, 'twoDigitYearMax', () => 2049);
    }

    override set twoDigitYearMax(value: number) {
        this.verifyWritable();
        if (value < 99 || value > 9999) {
            throw new ArgumentOutOfRangeException('value', value, calendarRangeMessage(99, 9999));
        }
        setValue(this, 'twoDigitYearMax', value);
    }

    /**
     * Adds the specified number of months to a date and time.
     * @param time The date and time to change.
     * @param months The number of months to add.
     */
    override addMonths(time: DateTime, months: number): DateTime {
        if (months < -120000 || months > 120000) {
            throw new ArgumentOutOfRangeException('months', months, calendarRangeMessage(-120000, 120000));
        }
        let year = this.getYear(time);
        const index = this.getMonth(time) - 1 + months;
        const month = index >= 0 ? index % 12 + 1 : 12 + (index + 1) % 12;
        year += Math.trunc(index >= 0 ? index / 12 : (index - 11) / 12);
        // The reference AddMonths method intentionally uses Gregorian leap rules when clamping.
        const days = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? daysToMonth366 : daysToMonth365;
        const day = Math.min(this.getDayOfMonth(time), days[month]! - days[month - 1]!);
        const ticks = dateToTicks(year, month, day) + time.ticks % TicksPerDay;
        checkAddResult(ticks, this.minSupportedDateTime, this.maxSupportedDateTime);
        return new DateTime(ticks);
    }

    /**
     * Adds the specified number of years to a date and time.
     * @param time The date and time to change.
     * @param years The number of years to add.
     */
    override addYears(time: DateTime, years: number): DateTime {
        return this.addMonths(time, Math.imul(years, 12));
    }

    /**
     * Gets the day of the month for the specified date.
     * @param time The date and time to examine.
     */
    override getDayOfMonth(time: DateTime): number {
        return getDatePart(time, 'day');
    }

    /**
     * Gets the day of the week for the specified date.
     * @param time The date and time to examine.
     */
    override getDayOfWeek(time: DateTime): DayOfWeek {
        return time.dayOfWeek;
    }

    /**
     * Gets the day of the year for the specified date.
     * @param time The date and time to examine.
     */
    override getDayOfYear(time: DateTime): number {
        return getDatePart(time, 'dayOfYear');
    }

    /**
     * Gets the number of days in the specified month and era.
     * @param year The Julian year.
     * @param month The month from 1 through 12.
     * @param era The era, or zero for the current era.
     */
    override getDaysInMonth(year: number, month: number, era: number = 0): number {
        checkYearEra(year, era);
        checkMonth(month);
        const days = year % 4 === 0 ? daysToMonth366 : daysToMonth365;
        return days[month]! - days[month - 1]!;
    }

    /**
     * Gets the number of days in the specified year and era.
     * @param year The Julian year.
     * @param era The era, or zero for the current era.
     */
    override getDaysInYear(year: number, era: number = 0): number {
        return this.isLeapYear(year, era) ? 366 : 365;
    }

    /**
     * Gets the era for the specified date.
     * @param time The date and time to examine.
     */
    override getEra(time: DateTime): number {
        return JulianCalendar.JulianEra;
    }

    /**
     * Gets the month for the specified date.
     * @param time The date and time to examine.
     */
    override getMonth(time: DateTime): number {
        return getDatePart(time, 'month');
    }

    /**
     * Gets the number of months in the specified year and era.
     * @param year The Julian year.
     * @param era The era, or zero for the current era.
     */
    override getMonthsInYear(year: number, era: number = 0): number {
        checkYearEra(year, era);
        return 12;
    }

    /**
     * Gets the year for the specified date.
     * @param time The date and time to examine.
     */
    override getYear(time: DateTime): number {
        return getDatePart(time, 'year');
    }

    /**
     * Determines whether the specified date is a leap day.
     * @param year The Julian year.
     * @param month The month from 1 through 12.
     * @param day The day of the month.
     * @param era The era, or zero for the current era.
     */
    override isLeapDay(year: number, month: number, day: number, era: number = 0): boolean {
        checkMonth(month);
        const leap = this.isLeapYear(year, era);
        checkDay(year, month, day);
        return leap && month === 2 && day === 29;
    }

    /**
     * Gets the leap month in the specified year, or zero if there is none.
     * @param year The Julian year.
     * @param era The era, or zero for the current era.
     */
    override getLeapMonth(year: number, era: number = 0): number {
        checkYearEra(year, era);
        return 0;
    }

    /**
     * Determines whether the specified month is a leap month.
     * @param year The Julian year.
     * @param month The month from 1 through 12.
     * @param era The era, or zero for the current era.
     */
    override isLeapMonth(year: number, month: number, era: number = 0): boolean {
        checkYearEra(year, era);
        checkMonth(month);
        return false;
    }

    /**
     * Determines whether the specified year is a leap year.
     * @param year The Julian year.
     * @param era The era, or zero for the current era.
     */
    override isLeapYear(year: number, era: number = 0): boolean {
        checkYearEra(year, era);
        return year % 4 === 0;
    }

    /**
     * Converts the specified Julian date and time to a DateTime.
     * @param year The Julian year.
     * @param month The month from 1 through 12.
     * @param day The day of the month.
     * @param hour The hour from 0 through 23.
     * @param minute The minute from 0 through 59.
     * @param second The second from 0 through 59.
     * @param millisecond The millisecond from 0 through 999.
     * @param era The era, or zero for the current era.
     */
    override toDateTime(year: number, month: number, day: number, hour: number, minute: number,
        second: number, millisecond: number, era: number = 0): DateTime {
        checkYearEra(year, era);
        checkMonth(month);
        checkDay(year, month, day);
        if (millisecond < 0 || millisecond > 999) {
            throw new ArgumentOutOfRangeException('millisecond', millisecond, calendarRangeMessage(0, 999));
        }
        if (hour < 0 || hour >= 24 || minute < 0 || minute >= 60 || second < 0 || second >= 60) {
            throw new ArgumentOutOfRangeException(undefined, 'Hour, Minute, and Second parameters describe an un-representable DateTime.');
        }
        return new DateTime(dateToTicks(year, month, day)
            + BigInt(hour * 3600 + minute * 60 + second) * TicksPerSecond
            + BigInt(millisecond) * TicksPerMillisecond);
    }

    /**
     * Converts a two-digit year to a four-digit year.
     * @param year The year to convert.
     */
    override toFourDigitYear(year: number): number {
        if (year < 0) throwIfNegativeYear(year);
        if (year > 9999) {
            throw new ArgumentOutOfRangeException('year', year, 'Argument must be between 1 and 9999.');
        }
        return super.toFourDigitYear(year);
    }
}

function checkYearEra(year: number, era: number): void {
    if (era !== 0 && era !== JulianCalendar.JulianEra) {
        throw new ArgumentOutOfRangeException('era', era, 'Era value was not valid.');
    }
    if (year <= 0 || year > 9999) {
        throw new ArgumentOutOfRangeException('year', year, calendarRangeMessage(1, 9999));
    }
}

function checkMonth(month: number): void {
    if (month < 1 || month > 12) {
        throw new ArgumentOutOfRangeException('month', month, 'Month must be between one and twelve.');
    }
}

function checkDay(year: number, month: number, day: number): void {
    if (year === 1 && month === 1 && day < 3) {
        throw new ArgumentOutOfRangeException(undefined, 'Year, Month, and Day parameters describe an un-representable DateTime.');
    }
    const days = year % 4 === 0 ? daysToMonth366 : daysToMonth365;
    const max = days[month]! - days[month - 1]!;
    if (day < 1 || day > max) {
        throw new ArgumentOutOfRangeException('day', day, calendarRangeMessage(1, max));
    }
}

function dateToTicks(year: number, month: number, day: number): bigint {
    const days = year % 4 === 0 ? daysToMonth366 : daysToMonth365;
    const previousYear = year - 1;
    return BigInt(previousYear * 365 + Math.trunc(previousYear / 4) + days[month - 1]! + day - 3) * TicksPerDay;
}

function getDatePart(time: DateTime, part: 'year' | 'month' | 'day' | 'dayOfYear'): number {
    let day = Number(time.ticks / TicksPerDay) + 2;
    const cycle = Math.trunc(day / 1461);
    day -= cycle * 1461;
    const yearInCycle = Math.min(Math.trunc(day / 365), 3);
    if (part === 'year') return cycle * 4 + yearInCycle + 1;
    day -= yearInCycle * 365;
    if (part === 'dayOfYear') return day + 1;
    const days = yearInCycle === 3 ? daysToMonth366 : daysToMonth365;
    let month = (day >> 5) + 1;
    while (day >= days[month]!) month++;
    return part === 'month' ? month : day - days[month - 1]! + 1;
}

registerCalendarIdentity(JulianCalendar.prototype, 'JulianCalendar', () => 13);
