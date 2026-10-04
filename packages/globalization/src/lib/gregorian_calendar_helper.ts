import { ArgumentException, ArgumentOutOfRangeException, int } from '@xobin/core';
import { Calendar, checkAddResult, timeToTicks } from './calendar';
import { calendarRangeMessage, formatGregorianDateTime } from './calendar_exception';
import { DateTime } from './date_time';
import { DayOfWeek } from './day_of_week';
import { EraInfo } from './era_info';
import { DaysToMonth365, DaysToMonth366, getAbsoluteDate, GregorianCalendar } from './gregorian_calendar';
import { CalendarWeekRule } from './calendar_week_rule';
import { TicksPerDay } from './var';

export class GregorianCalendarHelper {
    constructor(public readonly cal: Calendar, public readonly eraInfo: EraInfo[]) { }

    get minYear(): number {
        return this.eraInfo[0]!.minEraYear;
    }

    get maxYear(): number {
        return this.eraInfo[0]!.maxEraYear;
    }

    private getYearOffset(year: number, era: number): number {
        if (year < 0) {
            throw new ArgumentOutOfRangeException('year', 'Non-negative number required.');
        }

        const currentEra = this.eraInfo[0]!.era;
        if (era === 0) era = currentEra;
        const info = this.eraInfo.find(item => item.era === era);
        if (!info) {
            throw new ArgumentOutOfRangeException('era', 'Era value was not valid.');
        }
        if (year < info.minEraYear || year > info.maxEraYear) {
            throw new ArgumentOutOfRangeException('year',
                calendarRangeMessage(info.minEraYear, info.maxEraYear));
        }
        return info.yearOffset;
    }

    private getGregorianYear(year: number, era: number): number {
        return year + this.getYearOffset(year, era);
    }

    private checkTicksRange(ticks: bigint): void {
        if (ticks < this.cal.minSupportedDateTime.ticks || ticks > this.cal.maxSupportedDateTime.ticks) {
            throw new ArgumentOutOfRangeException('time',
                `Specified time is not supported in this calendar. It should be between `
                + `${formatGregorianDateTime(this.cal.minSupportedDateTime)} (Gregorian date) and `
                + `${formatGregorianDateTime(this.cal.maxSupportedDateTime)} (Gregorian date), inclusive.`);
        }
    }

    addMonths(time: DateTime, months: number): DateTime {
        if (months < -120000 || months > 120000) {
            throw new ArgumentOutOfRangeException('months', calendarRangeMessage(-120000, 120000));
        }
        this.checkTicksRange(time.ticks);

        let year = time.year;
        let month = time.month;
        let day = time.day;
        const index = month - 1 + months;
        if (index >= 0) {
            month = index % 12 + 1;
            year += int(index / 12);
        } else {
            month = 12 + (index + 1) % 12;
            year += int((index - 11) / 12);
        }
        const days = isGregorianLeapYear(year) ? DaysToMonth366 : DaysToMonth365;
        day = Math.min(day, days[month]! - days[month - 1]!);
        const ticks = BigInt(getAbsoluteDate(year, month, day)) * TicksPerDay + time.ticks % TicksPerDay;
        checkAddResult(ticks, this.cal.minSupportedDateTime, this.cal.maxSupportedDateTime);
        return new DateTime(ticks);
    }

    addYears(time: DateTime, years: number): DateTime {
        return this.addMonths(time, years * 12);
    }

    getDayOfMonth(time: DateTime): number {
        this.checkTicksRange(time.ticks);
        return time.day;
    }

    getDayOfWeek(time: DateTime): DayOfWeek {
        this.checkTicksRange(time.ticks);
        return time.dayOfWeek;
    }

    getDayOfYear(time: DateTime): number {
        this.checkTicksRange(time.ticks);
        return time.dayOfYear;
    }

    getDaysInMonth(year: number, month: number, era: number = 0): number {
        year = this.getGregorianYear(year, era);
        if (month < 1 || month > 12) {
            throw new ArgumentOutOfRangeException('month', month, 'Month must be between one and twelve.');
        }
        const days = isGregorianLeapYear(year) ? DaysToMonth366 : DaysToMonth365;
        return days[month]! - days[month - 1]!;
    }

    getDaysInYear(year: number, era: number = 0): number {
        return isGregorianLeapYear(this.getGregorianYear(year, era)) ? 366 : 365;
    }

    getEra(time: DateTime): number {
        const info = this.eraInfo.find(item => time.ticks >= item.ticks);
        if (!info) {
            throw new ArgumentOutOfRangeException('time', 'Era value was not valid.');
        }
        return info.era;
    }

    get eras(): number[] {
        return this.eraInfo.map(item => item.era);
    }

    getMonth(time: DateTime): number {
        this.checkTicksRange(time.ticks);
        return time.month;
    }

    getMonthsInYear(year: number, era: number = 0): number {
        this.getYearOffset(year, era);
        return 12;
    }

    getYear(time: DateTime): number {
        this.checkTicksRange(time.ticks);
        const info = this.eraInfo.find(item => time.ticks >= item.ticks);
        if (!info) throw new ArgumentException('No era exists for the specified date.');
        return time.year - info.yearOffset;
    }

    isLeapDay(year: number, month: number, day: number, era: number = 0): boolean {
        const daysInMonth = this.getDaysInMonth(year, month, era);
        if (day < 1 || day > daysInMonth) {
            throw new ArgumentOutOfRangeException('day', calendarRangeMessage(1, daysInMonth));
        }
        return this.isLeapYear(year, era) && month === 2 && day === 29;
    }

    getLeapMonth(year: number, era: number = 0): number {
        this.getYearOffset(year, era);
        return 0;
    }

    isLeapMonth(year: number, month: number, era: number = 0): boolean {
        this.getYearOffset(year, era);
        if (month < 1 || month > 12) {
            throw new ArgumentOutOfRangeException('month', calendarRangeMessage(1, 12));
        }
        return false;
    }

    isLeapYear(year: number, era: number = 0): boolean {
        return isGregorianLeapYear(this.getGregorianYear(year, era));
    }

    getWeekOfYear(time: DateTime, rule: CalendarWeekRule, firstDayOfWeek: DayOfWeek): number {
        this.checkTicksRange(time.ticks);
        return GregorianCalendar.defaultInstance.getWeekOfYear(time, rule, firstDayOfWeek);
    }

    toFourDigitYear(year: number, twoDigitYearMax: number): number {
        if (year < 0) {
            throw new ArgumentOutOfRangeException('year', year,
                `year ('${year}') must be a non-negative value.`);
        }
        if (year < 100) {
            return (int(twoDigitYearMax / 100) - (year > twoDigitYearMax % 100 ? 1 : 0)) * 100 + year;
        }
        if (year < this.minYear || year > this.maxYear) {
            throw new ArgumentOutOfRangeException('year', calendarRangeMessage(this.minYear, this.maxYear));
        }
        return year;
    }

    toDateTime(year: number, month: number, day: number, hour: number, minute: number,
        second: number, millisecond: number, era: number = 0): DateTime {
        year = this.getGregorianYear(year, era);
        const ticks = BigInt(getAbsoluteDate(year, month, day)) * TicksPerDay
            + timeToTicks(hour, minute, second, millisecond);
        this.checkTicksRange(ticks);
        return new DateTime(ticks);
    }
}

function isGregorianLeapYear(year: number): boolean {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
