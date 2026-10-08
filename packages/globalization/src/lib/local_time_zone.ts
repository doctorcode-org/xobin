import { windowsTimeZones, windowsTimeZoneAliases } from './windows_time_zones';

interface Rule {
    start: number;
    end: number;
    delta: number;
    baseDelta: number;
    transitionStart: readonly number[];
    transitionEnd: readonly number[];
}
interface Zone { baseMinutes: number; rules: readonly Rule[]; }
const zones = windowsTimeZones as Record<string, Zone>;
const UnixEpochMilliseconds = 62135596800000;
const MillisecondsPerDay = 86400000;

function getZone(): Zone | undefined {
    const id = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return zones[windowsTimeZoneAliases[id] ?? id];
}

function transition(year: number, values: readonly number[]): number {
    const [month, day, week, dayOfWeek, milliseconds, fixed] = values;
    const date = new Date(0);
    date.setUTCFullYear(year, month! - 1, fixed ? day! : 1);
    date.setUTCHours(0, 0, 0, 0);
    if (!fixed) {
        let target = 1 + (dayOfWeek! - date.getUTCDay() + 7) % 7 + (week! - 1) * 7;
        const last = new Date(date.getTime());
        last.setUTCMonth(month!, 0);
        if (target > last.getUTCDate()) target -= 7;
        date.setUTCDate(target);
    }
    return date.getTime() + UnixEpochMilliseconds + milliseconds!;
}

function ruleFor(zone: Zone, milliseconds: number): Rule | undefined {
    const dayNumber = Math.floor(milliseconds / MillisecondsPerDay);
    return zone.rules.find(rule => dayNumber >= rule.start && dayNumber <= rule.end);
}

function inInterval(value: bigint, start: bigint, end: bigint): boolean {
    return start < end ? value >= start && value < end : value >= start || value < end;
}

function yearOf(ticks: bigint): number {
    return new Date(Number(ticks / 10000n) - UnixEpochMilliseconds).getUTCFullYear();
}

function withYear(ticks: bigint, year: number): bigint {
    const date = new Date(Number(ticks / 10000n) - UnixEpochMilliseconds);
    const month = date.getUTCMonth();
    if (month === 1 && date.getUTCDate() === 29) {
        date.setUTCDate(28);
        date.setUTCFullYear(year);
        const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
        if (leap) date.setUTCDate(29);
    } else date.setUTCFullYear(year);
    return BigInt(date.getTime() + UnixEpochMilliseconds) * 10000n + ticks % 10000n;
}

function checkDaylight(value: bigint, start: bigint, end: bigint): boolean {
    const year = yearOf(start);
    if (yearOf(end) !== year) end = withYear(end, year);
    if (yearOf(value) !== year) value = withYear(value, year);
    return inInterval(value, start, end);
}

function marker(values: readonly number[]): boolean {
    return values[0] === 1 && values[1] === 1 && values[4]! < 1000;
}

export function localTimeOffset(ticks: bigint, utc: boolean, ambiguousDaylight = false, localKind = true): { ticks: bigint; daylight: boolean; ambiguousDaylight: boolean } {
    const milliseconds = Number(ticks / 10000n);
    const zone = getZone();
    if (!zone) {
        const date = new Date(milliseconds - UnixEpochMilliseconds);
        const minutes = -date.getTimezoneOffset();
        return { ticks: BigInt(minutes) * 600000000n, daylight: false, ambiguousDaylight: false };
    }
    // TimeZoneInfo selects the boundary rule when the base offset leaves DateTime's range.
    const local = utc ? Math.max(0, Math.min(315537811200000, milliseconds + zone.baseMinutes * 60000)) : milliseconds;
    const rule = ruleFor(zone, local);
    let minutes = zone.baseMinutes + (rule?.baseDelta ?? 0);
    let daylight = false;
    let ambiguous = false;
    if (rule && rule.delta !== 0) {
        const year = new Date(local - UnixEpochMilliseconds).getUTCFullYear();
        const delta = BigInt(rule.delta) * 600000000n;
        let start = BigInt(transition(year, rule.transitionStart)) * 10000n;
        let end = BigInt(transition(year, rule.transitionEnd)) * 10000n;
        const startMarker = marker(rule.transitionStart);
        const endMarker = marker(rule.transitionEnd);
        if (startMarker) start = BigInt(transition(year, [1, 1, 1, 0, 0, 1])) * 10000n;
        if (endMarker) end = BigInt(transition(year + 1, [1, 1, 1, 0, 0, 1])) * 10000n - 1n;
        if (utc) {
            start -= BigInt(minutes) * 600000000n;
            end -= BigInt(minutes) * 600000000n + delta;
            let ignoreYear = false;
            if (startMarker && year > 1) {
                const previous = ruleFor(zone, transition(year - 1, [12, 31, 1, 0, 0, 1]));
                if (previous) {
                    const a = transition(year - 1, previous.transitionStart);
                    const b = transition(year - 1, previous.transitionEnd);
                    if (marker(previous.transitionEnd) || a > b) {
                        start = BigInt(a) * 10000n - BigInt(zone.baseMinutes + previous.baseDelta) * 600000000n;
                        ignoreYear = true;
                    }
                }
            }
            if (endMarker && year < 9999) {
                const next = ruleFor(zone, transition(year + 1, [1, 1, 1, 0, 0, 1]));
                if (next) {
                    const a = transition(year + 1, next.transitionStart);
                    const b = transition(year + 1, next.transitionEnd);
                    if (marker(next.transitionStart) || (b < a && !marker(next.transitionEnd))) {
                        const endMilliseconds = marker(next.transitionStart) && marker(next.transitionEnd)
                            ? transition(year + 1, [12, 31, 1, 0, 0, 1]) : b;
                        end = BigInt(endMilliseconds) * 10000n - BigInt(zone.baseMinutes + next.baseDelta + next.delta) * 600000000n;
                        ignoreYear = true;
                    }
                }
            }
            daylight = ignoreYear ? inInterval(ticks, start, end) : checkDaylight(ticks, start, end);
            const overlapStart = delta > 0n ? end - delta : start;
            const overlapEnd = delta > 0n ? end : start - delta;
            ambiguous = daylight && repeatedTime(ticks, overlapStart, overlapEnd);
        } else {
            // A newly constructed ambiguous local value uses the standard offset.
            if (!startMarker && (localKind || delta > 0n)) start += delta;
            if (!endMarker && !localKind && delta > 0n) end -= delta;
            daylight = checkDaylight(ticks, start, end);
            const overlapStart = delta > 0n ? end - delta : start;
            const overlapEnd = delta > 0n ? end : start - delta;
            const hasOverlap = delta > 0n ? !endMarker : !startMarker;
            if (daylight && localKind && hasOverlap && repeatedTime(ticks, overlapStart, overlapEnd)) daylight = ambiguousDaylight;
        }
        if (daylight) minutes += rule.delta;
    }
    return { ticks: BigInt(minutes) * 600000000n, daylight, ambiguousDaylight: ambiguous };
}

function repeatedTime(ticks: bigint, start: bigint, end: bigint): boolean {
    if (ticks >= start && ticks < end) return true;
    if (yearOf(start) === yearOf(end)) return false;
    for (const adjustment of [1, -1]) {
        const startYear = yearOf(start) + adjustment;
        const endYear = yearOf(end) + adjustment;
        if (startYear < 1 || endYear < 1 || startYear > 9999 || endYear > 9999) continue;
        if (ticks >= withYear(start, startYear) && ticks < withYear(end, endYear)) return true;
    }
    return false;
}
