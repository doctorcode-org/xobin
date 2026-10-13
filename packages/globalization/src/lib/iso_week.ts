import * as SR from '@xobin/core/internal/exception-resources';
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

import { ArgumentOutOfRangeException } from '@xobin/core';
import { DateOnly } from './date_only';
import { DateTime } from './date_time';
import { DayOfWeek } from './day_of_week';
import { TicksPerDay } from './var';

/**
 * Provides calculations for ISO week-numbering years and weeks.
 */
export class ISOWeek {
    private constructor() {}

    /**
     * Gets the ISO week number of the specified Gregorian date.
     * @param date The date to examine.
     */
    static getWeekOfYear(date: DateTime): number;
    static getWeekOfYear(date: DateOnly): number;
    static getWeekOfYear(date: DateTime | DateOnly): number {
        const week = getWeekNumber(date);
        if (week < 1) return ISOWeek.getWeeksInYear(date.year - 1);
        if (week > 52 && ISOWeek.getWeeksInYear(date.year) === 52) return 1;
        return week;
    }

    /**
     * Gets the ISO week-numbering year of the specified Gregorian date.
     * @param date The date to examine.
     */
    static getYear(date: DateTime): number;
    static getYear(date: DateOnly): number;
    static getYear(date: DateTime | DateOnly): number {
        const week = getWeekNumber(date);
        let year = date.year;
        if (week < 1) year--;
        else if (week > 52 && ISOWeek.getWeeksInYear(year) === 52) year++;
        return year;
    }

    /**
     * Gets the first Gregorian date of the specified ISO week-numbering year.
     * @param year The ISO week-numbering year.
     */
    static getYearStart(year: number): DateTime {
        return ISOWeek.toDateTime(year, 1, DayOfWeek.Monday);
    }

    /**
     * Gets the last Gregorian date of the specified ISO week-numbering year.
     * @param year The ISO week-numbering year.
     */
    static getYearEnd(year: number): DateTime {
        return ISOWeek.toDateTime(year, ISOWeek.getWeeksInYear(year), DayOfWeek.Sunday);
    }

    /**
     * Gets the number of weeks in the specified ISO week-numbering year.
     * @param year The ISO week-numbering year.
     */
    static getWeeksInYear(year: number): number {
        checkYear(year);
        return yearWeekday(year) === 4 || yearWeekday(year - 1) === 3 ? 53 : 52;
    }

    /**
     * Converts an ISO week date to the equivalent Gregorian date and time.
     * @param year The ISO week-numbering year.
     * @param week The ISO week number, from 1 through 53.
     * @param dayOfWeek The day of the week. Both 0 and 7 represent Sunday.
     */
    static toDateTime(year: number, week: number, dayOfWeek: DayOfWeek): DateTime {
        checkYear(year);
        if (week < 1 || week > 53) {
            throw new ArgumentOutOfRangeException('week', SR.ArgumentOutOfRange_Week_ISO);
        }
        if (dayOfWeek < 0 || dayOfWeek > 7) {
            throw new ArgumentOutOfRangeException('dayOfWeek', SR.ArgumentOutOfRange_DayOfWeek);
        }
        const jan4 = new DateTime(year, 1, 4);
        const correction = getWeekday(jan4.dayOfWeek) + 3;
        const ordinal = week * 7 + getWeekday(dayOfWeek) - correction;
        return jan4.addTicks(BigInt(ordinal - 4) * TicksPerDay);
    }

    /**
     * Converts an ISO week date to the equivalent Gregorian date.
     * @param year The ISO week-numbering year.
     * @param week The ISO week number, from 1 through 53.
     * @param dayOfWeek The day of the week. Both 0 and 7 represent Sunday.
     */
    static toDateOnly(year: number, week: number, dayOfWeek: DayOfWeek): DateOnly {
        return DateOnly.fromDateTime(ISOWeek.toDateTime(year, week, dayOfWeek));
    }
}

function checkYear(year: number): void {
    if (year < 1 || year > 9999) {
        throw new ArgumentOutOfRangeException('year', SR.ArgumentOutOfRange_Year);
    }
}

function yearWeekday(year: number): number {
    const century = Math.trunc(year / 100);
    return (year + Math.trunc(year / 4) - century + Math.trunc(century / 4)) % 7;
}

function getWeekday(dayOfWeek: DayOfWeek): number {
    return dayOfWeek === DayOfWeek.Sunday ? 7 : dayOfWeek;
}

function getWeekNumber(date: DateTime | DateOnly): number {
    return Math.trunc((date.dayOfYear - getWeekday(date.dayOfWeek) + 10) / 7);
}
