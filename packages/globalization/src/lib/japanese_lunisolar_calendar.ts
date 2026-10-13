import * as SR from '@xobin/core/internal/exception-resources';
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

import { ArgumentException, ArgumentOutOfRangeException } from '@xobin/core';
import { EastAsianLunisolarCalendar } from './east_asian_lunisolar_calendar';
import { DateTime } from './date_time';
import { calendarRangeMessage } from './calendar_exception';
import { registerCalendarIdentity } from './calendar_identity';
import { EraInfo } from './era_info';
import { yearInfo } from './japanese_lunisolar_calendar_data';
import { GregorianCalendarHelper } from './gregorian_calendar_helper';

/**
 * Represents the Japanese lunisolar calendar.
 */
export class JapaneseLunisolarCalendar extends EastAsianLunisolarCalendar {
    /**
     * Represents the calendar's era constant.
     */
    static readonly JapaneseEra = 1;

    private readonly _eraInfo = [
        new EraInfo(5, 2019, 5, 1, 2018, 1, 7981),
        new EraInfo(4, 1989, 1, 8, 1988, 1, 31),
        new EraInfo(3, 1926, 12, 25, 1925, 1, 64),
        new EraInfo(2, 1912, 7, 30, 1911, 1, 15),
        new EraInfo(1, 1868, 9, 8, 1867, 1, 45)
    ];

    private readonly _helper = new GregorianCalendarHelper(this, this._eraInfo.filter(info =>
        info.yearOffset + info.minEraYear < 2049 && info.yearOffset + info.maxEraYear >= 1960));

    /**
     * Initializes a new instance of the JapaneseLunisolarCalendar class.
     */
    constructor() {
        super();
    }

    /**
     * Gets the earliest date and time supported by this calendar.
     */
    override get minSupportedDateTime(): DateTime {
        return new DateTime(1960, 1, 28);
    }

    /**
     * Gets the latest date and time supported by this calendar.
     */
    override get maxSupportedDateTime(): DateTime {
        return new DateTime(2050, 1, 22, 23, 59, 59, 999).addTicks(9999n);
    }

    /**
     * Gets the number of days in the year preceding the minimum supported year.
     */
    protected override get daysInYearBeforeMinSupportedYear(): number {
        return 354;
    }

    /**
     * Gets the first supported lunisolar year.
     */
    protected override get minCalendarYear(): number {
        return 1960;
    }

    /**
     * Gets the last supported lunisolar year.
     */
    protected override get maxCalendarYear(): number {
        return 2049;
    }

    /**
     * Gets the era definitions used for year validation.
     */
    protected override get calEraInfo(): readonly EraInfo[] | null {
        return this._eraInfo;
    }

    /**
     * Gets the base Gregorian calendar identity for year settings.
     */
    protected override get baseCalendarID(): number {
        return 3;
    }

    /**
     * Gets the selected field of a lunisolar year table entry.
     */
    protected override getYearInfo(lunarYear: number, index: number): number {
        if (lunarYear < 1960 || lunarYear > 2049) {
            throw new ArgumentOutOfRangeException('year', lunarYear, calendarRangeMessage(1960, 2049));
        }
        return yearInfo[lunarYear - 1960]![index]!;
    }

    /**
     * Converts a lunisolar year to the year of the date's era.
     */
    protected override getYearForDate(year: number, time: DateTime): number {
        const info = this._helper.eraInfo.find(item => time.ticks >= item.ticks && year > item.yearOffset);
        if (!info) throw new ArgumentException(SR.Argument_NoEra);
        return year - info.yearOffset;
    }

    /**
     * Converts the specified era year to a Gregorian year.
     */
    protected override getGregorianYear(year: number, era: number): number {
        this._helper.getDaysInYear(year, era);
        const info = this._helper.eraInfo.find(item => item.era === (era === 0 ? this._helper.eras[0] : era))!;
        return year + info.yearOffset;
    }

    /**
     * Gets the era for the specified date.
     * @param time The date and time to examine.
     */
    override getEra(time: DateTime): number {
        return this._helper.getEra(time);
    }

    /**
     * Gets the eras supported by this calendar.
     */
    override get eras(): number[] {
        return this._helper.eras;
    }
}

registerCalendarIdentity(JapaneseLunisolarCalendar.prototype, 'JapaneseLunisolarCalendar', () => 14);
