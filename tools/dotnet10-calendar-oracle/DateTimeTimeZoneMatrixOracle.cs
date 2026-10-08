using System.Text.Json;
using System.Reflection;

internal static class DateTimeTimeZoneMatrixOracle
{
    internal static string Generate()
    {
        var rows = new List<object>();
        // Pin the local zone in this oracle process so DateTime's hidden ambiguous-DST
        // bit and Local-kind overloads are exercised by the reference runtime itself.
        var cache = typeof(TimeZoneInfo).GetField("s_cachedData", BindingFlags.NonPublic | BindingFlags.Static)!.GetValue(null)!;
        var localField = cache.GetType().GetField("_localTimeZone", BindingFlags.NonPublic | BindingFlags.Instance)!;
        var original = localField.GetValue(cache);
        try
        {
        foreach (var zone in TimeZoneInfo.GetSystemTimeZones())
        {
            if (!TimeZoneInfo.TryConvertWindowsIdToIanaId(zone.Id, out string? iana)) continue;
            localField.SetValue(cache, zone);
            var dates = new HashSet<DateTime> { DateTime.MinValue, DateTime.MaxValue };
            foreach (int year in new[] { 1, 100, 1601, 1900, 2000, 2018, 2024, 9999 })
                foreach (int month in new[] { 1, 4, 7, 10 }) dates.Add(new DateTime(year, month, 15, 12, 30, 0));
            foreach (var rule in zone.GetAdjustmentRules())
            {
                int year = Math.Max(1, rule.DateStart.Year);
                foreach (var transition in new[] { rule.DaylightTransitionStart, rule.DaylightTransitionEnd })
                {
                    int day;
                    if (transition.IsFixedDateRule) day = Math.Min(transition.Day, DateTime.DaysInMonth(year, transition.Month));
                    else
                    {
                        var first = new DateTime(year, transition.Month, 1);
                        day = 1 + ((int)transition.DayOfWeek - (int)first.DayOfWeek + 7) % 7 + (transition.Week - 1) * 7;
                        if (day > DateTime.DaysInMonth(year, transition.Month)) day -= 7;
                    }
                    var change = new DateTime(year, transition.Month, day).Add(transition.TimeOfDay.TimeOfDay);
                    foreach (long offset in new[] { -72000000000L, -1L, 0L, 1L, 36000000000L, 72000000000L })
                        if (change.Ticks + offset >= 0 && change.Ticks + offset <= DateTime.MaxValue.Ticks)
                            dates.Add(change.AddTicks(offset));
                }
            }
            foreach (var date in dates.OrderBy(value => value.Ticks))
            {
                var utc = DateTime.SpecifyKind(date, DateTimeKind.Utc);
                var local = utc.ToLocalTime();
                var constructedLocal = DateTime.SpecifyKind(date, DateTimeKind.Local);
                rows.Add(new { zone = iana, ticks = date.Ticks.ToString(),
                    offsetLocal = zone.GetUtcOffset(date).Ticks.ToString(), daylightLocal = zone.IsDaylightSavingTime(date),
                    localTicks = local.Ticks.ToString(), offsetUtc = zone.GetUtcOffset(utc).Ticks.ToString(),
                    constructedUtcTicks = constructedLocal.ToUniversalTime().Ticks.ToString(),
                    constructedDaylight = constructedLocal.IsDaylightSavingTime(),
                    roundtripTicks = local.ToUniversalTime().Ticks.ToString(),
                    binary = local.ToBinary().ToString(),
                    binaryRoundtripTicks = DateTime.FromBinary(local.ToBinary()).ToUniversalTime().Ticks.ToString() });
            }
        }
        }
        finally { localField.SetValue(cache, original); }
        return JsonSerializer.Serialize(new { runtime = Environment.Version.ToString(), rows }) + "\n";
    }
}
