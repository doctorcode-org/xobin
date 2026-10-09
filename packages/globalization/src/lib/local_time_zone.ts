import { DaysTo1970, MillisPerDay, TicksPerMillisecond } from './var';

const UnixEpochMilliseconds = DaysTo1970 * MillisPerDay;

/**
 * Gets the host's local offset, preserving the selected occurrence of an overlapping time.
 * @param ticks The date and time expressed as 100-nanosecond ticks.
 * @param utc True when ticks represents a UTC instant; otherwise, a local wall time.
 * @param ambiguousDaylight True to select the earlier occurrence of an overlapping local time.
 */
export function localTimeOffset(ticks: bigint, utc: boolean, ambiguousDaylight = false): { ticks: bigint; daylight: boolean; ambiguousDaylight: boolean } {
    const milliseconds = Number(ticks / TicksPerMillisecond) - UnixEpochMilliseconds;
    const wallTime = utc ? wallMilliseconds(new Date(milliseconds)) : milliseconds;
    const local = new Date(wallTime);
    const resolved = new Date(0);
    resolved.setFullYear(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate());
    resolved.setHours(local.getUTCHours(), local.getUTCMinutes(), local.getUTCSeconds(), local.getUTCMilliseconds());

    const offsets = new Set<number>();
    for (const day of [-2, -1, 0, 1, 2]) {
        offsets.add(offsetMilliseconds(new Date(resolved.getTime() + day * MillisPerDay)));
    }
    const candidates = [...offsets]
        .map(offset => ({ instant: wallTime - offset, offset }))
        .filter(candidate => wallMilliseconds(new Date(candidate.instant)) === wallTime)
        .sort((first, second) => first.instant - second.instant);

    // Date resolves a spring-forward gap using the offset before the transition.
    const selected = utc ? offsetMilliseconds(new Date(milliseconds))
        : candidates.length > 0
            ? candidates[ambiguousDaylight ? 0 : candidates.length - 1]!.offset
            : wallTime - resolved.getTime();
    const ambiguous = utc && candidates.length > 1 && milliseconds === candidates[0]!.instant;

    return {
        ticks: BigInt(selected) * TicksPerMillisecond,
        daylight: selected > standardOffset(local.getUTCFullYear()),
        ambiguousDaylight: ambiguous,
    };
}

/**
 * Reads local components as a UTC timestamp, including historical offsets measured in seconds.
 * @param date The instant whose local components are being read.
 */
function wallMilliseconds(date: Date): number {
    const wall = new Date(0);
    wall.setUTCFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    wall.setUTCHours(date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    return wall.getTime();
}

/**
 * Gets the local offset supplied by the host's time-zone database.
 * @param date The UTC instant for which to obtain the offset.
 */
function offsetMilliseconds(date: Date): number {
    return wallMilliseconds(date) - date.getTime();
}

/**
 * Estimates the standard offset from monthly samples because Date does not expose a DST flag.
 * @param year The local year to sample.
 */
function standardOffset(year: number): number {
    let offset = Infinity;
    for (let month = 0; month < 12; month++) {
        const date = new Date(0);
        date.setUTCFullYear(year, month, 15);
        date.setUTCHours(12, 0, 0, 0);
        offset = Math.min(offset, offsetMilliseconds(date));
    }
    return offset;
}
