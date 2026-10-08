using System.Text.Json;

internal static class WindowsTimeZoneOracle
{
    internal static string Generate(string aliasesFile)
    {
        object Transition(TimeZoneInfo.TransitionTime value) => new[] { value.Month, value.Day, value.Week,
            (int)value.DayOfWeek, value.TimeOfDay.Hour * 3600000 + value.TimeOfDay.Minute * 60000
                + value.TimeOfDay.Second * 1000 + value.TimeOfDay.Millisecond, value.IsFixedDateRule ? 1 : 0 };
        var zones = TimeZoneInfo.GetSystemTimeZones().ToDictionary(zone => zone.Id, zone => new {
            baseMinutes = (int)zone.BaseUtcOffset.TotalMinutes,
            rules = zone.GetAdjustmentRules().Select(rule => new {
                start = new DateOnly(rule.DateStart.Year, rule.DateStart.Month, rule.DateStart.Day).DayNumber,
                end = new DateOnly(rule.DateEnd.Year, rule.DateEnd.Month, rule.DateEnd.Day).DayNumber,
                delta = (int)rule.DaylightDelta.TotalMinutes,
                baseDelta = (int)rule.BaseUtcOffsetDelta.TotalMinutes,
                transitionStart = Transition(rule.DaylightTransitionStart),
                transitionEnd = Transition(rule.DaylightTransitionEnd)
            }).ToArray()
        });
        var aliases = new Dictionary<string, string>();
        foreach (string iana in JsonSerializer.Deserialize<string[]>(File.ReadAllText(aliasesFile))!)
            if (TimeZoneInfo.TryConvertIanaIdToWindowsId(iana, out string? windows)) aliases[iana] = windows;
        return "// Generated from .NET 10.0.7 Windows TimeZoneInfo.\nexport const windowsTimeZones: unknown = "
            + JsonSerializer.Serialize(zones) + ";\nexport const windowsTimeZoneAliases: Record<string, string> = "
            + JsonSerializer.Serialize(aliases) + ";\n";
    }
}
