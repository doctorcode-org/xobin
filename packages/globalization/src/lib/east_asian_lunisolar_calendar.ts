import { formatExceptionResource } from '@xobin/core/internal/exception-format';
import * as SR from '@xobin/core/internal/exception-resources';
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

import { ArgumentOutOfRangeException, getOrCreateValue, setValue } from '@xobin/core';
import { Calendar, checkAddResult } from './calendar';
import { CalendarAlgorithmType } from './calendar_algorithm_type';
import { calendarRangeMessage, formatGregorianDateTime, throwIfNegativeYear } from './calendar_exception';
import { DateTime } from './date_time';
import { DayOfWeek } from './day_of_week';
import { EraInfo } from './era_info';

const daysToMonth365 = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
const daysToMonth366 = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];

/**
 * Provides the common implementation for East Asian lunisolar calendars.
 */
export abstract class EastAsianLunisolarCalendar extends Calendar {
    /**
     * Gets the first supported lunisolar year.
     */
    protected abstract get minCalendarYear(): number;

    /**
     * Gets the last supported lunisolar year.
     */
    protected abstract get maxCalendarYear(): number;

    /**
     * Gets the era definitions used for year validation.
     */
    protected abstract get calEraInfo(): readonly EraInfo[] | null;

    /**
     * Gets the Gregorian calendar identity used for system year settings.
     */
    protected abstract get baseCalendarID(): number;

    /**
     * Gets an entry in the calendar's lunisolar year table.
     */
    protected abstract getYearInfo(lunarYear: number, index: number): number;

    /**
     * Converts a lunisolar year to the year of the date's era.
     */
    protected abstract getYearForDate(year: number, time: DateTime): number;

    /**
     * Converts a year in the specified era to a Gregorian year.
     */
    protected abstract getGregorianYear(year: number, era: number): number;

    /**
     * Gets the algorithm type of this calendar.
     */
    override get algorithmType(): CalendarAlgorithmType {
        return CalendarAlgorithmType.LunisolarCalendar;
    }

    /**
     * Gets the year in the sexagenary cycle for the specified date.
     * @param time The date and time to examine.
     */
    getSexagenaryYear(time: DateTime): number {
        this.checkTicksRange(time.ticks);
        return (this.timeToLunar(time).year - 4) % 60 + 1;
    }

    /**
     * Gets the celestial stem for the specified year of the sexagenary cycle.
     * @param sexagenaryYear The cycle year from 1 through 60.
     */
    getCelestialStem(sexagenaryYear: number): number {
        checkSexagenaryYear(sexagenaryYear);
        return (sexagenaryYear - 1) % 10 + 1;
    }

    /**
     * Gets the terrestrial branch for the specified year of the sexagenary cycle.
     * @param sexagenaryYear The cycle year from 1 through 60.
     */
    getTerrestrialBranch(sexagenaryYear: number): number {
        checkSexagenaryYear(sexagenaryYear);
        return (sexagenaryYear - 1) % 12 + 1;
    }

    /**
     * Gets or sets the last year of a range represented by a two-digit year.
     */
    override get twoDigitYearMax(): number {
        return getOrCreateValue(this, 'twoDigitYearMax', () =>
            this.baseCalendarID === 3 || this.baseCalendarID === 4 ? 99 : this.baseCalendarID === 5 ? 4382 : 2049);
    }

    override set twoDigitYearMax(value: number) {
        this.verifyWritable();
        if (value < 99 || value > this.maxCalendarYear) {
            throw new ArgumentOutOfRangeException('value', value, calendarRangeMessage(99, this.maxCalendarYear));
        }
        setValue(this, 'twoDigitYearMax', value);
    }

    /**
     * Converts a two-digit year to a four-digit year.
     * @param year The year to convert.
     */
    override toFourDigitYear(year: number): number {
        if (year < 0) throwIfNegativeYear(year);
        year = super.toFourDigitYear(year);
        this.checkYearRange(year, 0);
        return year;
    }

    /**
     * Gets the number of days in the specified month.
     * @param year The year in the specified era.
     * @param month The month from 1 through 13.
     * @param era The era, or zero for the current era.
     */
    override getDaysInMonth(year: number, month: number, era: number = 0): number {
        return this.internalGetDaysInMonth(this.checkYearMonthRange(year, month, era), month);
    }

    /**
     * Gets the number of days in the specified year.
     * @param year The year in the specified era.
     * @param era The era, or zero for the current era.
     */
    override getDaysInYear(year: number, era: number = 0): number {
        year = this.checkYearRange(year, era);
        let days = 0;
        for (let month = this.internalIsLeapYear(year) ? 13 : 12; month > 0; month--) {
            days += this.internalGetDaysInMonth(year, month);
        }
        return days;
    }

    /**
     * Gets the number of months in the specified year.
     * @param year The year in the specified era.
     * @param era The era, or zero for the current era.
     */
    override getMonthsInYear(year: number, era: number = 0): number {
        return this.internalIsLeapYear(this.checkYearRange(year, era)) ? 13 : 12;
    }

    /**
     * Determines whether the specified year is a leap year.
     * @param year The year in the specified era.
     * @param era The era, or zero for the current era.
     */
    override isLeapYear(year: number, era: number = 0): boolean {
        return this.internalIsLeapYear(this.checkYearRange(year, era));
    }

    /**
     * Gets the leap month, or zero if the year has no leap month.
     * @param year The year in the specified era.
     * @param era The era, or zero for the current era.
     */
    override getLeapMonth(year: number, era: number = 0): number {
        const month = this.getYearInfo(this.checkYearRange(year, era), 0);
        return month > 0 ? month + 1 : 0;
    }

    /**
     * Determines whether the specified month is a leap month.
     * @param year The year in the specified era.
     * @param month The month from 1 through 13.
     * @param era The era, or zero for the current era.
     */
    override isLeapMonth(year: number, month: number, era: number = 0): boolean {
        const leapMonth = this.getYearInfo(this.checkYearMonthRange(year, month, era), 0);
        return leapMonth !== 0 && month === leapMonth + 1;
    }

    /**
     * Determines whether the specified date belongs to a leap month.
     * @param year The year in the specified era.
     * @param month The month from 1 through 13.
     * @param day The day of the month.
     * @param era The era, or zero for the current era.
     */
    override isLeapDay(year: number, month: number, day: number, era: number = 0): boolean {
        year = this.checkYearMonthRange(year, month, era);
        this.checkDay(year, month, day);
        const leapMonth = this.getYearInfo(year, 0);
        return leapMonth !== 0 && month === leapMonth + 1;
    }

    /**
     * Gets the day of the month for the specified date.
     * @param time The date and time to examine.
     */
    override getDayOfMonth(time: DateTime): number {
        this.checkTicksRange(time.ticks);
        return this.timeToLunar(time).day;
    }

    /**
     * Gets the day of the year for the specified date.
     * @param time The date and time to examine.
     */
    override getDayOfYear(time: DateTime): number {
        this.checkTicksRange(time.ticks);
        const { year, month, day } = this.timeToLunar(time);
        let result = day;
        for (let index = 1; index < month; index++) result += this.internalGetDaysInMonth(year, index);
        return result;
    }

    /**
     * Gets the month for the specified date.
     * @param time The date and time to examine.
     */
    override getMonth(time: DateTime): number {
        this.checkTicksRange(time.ticks);
        return this.timeToLunar(time).month;
    }

    /**
     * Gets the year for the specified date.
     * @param time The date and time to examine.
     */
    override getYear(time: DateTime): number {
        this.checkTicksRange(time.ticks);
        return this.getYearForDate(this.timeToLunar(time).year, time);
    }

    /**
     * Gets the day of the week for the specified date.
     * @param time The date and time to examine.
     */
    override getDayOfWeek(time: DateTime): DayOfWeek {
        this.checkTicksRange(time.ticks);
        return time.dayOfWeek;
    }

    /**
     * Converts the specified lunisolar date and time to a DateTime.
     * @param year The year in the specified era.
     * @param month The month from 1 through 13.
     * @param day The day of the month.
     * @param hour The hour from 0 through 23.
     * @param minute The minute from 0 through 59.
     * @param second The second from 0 through 59.
     * @param millisecond The millisecond from 0 through 999.
     * @param era The era, or zero for the current era.
     */
    override toDateTime(year: number, month: number, day: number, hour: number, minute: number,
        second: number, millisecond: number, era: number = 0): DateTime {
        year = this.checkYearMonthRange(year, month, era);
        this.checkDay(year, month, day);
        const date = this.lunarToGregorian(year, month, day);
        return new DateTime(date.year, date.month, date.day, hour, minute, second, millisecond);
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
        this.checkTicksRange(time.ticks);
        let { year, month, day } = this.timeToLunar(time);
        let index = month + months;
        if (index > 0) {
            let count = this.internalIsLeapYear(year) ? 13 : 12;
            while (index - count > 0) {
                index -= count;
                year++;
                count = this.internalIsLeapYear(year) ? 13 : 12;
            }
        } else {
            while (index <= 0) {
                index += this.internalIsLeapYear(year - 1) ? 13 : 12;
                year--;
            }
        }
        month = index;
        day = Math.min(day, this.internalGetDaysInMonth(year, month));
        const result = this.lunarToTime(time, year, month, day);
        checkAddResult(result.ticks, this.minSupportedDateTime, this.maxSupportedDateTime);
        return result;
    }

    /**
     * Adds the specified number of years to a date and time.
     * @param time The date and time to change.
     * @param years The number of years to add.
     */
    override addYears(time: DateTime, years: number): DateTime {
        this.checkTicksRange(time.ticks);
        let { year, month, day } = this.timeToLunar(time);
        year = (year + years) | 0;
        if (month === 13 && !this.internalIsLeapYear(year)) {
            month = 12;
            day = this.internalGetDaysInMonth(year, month);
        }
        day = Math.min(day, this.internalGetDaysInMonth(year, month));
        const result = this.lunarToTime(time, year, month, day);
        checkAddResult(result.ticks, this.minSupportedDateTime, this.maxSupportedDateTime);
        return result;
    }

    /**
     * Checks a tick value against the calendar's supported range.
     */
    protected checkTicksRange(ticks: bigint): void {
        if (ticks < this.minSupportedDateTime.ticks || ticks > this.maxSupportedDateTime.ticks) {
            throw new ArgumentOutOfRangeException('time', ticks,
                formatExceptionResource(SR.ArgumentOutOfRange_CalendarRange, formatGregorianDateTime(this.minSupportedDateTime), formatGregorianDateTime(this.maxSupportedDateTime)));
        }
    }

    private eraCalendarYear(era: number, minimum: boolean): number {
        const info = this.calEraInfo;
        if (!info) return minimum ? this.minCalendarYear : this.maxCalendarYear;
        if (era === 0) era = this.eras[0]!;
        const date = minimum ? this.minSupportedDateTime : this.maxSupportedDateTime;
        if (era === this.getEra(date)) return this.getYearForDate(minimum ? this.minCalendarYear : this.maxCalendarYear, date);
        const found = info.find(item => item.era === era);
        if (!found) throw new ArgumentOutOfRangeException('era', era, SR.ArgumentOutOfRange_InvalidEraValue);
        return minimum ? found.minEraYear : found.maxEraYear;
    }

    private checkYearRange(year: number, era: number): number {
        const currentEra = era === 0 ? this.eras[0]! : era;
        if (currentEra < this.getEra(this.minSupportedDateTime) || currentEra > this.getEra(this.maxSupportedDateTime)) {
            throw new ArgumentOutOfRangeException('era', currentEra, SR.ArgumentOutOfRange_InvalidEraValue);
        }
        year = this.getGregorianYear(year, era);
        if (year < this.minCalendarYear || year > this.maxCalendarYear) {
            throw new ArgumentOutOfRangeException('year', year,
                calendarRangeMessage(this.eraCalendarYear(era, true), this.eraCalendarYear(era, false)));
        }
        return year;
    }

    private checkYearMonthRange(year: number, month: number, era: number): number {
        year = this.checkYearRange(year, era);
        if (month < 1 || month > 13 || month === 13 && !this.internalIsLeapYear(year)) {
            throw new ArgumentOutOfRangeException('month', month, SR.ArgumentOutOfRange_Month);
        }
        return year;
    }

    private checkDay(year: number, month: number, day: number): void {
        const max = this.internalGetDaysInMonth(year, month);
        if (day < 1 || day > max) {
            throw new ArgumentOutOfRangeException('day', day, formatExceptionResource(SR.ArgumentOutOfRange_Day, max, month));
        }
    }

    private internalGetDaysInMonth(year: number, month: number): number {
        return (this.getYearInfo(year, 3) & (0x8000 >> (month - 1))) === 0 ? 29 : 30;
    }

    private internalIsLeapYear(year: number): boolean {
        return this.getYearInfo(year, 0) !== 0;
    }

    private timeToLunar(time: DateTime): { year: number; month: number; day: number } {
        let year = time.year;
        let day = (DateTime.isLeapYear(year) ? daysToMonth366 : daysToMonth365)[time.month - 1]! + time.day;
        if (year === this.maxCalendarYear + 1) {
            year--;
            day += DateTime.isLeapYear(year) ? 366 : 365;
        } else if (time.month < this.getYearInfo(year, 1)
            || time.month === this.getYearInfo(year, 1) && time.day < this.getYearInfo(year, 2)) {
            year--;
            day += DateTime.isLeapYear(year) ? 366 : 365;
        }
        day -= daysToMonth365[this.getYearInfo(year, 1) - 1]! + this.getYearInfo(year, 2) - 1;
        let month = 1;
        while (day > this.internalGetDaysInMonth(year, month)) {
            day -= this.internalGetDaysInMonth(year, month++);
        }
        return { year, month, day };
    }

    private lunarToGregorian(year: number, month: number, day: number): { year: number; month: number; day: number } {
        let elapsed = day - 1;
        for (let index = 1; index < month; index++) elapsed += this.internalGetDaysInMonth(year, index);
        const days = DateTime.isLeapYear(year) ? daysToMonth366 : daysToMonth365;
        let solarDay = this.getYearInfo(year, 2) + days[this.getYearInfo(year, 1) - 1]! + elapsed;
        const count = DateTime.isLeapYear(year) ? 366 : 365;
        const solarYear = solarDay > count ? year + 1 : year;
        if (solarDay > count) solarDay -= count;
        let solarMonth = 1;
        while (solarMonth < 12 && days[solarMonth]! < solarDay) solarMonth++;
        return { year: solarYear, month: solarMonth, day: solarDay - days[solarMonth - 1]! };
    }

    private lunarToTime(time: DateTime, year: number, month: number, day: number): DateTime {
        const date = this.lunarToGregorian(year, month, day);
        return new DateTime(date.year, date.month, date.day, time.hour, time.minute, time.second, time.millisecond);
    }
}

function checkSexagenaryYear(year: number): void {
    if (year < 1 || year > 60) {
        throw new ArgumentOutOfRangeException('sexagenaryYear', year, calendarRangeMessage(1, 60));
    }
}
