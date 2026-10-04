import { Calendar, checkAddResult, timeToTicks } from './calendar';
import { DateTime } from './date_time';
import { DayOfWeek } from './day_of_week';
import { getOrCreateValue, ArgumentOutOfRangeException, InvalidOperationException, setValue, int } from '@xobin/core';
import { CalendarAlgorithmType } from './calendar_algorithm_type';
import { TicksPerDay, DatePartYear, DatePartMonth, DatePartDay, DatePartDayOfYear } from './var';
import { MeanTropicalYearInDays, persianNewYearOnOrBefore, getNumberOfDays } from './calendrical_helper';
import { calendarRangeMessage, formatGregorianDateTime, throwIfNegativeYear } from './calendar_exception';

const MaxCalendarYear = 9378;
const MaxCalendarMonth = 10;
const MaxCalendarDay = 13;
const MonthsPerYear = 12;
const DaysToMonth = [0, 31, 62, 93, 124, 155, 186, 216, 246, 276, 306, 336, 366];
const s_persianEpoch = Number(new DateTime(622, 3, 22).ticks / TicksPerDay);
const ApproximateHalfYear = 180;

/**
 * Represents the Persian calendar.
 */
export class PersianCalendar extends Calendar {
    static readonly PersianEra = 1;

    /**
     * Initializes a new instance of the PersianCalendar class.
     */
    constructor() {
        super();
    }

    /**
    * Gets the earliest date and time supported by the PersianCalendar class.
    */
   override get minSupportedDateTime(): DateTime {
        return getOrCreateValue(this, 'minSupportedDateTime', () => new DateTime(622, 3, 22));
    }

    /**
    * Gets the latest date and time supported by the PersianCalendar class.
    */
    override get maxSupportedDateTime(): DateTime {
        return DateTime.maxValue;
    }

    /**
    * Gets a value indicating whether the current calendar is solar-based, lunar-based, or lunisolar-based.
    */
    override get algorithmType(): CalendarAlgorithmType {
        return CalendarAlgorithmType.SolarCalendar;
    }

    /**
    * Gets or sets the last year of a 100-year range that can be represented by a 2-digit year.
    */
    override get twoDigitYearMax(): number {
        return getOrCreateValue(this, 'twoDigitYearMax', () => 1429);
    }

    override set twoDigitYearMax(value) {
        if (value < 99 || value > MaxCalendarYear) {
            throw new ArgumentOutOfRangeException('value', value,
                calendarRangeMessage(99, MaxCalendarYear));
        }

        setValue(this, 'twoDigitYearMax', value);
    }

    /**
     * Determines whether the specified year in the specified era is a leap year.
     * @param year An integer from 1 through 9378 that represents the year.
     */
    isLeapYear(year: number, era: number = 0): boolean {
        checkYearRange(year, era);

        if (year == MaxCalendarYear) {
            return false;
        }

        return (getAbsoluteDatePersian(year + 1, 1, 1) - getAbsoluteDatePersian(year, 1, 1)) == 366;
    }

    /**
     * Determines whether the specified month in the specified year and era is a leap month.
     * @param year An integer from 1 through 9378 that represents the year.
     * @param month An integer that represents the month and ranges from 1 through 12 if year is not 9378, or 1 through 10 if year is 9378.
     */
    isLeapMonth(year: number, month: number, era: number = 0): boolean {
        checkYearMonthRange(year, month, era);
        return false;
    }

    /**
     * Determines whether the specified date is a leap day.
     * @param year An integer from 1 through 9378 that represents the year.
     * @param month An integer that represents the month and ranges from 1 through 12 if year is not 9378, or 1 through 10 if year is 9378.
     * @param day An integer from 1 through 31 that represents the day.
     */
    isLeapDay(year: number, month: number, day: number, era: number = 0): boolean {
        // The year/month/era value checking is done in GetDaysInMonth().
        const daysInMonth = this.getDaysInMonth(year, month, era);
        if (day < 1 || day > daysInMonth) {
            throw new ArgumentOutOfRangeException('day', day,
                `Day must be between 1 and ${daysInMonth} for month ${month}.`);
        }

        return this.isLeapYear(year, era) && month == 12 && day == 30;
    }

    /**
     * Returns the leap month for a specified year.
     * @param year An integer from 1 through 9378 that represents the year to convert.
     */
    override getLeapMonth(year: number, era: number = 0): number {
        checkYearRange(year, era);
        return 0;
    }

    /**
     * Returns a DateTime object that is offset the specified number of years from the specified DateTime object.
     * @param time The DateTime to which to add years.
     * @param years The positive or negative number of years to add.
     */
    addYears(time: DateTime, years: number): DateTime {
        return this.addMonths(time, years * 12);
    }

    /**
     * Returns a DateTime object that is offset the specified number of months from the specified DateTime object.
     * @param time The DateTime to which to add months.
     * @param months The positive or negative number of months to add.
     */
    addMonths(time: DateTime, months: number): DateTime {
        if (months < -120000 || months > 120000) {
            throw new ArgumentOutOfRangeException('months', months,
                calendarRangeMessage(-120000, 120000));
        }

        // Get the date in Persian calendar.
        let y = getDatePart.call(this, time.ticks, DatePartYear);
        let m = getDatePart.call(this, time.ticks, DatePartMonth);
        let d = getDatePart.call(this, time.ticks, DatePartDay);
        let i = m - 1 + months;
        if (i >= 0) {
            m = i % 12 + 1;
            y += int(i / 12);
        }
        else {
            m = 12 + (i + 1) % 12;
            y += int((i - 11) / 12);
        }
        const days = this.getDaysInMonth(y, m);
        if (d > days) {
            d = days;
        }

        const ticks = BigInt(getAbsoluteDatePersian(y, m, d)) * TicksPerDay + time.ticks % TicksPerDay;
        checkAddResult(ticks, this.minSupportedDateTime, this.maxSupportedDateTime);
        return new DateTime(ticks);
    }

    /**
     * Returns the day of the month in the specified DateTime object.
     * @param time The DateTime to read.
     */
    getDayOfMonth(time: DateTime): number {
        return getDatePart.call(this, time.ticks, DatePartDay);
    }

    /**
     * Returns the day of the week in the specified DateTime object.
     * @param time The DateTime to read.
     */
    getDayOfWeek(time: DateTime): DayOfWeek {
        return Number((time.ticks / TicksPerDay + 1n) % 7n);
    }

    /**
     * Returns the day of the year in the specified DateTime object.
     * @param time The DateTime to read.
     */
    getDayOfYear(time: DateTime): number {
        return getDatePart.call(this, time.ticks, DatePartDayOfYear);
    }

    /**
     * Returns the year in the specified DateTime object.
     * @param time The DateTime to read.
     */
    getYear(time: DateTime): number {
        return getDatePart.call(this, time.ticks, DatePartYear);
    }

    /**
     * Returns the month in the specified DateTime object.
     * @param time The DateTime to read.
     */
    getMonth(time: DateTime): number {
        return getDatePart.call(this, time.ticks, DatePartMonth);
    }

    /**
     * Returns the number of months in the specified year.
     * @param year An integer from 1 through 9378 that represents the year.
     */
    getMonthsInYear(year: number, era: number = 0): number {
        checkYearRange(year, era);
        if (year == MaxCalendarYear) {
            return MaxCalendarMonth;
        }

        return 12;
    }

    /**
     * Returns the number of days in the specified year.
     * @param year An integer from 1 through 9378 that represents the year.
     */
    getDaysInYear(year: number, era: number = 0): number {
        checkYearRange(year, era);
        if (year == MaxCalendarYear) {
            return DaysToMonth[MaxCalendarMonth - 1]! + MaxCalendarDay;
        }

        return this.isLeapYear(year, era) ? 366 : 365;
    }

    /**
     * Returns the number of days in the specified month of the specified year.
     * @param year An integer from 1 through 9378 that represents the year.
     * @param month An integer that represents the month, and ranges from 1 through 12 if year is not 9378, or 1 through 10 if year is 9378.
     */
    getDaysInMonth(year: number, month: number, era: number = 0): number {
        checkYearMonthRange(year, month, era);

        if ((month == MaxCalendarMonth) && (year == MaxCalendarYear)) {
            return MaxCalendarDay;
        }

        let daysInMonth = DaysToMonth[month]! - DaysToMonth[month - 1]!;
        if ((month == MonthsPerYear) && !this.isLeapYear(year)) {
            --daysInMonth;
        }

        return daysInMonth;
    }

    /**
     * Converts the specified year to a four-digit year representation.
     * @param year An integer from 1 through 9378 that represents the year to convert.
     */
    override toFourDigitYear(year: number): number {
        if (year < 0) {
            throwIfNegativeYear(year);
        }

        if (year < 100) {
            return super.toFourDigitYear(year);
        }

        if (year > MaxCalendarYear) {
            throw new ArgumentOutOfRangeException('year', year, calendarRangeMessage(1, MaxCalendarYear));
        }

        return year;
    }

    /**
     * Returns a DateTime object that is set to the specified date and time.
     * @param year An integer from 1 through 9378 that represents the year.
     * @param month An integer from 1 through 12 that represents the month.
     * @param day An integer from 1 through 31 that represents the day.
     * @param hour An integer from 0 through 23 that represents the hour.
     * @param minute An integer from 0 through 59 that represents the minute.
     * @param second An integer from 0 through 59 that represents the second.
     * @param millisecond An integer from 0 through 999 that represents the millisecond.
     */
    toDateTime(year: number, month: number, day: number, hour: number, minute: number,
        second: number, millisecond: number, era: number = 0): DateTime {
        // The year/month/era checking is done in GetDaysInMonth().
        const daysInMonth = this.getDaysInMonth(year, month, era);
        if (day < 1 || day > daysInMonth) {
            throw new ArgumentOutOfRangeException('day', day,
                `Day must be between 1 and ${daysInMonth} for month ${month}.`);
        }

        const lDate = getAbsoluteDatePersian(year, month, day);

        if (lDate < 0) {
            throw new ArgumentOutOfRangeException(undefined,
                'Year, Month, and Day parameters describe an un-representable DateTime.');
        }

        return new DateTime(BigInt(lDate) * TicksPerDay + timeToTicks(hour, minute, second, millisecond));
    }

    getEra(time: DateTime): number {
        checkTicksRange.call(this, time.ticks);
        return PersianCalendar.PersianEra;
    }

    get eras(): number[] {
        return [PersianCalendar.PersianEra];
    }
}

function checkTicksRange(this: Calendar, ticks: bigint) {
    if (ticks < this.minSupportedDateTime.ticks || ticks > this.maxSupportedDateTime.ticks) {
        throw new ArgumentOutOfRangeException('time', ticks,
            `Specified time is not supported in this calendar. It should be between `
            + `${formatGregorianDateTime(this.minSupportedDateTime)} (Gregorian date) and `
            + `${formatGregorianDateTime(this.maxSupportedDateTime)} (Gregorian date), inclusive.`);
    }
}

function getDatePart(this: Calendar, ticks: bigint, part: number): number {
    checkTicksRange.call(this, ticks);

    // Get the absolute date. The absolute date is the number of days from January 1st, 1 A.D.
    // 1/1/0001 is absolute date 1.
    const numDays = Number(ticks / TicksPerDay) + 1;

    // Calculate the appromixate Persian Year.
    const yearStart = persianNewYearOnOrBefore(numDays);
    const y = int(Math.floor(((yearStart - s_persianEpoch) / MeanTropicalYearInDays) + 0.5)) + 1;

    if (part == DatePartYear) {
        return y;
    }

    // Calculate the Persian Month.
    const ordinalDay = int(numDays - getNumberOfDays(this.toDateTime(y, 1, 1, 0, 0, 0, 0)));
    if (part == DatePartDayOfYear) {
        return ordinalDay;
    }

    const m = monthFromOrdinalDay(ordinalDay);
    if (part == DatePartMonth) {
        return m;
    }

    const d = ordinalDay - daysInPreviousMonths(m);
    // Calculate the Persian Day.
    if (part == DatePartDay) {
        return d;
    }

    // Incorrect part value.
    throw new InvalidOperationException('Internal Error in DateTime and Calendar operations.');
}

function checkEraRange(era: number): void {
    if (era !== 0 && era !== PersianCalendar.PersianEra) {
        throw new ArgumentOutOfRangeException('era', era, 'Era value was not valid.');
    }
}

function checkYearRange(year: number, era: number = 0) {
    checkEraRange(era);
    if (year < 1 || year > MaxCalendarYear) {
        throw new ArgumentOutOfRangeException('year', year,
            calendarRangeMessage(1, MaxCalendarYear));
    }
}

function getAbsoluteDatePersian(year: number, month: number, day: number) {
    if (year < 1 || year > MaxCalendarYear || month < 1 || month > 12) {
        throw new ArgumentOutOfRangeException(undefined,
            'Year, Month, and Day parameters describe an un-representable DateTime.');
    }

    // day is one based, make 0 based since this will be the number of days we add to beginning of year below
    const ordinalDay = daysInPreviousMonths(month) + day - 1;
    const approximateDaysFromEpochForYearStart = int(MeanTropicalYearInDays * (year - 1));
    let yearStart = persianNewYearOnOrBefore(s_persianEpoch + approximateDaysFromEpochForYearStart + ApproximateHalfYear);
    yearStart += ordinalDay;
    return yearStart;
}

function checkYearMonthRange(year: number, month: number, era: number = 0): void {
    checkYearRange(year, era);
    if (year == MaxCalendarYear) {
        if (month > MaxCalendarMonth) {
            throw new ArgumentOutOfRangeException('month', month,
                calendarRangeMessage(1, MaxCalendarMonth));
        }
    }

    if (month < 1 || month > 12) {
        throw new ArgumentOutOfRangeException('month', month,
            'Month must be between one and twelve.');
    }
}

function monthFromOrdinalDay(ordinalDay: number): number {
    let index = 0;
    while (ordinalDay > DaysToMonth[index]!) {
        index++;
    }

    return index;
}

function daysInPreviousMonths(month: number): number {
    // months are one based but for calculations use 0 based
    --month;
    return DaysToMonth[month]!;
}
