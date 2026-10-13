import * as SR from '@xobin/core/internal/exception-resources';
﻿import { ArgumentOutOfRangeException } from '@xobin/core';

export const LongMaxValue = 9223372036854775807n;
export const LongMinValue = -9223372036854775808n;

export const TicksPerMicrosecond = 10n;
export const TicksPerMillisecond = TicksPerMicrosecond * 1000n;
export const TicksPerSecond = TicksPerMillisecond * 1000n;
export const TicksPerMinute = TicksPerSecond * 60n;
export const TicksPerHour = TicksPerMinute * 60n;
export const TicksPerDay = TicksPerHour * 24n;

export const MaxSeconds = LongMaxValue / TicksPerSecond;
export const MinSeconds = LongMinValue / TicksPerSecond;

export const MaxMilliseconds = LongMaxValue / TicksPerMillisecond;
export const MinMilliseconds = LongMinValue / TicksPerMillisecond;
export const MaxMicroseconds = LongMaxValue / TicksPerMicrosecond;
export const MinMicroseconds = LongMinValue / TicksPerMicrosecond;

//----------------------------------------------------------------------------------------
// Number of milliseconds per time unit
export const MillisPerSecond = 1000;
export const MillisPerMinute = MillisPerSecond * 60;
export const MillisPerHour = MillisPerMinute * 60;
export const MillisPerDay = MillisPerHour * 24;

// Number of days in a non-leap year
export const DaysPerYear = 365;
// Number of days in 4 years
export const DaysPer4Years = DaysPerYear * 4 + 1;       // 1461
// Number of days in 100 years
export const DaysPer100Years = DaysPer4Years * 25 - 1;  // 36524
// Number of days in 400 years
export const DaysPer400Years = DaysPer100Years * 4 + 1; // 146097

// Number of days from 1/1/0001 to 12/31/1600
export const DaysTo1601 = DaysPer400Years * 4;          // 584388
// Number of days from 1/1/0001 to 12/30/1899
export const DaysTo1899 = DaysPer400Years * 4 + DaysPer100Years * 3 - 367;
// Number of days from 1/1/0001 to 12/31/1969
export const DaysTo1970 = DaysPer400Years * 4 + DaysPer100Years * 3 + DaysPer4Years * 17 + DaysPerYear; // 719,162
// Number of days from 1/1/0001 to 12/31/9999
export const DaysTo10000 = DaysPer400Years * 25 - 366;  // 3652059

export const MinTicks = 0n;
export const MaxTicks = BigInt(DaysTo10000) * TicksPerDay - 1n;
export const MaxMillis = Number(MaxTicks / TicksPerMillisecond);

export const DatePartYear = 0;
export const DatePartDayOfYear = 1;
export const DatePartMonth = 2;
export const DatePartDay = 3;

//----------------------------------------------------------------------------------------

export function getTimezoneOffset(): number {
    return (new Date()).getTimezoneOffset();
}

export function timeToTicks(hour: number, minute: number, second: number): bigint {
    // totalSeconds is bounded by 2^31 * 2^12 + 2^31 * 2^8 + 2^31,
    // which is less than 2^44, meaning we won't overflow totalSeconds.
    const totalSeconds = BigInt(hour) * 3600n + BigInt(minute) * 60n + BigInt(second);
    if (totalSeconds > MaxSeconds || totalSeconds < MinSeconds)
        throw new ArgumentOutOfRangeException(null, SR.Overflow_TimeSpanTooLong);
    return totalSeconds * TicksPerSecond;
}
