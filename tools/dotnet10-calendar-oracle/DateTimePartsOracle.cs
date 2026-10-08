using System.Globalization;
using System.Text.Json;

internal static class DateTimePartsOracle
{
    private const string DayOfWeekSource = "DateTimeTests.DayOfWeek_Get_ReturnsExpected";
    private const string DayOfYearSource = "DateTimeTests.DayOfYear_Get_ReturnsExpected";
    private const string DayOfYearRandomSource = "DateTimeTests.DayOfYear_Random";
    private const string TimeOfDaySource = "DateTimeTests.TimeOfDay_Get_ReturnsExpected";

    internal static string Generate()
    {
        var rows = new List<string>();

        void Capture(string source, DateTime date, string origin)
        {
            rows.Add(JsonSerializer.Serialize(new
            {
                source,
                origin,
                ticks = date.Ticks.ToString(CultureInfo.InvariantCulture),
                kind = (int)date.Kind,
                dayOfWeek = (int)date.DayOfWeek,
                dayOfYear = date.DayOfYear,
                timeOfDayTicks = date.TimeOfDay.Ticks.ToString(CultureInfo.InvariantCulture),
            }));
        }

        Capture(DayOfWeekSource, new DateTime(2012, 6, 18), "official");
        Capture(DayOfYearSource, new DateTime(2012, 6, 18), "official");

        var random = new Random(2022);
        for (int i = 0; i < 1000; i++)
            Capture(DayOfYearRandomSource, new DateTime(random.NextInt64(DateTime.MaxValue.Ticks)), "official-seeded-random");

        Capture(TimeOfDaySource, new DateTime(2012, 6, 18, 10, 5, 1, 0), "official");

        foreach (DateTime date in new[]
        {
            DateTime.MinValue,
            new DateTime(1, 12, 31, 23, 59, 59, 999).AddTicks(9999),
            new DateTime(4, 2, 28),
            new DateTime(4, 2, 29, 12, 0, 0),
            new DateTime(4, 3, 1),
            new DateTime(100, 2, 28),
            new DateTime(100, 3, 1),
            new DateTime(400, 2, 28),
            new DateTime(400, 2, 29),
            new DateTime(400, 3, 1),
            new DateTime(1900, 2, 28),
            new DateTime(1900, 3, 1),
            new DateTime(2000, 2, 28),
            new DateTime(2000, 2, 29),
            new DateTime(2000, 3, 1),
            new DateTime(9999, 1, 1),
            DateTime.MaxValue,
        }) Capture("DateTimePartsOracle.Boundaries", date, "range-boundary");

        long preciseTicks = new DateTime(2024, 2, 29, 23, 59, 59, 999).Ticks + 9999;
        foreach (DateTimeKind kind in new[] { DateTimeKind.Unspecified, DateTimeKind.Utc, DateTimeKind.Local })
            Capture("DateTimePartsOracle.KindPreservation", new DateTime(preciseTicks, kind), "kind-preservation");

        return "{\n  \"runtime\": \"10.0.7\",\n  \"rows\": [\n"
            + string.Join(",\n", rows.Select(row => "    " + row))
            + "\n  ]\n}\n";
    }
}
