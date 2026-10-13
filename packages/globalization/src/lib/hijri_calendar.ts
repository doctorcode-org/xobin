import { formatExceptionResource } from '@xobin/core/internal/exception-format';
import * as SR from '@xobin/core/internal/exception-resources';
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

import { ArgumentOutOfRangeException, getOrCreateValue, setValue } from '@xobin/core';
import { Calendar, checkAddResult, timeToTicks } from './calendar';
import { CalendarAlgorithmType } from './calendar_algorithm_type';
import { calendarRangeMessage, formatGregorianDateTime, throwIfNegativeYear } from './calendar_exception';
import { DateTime } from './date_time';
import { DayOfWeek } from './day_of_week';
import { registerCalendarIdentity } from './calendar_identity';
import { TicksPerDay } from './var';

const monthDays = [0, 30, 59, 89, 118, 148, 177, 207, 236, 266, 295, 325, 355];

/**
 * Represents the Hijri calendar.
 */
export class HijriCalendar extends Calendar {
    /**
     * Represents the current era of the calendar.
     */
    static readonly HijriEra = 1;

    /**
     * Initializes a new instance of the HijriCalendar class.
     */
    constructor() {
        super();
    }

    /**
     * Gets the earliest date and time supported by the HijriCalendar class.
     */
    override get minSupportedDateTime(): DateTime {
        return new DateTime(622, 7, 18);
    }

    /**
     * Gets the latest date and time supported by the HijriCalendar class.
     */
    override get maxSupportedDateTime(): DateTime {
        return DateTime.maxValue;
    }

    /**
     * Gets a value indicating whether the current calendar is solar-based, lunar-based, or a combination of both.
     */
    override get algorithmType(): CalendarAlgorithmType {
        return CalendarAlgorithmType.LunarCalendar;
    }

    /**
     * Gets the number of days in the year before the first supported year.
     */
    protected override get daysInYearBeforeMinSupportedYear(): number {
        return 354;
    }

    /**
     * Gets or sets the number of days to add or subtract to accommodate variations in the start and end of Ramadan.
     */
    get hijriAdjustment(): number {
        return getOrCreateValue(this, 'hijriAdjustment', () => 0);
    }

    set hijriAdjustment(value: number) {
        if (value < -2 || value > 2) {
            throw new ArgumentOutOfRangeException('value', value, formatExceptionResource(SR.ArgumentOutOfRange_Bounds_Lower_Upper, -2, 2));
        }
        this.verifyWritable();
        setValue(this, 'hijriAdjustment', value);
    }

    /**
     * Gets or sets the last year of a 100-year range that can be represented by a 2-digit year.
     */
    override get twoDigitYearMax(): number {
        return getOrCreateValue(this, 'twoDigitYearMax', () => 1451);
    }

    override set twoDigitYearMax(value: number) {
        this.verifyWritable();
        if (value < 99 || value > 9666) {
            throw new ArgumentOutOfRangeException('value', value, calendarRangeMessage(99, 9666));
        }
        setValue(this, 'twoDigitYearMax', value);
    }

    private checkYear(year: number, era: number): void {
        if (era !== 0 && era !== HijriCalendar.HijriEra) {
            throw new ArgumentOutOfRangeException('era', era, SR.ArgumentOutOfRange_InvalidEraValue);
        }
        if (year < 1 || year > 9666) {
            throw new ArgumentOutOfRangeException('year', calendarRangeMessage(1, 9666));
        }
    }

    private checkMonth(year: number, month: number, era: number): void {
        this.checkYear(year, era);
        if (year === 9666 && month > 4) {
            throw new ArgumentOutOfRangeException('month', month, calendarRangeMessage(1, 4));
        }
        if (month < 1 || month > 12) {
            throw new ArgumentOutOfRangeException('month', month, SR.ArgumentOutOfRange_Month);
        }
    }

    private checkTime(time: DateTime): void {
        if (time.ticks < this.minSupportedDateTime.ticks || time.ticks > this.maxSupportedDateTime.ticks) {
            throw new ArgumentOutOfRangeException('time', time.ticks,
                formatExceptionResource(SR.ArgumentOutOfRange_CalendarRange, formatGregorianDateTime(this.minSupportedDateTime), formatGregorianDateTime(this.maxSupportedDateTime)));
        }
    }

    private daysUpToYear(year: number): number {
        const cycleYears = Math.trunc((year - 1) / 30) * 30;
        let remaining = year - cycleYears - 1;
        let days = cycleYears * 10631 / 30 + 227013;
        while (remaining > 0) {
            days += 354 + (this.isLeapYear(remaining) ? 1 : 0);
            remaining--;
        }
        return days;
    }

    private absoluteDate(year: number, month: number, day: number): number {
        return this.daysUpToYear(year) + monthDays[month - 1]! + day - 1 - this.hijriAdjustment;
    }

    private dateParts(time: DateTime): { year: number; month: number; day: number; dayOfYear: number } {
        this.checkTime(time);
        let days = Number(time.ticks / TicksPerDay) + 1 + this.hijriAdjustment;
        let year = Math.trunc((days - 227013) * 30 / 10631) + 1;
        let start = this.daysUpToYear(year);
        const length = this.getDaysInYear(year);
        if (days < start) { start -= length; year--; }
        else if (days === start) { year--; start -= this.getDaysInYear(year); }
        else if (days > start + length) { start += length; year++; }
        days -= start;
        let month = 1;
        while (month <= 12 && days > monthDays[month - 1]!) month++;
        month--;
        return { year, month, day: days - monthDays[month - 1]!, dayOfYear: days };
    }

    /**
     * Returns a DateTime that is the specified number of months away from the specified DateTime.
     * @param time The DateTime to which to add months.
     * @param months The number of months to add.
     */
    addMonths(time: DateTime, months: number): DateTime {
        if (months < -120000 || months > 120000) {
            throw new ArgumentOutOfRangeException('months', months, calendarRangeMessage(-120000, 120000));
        }
        let { year, month, day } = this.dateParts(time);
        const index = month - 1 + months;
        if (index >= 0) { month = index % 12 + 1; year += Math.trunc(index / 12); }
        else { month = 12 + (index + 1) % 12; year += Math.trunc((index - 11) / 12); }
        day = Math.min(day, this.getDaysInMonth(year, month));
        const ticks = BigInt(this.absoluteDate(year, month, day)) * TicksPerDay + time.ticks % TicksPerDay;
        checkAddResult(ticks, this.minSupportedDateTime, this.maxSupportedDateTime);
        return new DateTime(ticks);
    }

    /**
     * Returns a DateTime that is the specified number of years away from the specified DateTime.
     * @param time The DateTime to which to add years.
     * @param years The number of years to add.
     */
    addYears(time: DateTime, years: number): DateTime {
        return this.addMonths(time, Math.imul(years, 12));
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
        this.checkTime(time);
        return HijriCalendar.HijriEra;
    }

    /**
     * Gets the list of eras in the current calendar.
     */
    get eras(): number[] {
        return [HijriCalendar.HijriEra];
    }

    /**
     * Returns the number of months in the specified year.
     * @param year An integer that represents the year.
     * @param era An integer that represents the era.
     */
    getMonthsInYear(year: number, era: number = 0): number {
        this.checkYear(year, era);
        return 12;
    }

    /**
     * Returns the number of days in the specified year.
     * @param year An integer that represents the year.
     * @param era An integer that represents the era.
     */
    getDaysInYear(year: number, era: number = 0): number {
        return this.isLeapYear(year, era) ? 355 : 354;
    }

    /**
     * Returns the number of days in the specified month in the specified year.
     * @param year An integer that represents the year.
     * @param month An integer from 1 to 12 that represents the month.
     * @param era An integer that represents the era.
     */
    getDaysInMonth(year: number, month: number, era: number = 0): number {
        this.checkMonth(year, month, era);
        return month === 12 ? this.isLeapYear(year) ? 30 : 29 : month % 2 === 1 ? 30 : 29;
    }

    /**
     * Determines whether the specified year is a leap year.
     * @param year An integer that represents the year.
     * @param era An integer that represents the era.
     */
    isLeapYear(year: number, era: number = 0): boolean {
        this.checkYear(year, era);
        return (year * 11 + 14) % 30 < 11;
    }

    /**
     * Determines whether the specified month is a leap month.
     * @param year An integer that represents the year.
     * @param month An integer from 1 to 12 that represents the month.
     * @param era An integer that represents the era.
     */
    isLeapMonth(year: number, month: number, era: number = 0): boolean {
        this.checkMonth(year, month, era);
        return false;
    }

    /**
     * Calculates the leap month for a specified year.
     * @param year An integer that represents the year.
     * @param era An integer that represents the era.
     */
    override getLeapMonth(year: number, era: number = 0): number {
        this.checkYear(year, era);
        return 0;
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
        return this.isLeapYear(year, era) && month === 12 && day === 30;
    }

    private checkDay(year: number, month: number, day: number, era: number): void {
        const maximum = this.getDaysInMonth(year, month, era);
        if (day < 1 || day > maximum) {
            throw new ArgumentOutOfRangeException('day', day, formatExceptionResource(SR.ArgumentOutOfRange_Day, maximum, month));
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
        return new DateTime(BigInt(this.absoluteDate(year, month, day)) * TicksPerDay
            + timeToTicks(hour, minute, second, millisecond));
    }

    /**
     * Converts the specified year to a four-digit year using the TwoDigitYearMax property.
     * @param year A two-digit or four-digit integer that represents the year to convert.
     */
    override toFourDigitYear(year: number): number {
        if (year < 0) throwIfNegativeYear(year);
        if (year < 100) return super.toFourDigitYear(year);
        if (year > 9666) {
            throw new ArgumentOutOfRangeException('year', year, calendarRangeMessage(1, 9666));
        }
        return year;
    }
}

registerCalendarIdentity(HijriCalendar.prototype, 'System.Globalization.HijriCalendar', () => 6);
