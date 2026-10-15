import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForFunction(() => window.xobin);
});

test('exact ticks, arithmetic and direct entry identity', async ({ page }) => {
    const result = await page.evaluate(() => {
        const { DateTime, DirectDateTime, TimeSpan, DirectTimeSpan } = window.xobin;
        const value = DateTime.maxValue.addTicks(-1n);
        return { ticks: value.ticks.toString(), expected: (DateTime.maxValue.ticks - 1n).toString(),
            dateIdentity: DateTime === DirectDateTime, spanIdentity: TimeSpan === DirectTimeSpan,
            interval: TimeSpan.fromHours(2).add(TimeSpan.fromMinutes(30)).toString('c') };
    });
    expect(result.ticks).toBe(result.expected);
    expect(result.dateIdentity).toBe(true);
    expect(result.spanIdentity).toBe(true);
    expect(result.interval).toBe('02:30:00');
});

test('culture data is lazy, default/full remain independent', async ({ page }) => {
    const requests = [];
    page.on('request', request => requests.push(request.url()));
    const result = await page.evaluate(async () => {
        const { CultureInfo, DateTime, loadLocale, HijriCalendar } = window.xobin;
        const initial = CultureInfo.currentCulture.name;
        const data = await loadLocale('fa-IR');
        const standard = CultureInfo.loadCultureInfo('fa-IR', data);
        const date = new DateTime(2024, 3, 20, 13, 45, 0);
        const value = date.toString('yyyy/MM/dd HH:mm', standard);
        let rejected = false;
        try { standard.dateTimeFormat.calendar = new HijriCalendar(); } catch { rejected = true; }
        const full = CultureInfo.loadCultureInfo('fa-IR', await loadLocale('fa-IR', true));
        return { initial, value, rejected, defaultCount: standard.optionalCalendars.length,
            fullCount: full.optionalCalendars.length, currentUnchanged: CultureInfo.currentCulture.name === initial };
    });
    expect(result).toEqual({ initial: '', value: '1403/01/01 13:45', rejected: true, defaultCount: 1, fullCount: 3, currentUnchanged: true });
    expect(requests.some(url => /en-US/.test(url))).toBe(false);
    expect(requests.some(url => /fa-IR/.test(url))).toBe(true);
});

test('all concrete calendars roundtrip a modern date', async ({ page }) => {
    const result = await page.evaluate(() => {
        const api = window.xobin;
        const names = ['GregorianCalendar', 'PersianCalendar', 'ThaiBuddhistCalendar', 'UmAlQuraCalendar',
            'KoreanCalendar', 'TaiwanCalendar', 'JapaneseCalendar', 'HijriCalendar', 'HebrewCalendar', 'JulianCalendar',
            'ChineseLunisolarCalendar', 'JapaneseLunisolarCalendar', 'KoreanLunisolarCalendar', 'TaiwanLunisolarCalendar'];
        const date = new api.DateTime(2024, 3, 20);
        return names.map(name => {
            const calendar = new api[name]();
            const value = calendar.toDateTime(calendar.getYear(date), calendar.getMonth(date), calendar.getDayOfMonth(date), 0, 0, 0, 0, calendar.getEra(date));
            return [name, value.ticks === date.ticks];
        });
    });
    expect(result).toHaveLength(14);
    for (const [name, valid] of result) expect(valid, name).toBe(true);
});

test('UTF-8 and UTF-16 formatting and undersized buffers', async ({ page }) => {
    const result = await page.evaluate(async () => {
        const { DateTime, CultureInfo, loadLocale } = window.xobin;
        const culture = CultureInfo.loadCultureInfo('fa-IR', await loadLocale('fa-IR'));
        const date = new DateTime(2024, 3, 20);
        const text = date.toString('D', culture);
        const bytes = new TextEncoder().encode(text);
        const destination = new Uint8Array(bytes.length);
        const written = { result: -1 };
        const success = date.tryFormat(destination, written, 'D', culture);
        const decoded = new TextDecoder().decode(destination);
        const small = new Uint8Array(bytes.length - 1).fill(99);
        const failed = date.tryFormat(small, written, 'D', culture);
        const utf16 = new Uint16Array(text.length);
        date.tryFormat(utf16, written, 'D', culture);
        return { text, decoded, success, failed, smallUnchanged: small.every(x => x === 99), utf16: String.fromCharCode(...utf16) };
    });
    expect(result.success).toBe(true);
    expect(result.failed).toBe(false);
    expect(result.smallUnchanged).toBe(true);
    expect(result.decoded).toBe(result.text);
    expect(result.utf16).toBe(result.text);
});

test('date/time conversions and string transport retain single ticks', async ({ page }) => {
    const result = await page.evaluate(() => {
        const { DateTime, DateTimeKind, DateOnly, TimeOnly, TimeSpan } = window.xobin;
        const original = new DateTime(638464896000000001n, DateTimeKind.utc);
        const wire = JSON.parse(JSON.stringify({ ticks: original.ticks.toString(), kind: original.kind.value }));
        const restored = new DateTime(BigInt(wire.ticks), new DateTimeKind(wire.kind));
        const combined = new DateTime(DateOnly.fromDateTime(restored), TimeOnly.fromDateTime(restored), restored.kind);
        return { same: combined.ticks === original.ticks, kind: combined.kind.value,
            span: TimeOnly.fromTimeSpan(new TimeSpan(1n)).toTimeSpan().ticks.toString() };
    });
    expect(result).toEqual({ same: true, kind: 1, span: '1' });
});

test('native local conversions preserve overlapping UTC instants', async ({ browser }) => {
    for (const timezoneId of ['UTC', 'Asia/Tehran', 'America/New_York', 'Europe/Berlin', 'Australia/Lord_Howe']) {
        const context = await browser.newContext({ timezoneId });
        try {
            const page = await context.newPage();
            await page.goto('http://127.0.0.1:4179');
            await page.waitForFunction(() => window.xobin);
            const results = await page.evaluate(() => {
                const { DateTime, DateTimeKind } = window.xobin;
                return ['2024-11-03T05:30:00Z', '2024-11-03T06:30:00Z', '2024-04-06T15:15:00Z'].map(iso => {
                    const native = new Date(iso);
                    const ticks = BigInt(native.getTime()) * 10000n + 621355968000000000n + 1n;
                    const local = new DateTime(ticks, DateTimeKind.utc).toLocalTime();
                    return local.toUniversalTime().ticks === ticks && local.hour === native.getHours() && local.minute === native.getMinutes();
                });
            });
            expect(results.every(Boolean), timezoneId).toBe(true);
        } finally { await context.close(); }
    }
});
