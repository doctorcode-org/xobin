using System.Text.Json;

internal static class DateTimeOnlyOracle
{
    internal static string Generate()
    {
        var rows = new List<object>();
        using var existing = JsonDocument.Parse(DateTimeConstructorValidOracle.Generate());
        foreach (var row in existing.RootElement.GetProperty("rows").EnumerateArray())
        {
            string source = row.GetProperty("source").GetString()!;
            var a = row.GetProperty("arguments").EnumerateArray().Select(v => v.GetInt32()).ToArray();
            if (source == "DateTimeTests.Ctor_Int_Int_Int_Int_Int_Int_Int")
            {
                var date = new DateOnly(a[0], a[1], a[2]);
                var time = new TimeOnly(a[3], a[4], a[5], a[6]);
                Add("Ctor_DateOnly_TimeOnly", a, new DateTime(date, time));
                Add("Ctor_DateOnly_TimeOnly_DateTimeKind", a, new DateTime(date, time, DateTimeKind.Local));
            }
            if (source == "DateTimeTests.Ctor_Int_Int_Int_Int_Int_Int_Int_Int")
            {
                var date = new DateTime(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]);
                Add("DeconstructionTest_DateOnly_TimeOnly", a, date);
                Add("DeconstructionTest_Year_Month_Day", a, date);
            }
        }
        return JsonSerializer.Serialize(new { runtime = Environment.Version.ToString(), rows }, new JsonSerializerOptions { WriteIndented = true }) + "\n";

        void Add(string source, int[] arguments, DateTime value)
        {
            value.Deconstruct(out DateOnly date, out TimeOnly time);
            value.Deconstruct(out int year, out int month, out int day);
            rows.Add(new { source = "DateTimeTests." + source, arguments, ticks = value.Ticks.ToString(), kind = (int)value.Kind,
                dayNumber = date.DayNumber, timeTicks = time.Ticks.ToString(), year, month, day,
                hour = time.Hour, minute = time.Minute, second = time.Second,
                millisecond = time.Millisecond, microsecond = time.Microsecond, nanosecond = time.Nanosecond });
        }
    }
}
