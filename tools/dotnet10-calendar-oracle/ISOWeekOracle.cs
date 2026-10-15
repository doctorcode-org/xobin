using System.Globalization;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

internal static class ISOWeekOracle
{
    internal static string Generate()
    {
        var rows = new List<object>();
        object? Normalize(object? value) => value is DateTime date ? date.Ticks.ToString(CultureInfo.InvariantCulture)
            : value is DateOnly dateOnly ? dateOnly.DayNumber : value;
        void Capture(string source, string operation, object[] arguments, Func<object?> invoke, object? expected = null)
        {
            try
            {
                object? result = Normalize(invoke());
                if (expected is not null && !Equals(result, Normalize(expected))) throw new InvalidOperationException("Official ISOWeek expected value differs.");
                rows.Add(new { source, operation, arguments = arguments.Select(Normalize), result, error = (string?)null });
            }
            catch (ArgumentException error)
            {
                rows.Add(new { source, operation, arguments = arguments.Select(Normalize), result = (object?)null,
                    error = error.GetType().Name, message = error.Message, paramName = error.ParamName,
                    actualValue = (error as ArgumentOutOfRangeException)?.ActualValue });
            }
        }
        foreach (var input in ISOWeekReferenceInputs.GetWeekOfYear_TestData())
            Capture("ISOWeekTests.GetWeekOfYear", "getWeekOfYear", [input[0]], () => ISOWeek.GetWeekOfYear((DateTime)input[0]), input[1]);
        foreach (var input in ISOWeekReferenceInputs.GetWeekOfYear_DateOnly_TestData())
            Capture("ISOWeekTests.GetWeekOfYearUsingDateOnly", "getWeekOfYearDateOnly", [input[0]], () => ISOWeek.GetWeekOfYear((DateOnly)input[0]), input[1]);
        foreach (var input in ISOWeekReferenceInputs.GetYear_TestData())
            Capture("ISOWeekTests.GetYear", "getYear", [input[0]], () => ISOWeek.GetYear((DateTime)input[0]), input[1]);
        foreach (var input in ISOWeekReferenceInputs.GetYear_DateOnly_TestData())
            Capture("ISOWeekTests.GetYearUsingDateOnly", "getYearDateOnly", [input[0]], () => ISOWeek.GetYear((DateOnly)input[0]), input[1]);
        foreach (var input in ISOWeekReferenceInputs.GetYearStart_TestData())
            Capture("ISOWeekTests.GetYearStart", "getYearStart", [input[0]], () => ISOWeek.GetYearStart((int)input[0]), input[1]);
        foreach (var input in ISOWeekReferenceInputs.GetYearEnd_TestData())
            Capture("ISOWeekTests.GetYearEnd", "getYearEnd", [input[0]], () => ISOWeek.GetYearEnd((int)input[0]), input[1]);
        foreach (var input in ISOWeekReferenceInputs.ToDateTime_TestData())
            Capture("ISOWeekTests.ToDateTime", "toDateTime", input.Take(3).ToArray(), () => ISOWeek.ToDateTime((int)input[0], (int)input[1], (DayOfWeek)input[2]), input[3]);
        foreach (var input in ISOWeekReferenceInputs.ToDateOnly_TestData())
            Capture("ISOWeekTests.ToDateOnly", "toDateOnly", input.Take(3).ToArray(), () => ISOWeek.ToDateOnly((int)input[0], (int)input[1], (DayOfWeek)input[2]), input[3]);
        foreach (int year in new[] { 0, 10000 })
        {
            Capture("ISOWeekTests.ToDateTime_WithInvalidYear_Throws", "toDateTime", [year, 1, 5], () => ISOWeek.ToDateTime(year, 1, DayOfWeek.Friday));
            Capture("ISOWeekTests.ToDateTime_WithInvalidYear_Throws", "toDateOnly", [year, 1, 5], () => ISOWeek.ToDateOnly(year, 1, DayOfWeek.Friday));
        }
        foreach (int week in new[] { 0, 54 })
        {
            Capture("ISOWeekTests.ToDateTime_WithInvalidWeek_Throws", "toDateTime", [2018, week, 5], () => ISOWeek.ToDateTime(2018, week, DayOfWeek.Friday));
            Capture("ISOWeekTests.ToDateTime_WithInvalidWeek_Throws", "toDateOnly", [2018, week, 5], () => ISOWeek.ToDateOnly(2018, week, DayOfWeek.Friday));
        }
        foreach (int day in new[] { -1, 8 })
        {
            Capture("ISOWeekTests.ToDateTime_WithInvalidDayOfWeek_Throws", "toDateTime", [2018, 1, day], () => ISOWeek.ToDateTime(2018, 1, (DayOfWeek)day));
            Capture("ISOWeekTests.ToDateTime_WithInvalidDayOfWeek_Throws", "toDateOnly", [2018, 1, day], () => ISOWeek.ToDateOnly(2018, 1, (DayOfWeek)day));
        }
        foreach (var (year, week, day) in new[] {
            (1, 1, 0), (9999, 53, 7), (0, 0, -1), (2018, 0, -1),
            (int.MinValue, 1, 1), (int.MaxValue, 1, 1), (2018, int.MinValue, 1),
            (2018, int.MaxValue, 1), (2018, 1, int.MinValue), (2018, 1, int.MaxValue) })
        {
            Capture("Supplemental.ISOWeek.ConversionBoundary", "toDateTime", [year,week,day], () => ISOWeek.ToDateTime(year,week,(DayOfWeek)day));
            Capture("Supplemental.ISOWeek.ConversionBoundary", "toDateOnly", [year,week,day], () => ISOWeek.ToDateOnly(year,week,(DayOfWeek)day));
        }
        foreach (var input in ISOWeekReferenceInputs.WeeksInYear_TestData())
            Capture("ISOWeekTests.GetWeeksInYear", "getWeeksInYear", [input[0]], () => ISOWeek.GetWeeksInYear((int)input[0]), input[1]);
        foreach (int year in new[] { 0,10000 })
        {
            Capture("ISOWeekTests.GetWeeksInYear_WithInvalidYear_Throws", "getWeeksInYear", [year], () => ISOWeek.GetWeeksInYear(year));
            Capture("Supplemental.ISOWeek.InvalidYear", "getYearStart", [year], () => ISOWeek.GetYearStart(year));
            Capture("Supplemental.ISOWeek.InvalidYear", "getYearEnd", [year], () => ISOWeek.GetYearEnd(year));
        }
        Capture("ISOWeekTests.GetYearEnd_ForYear9999_Throws", "getYearEnd", [9999], () => ISOWeek.GetYearEnd(9999));

        static string ErrorText(ArgumentException error) => string.Join('|', error.GetType().Name, error.ParamName, error.Message, (error as ArgumentOutOfRangeException)?.ActualValue);
        using var yearHash = IncrementalHash.CreateHash(HashAlgorithmName.SHA256);
        for (int year = 1; year <= 9999; year++)
        {
            string end;
            try { end = ISOWeek.GetYearEnd(year).Ticks.ToString(CultureInfo.InvariantCulture); }
            catch (ArgumentException error) { end = ErrorText(error); }
            string line = string.Join('|', year, ISOWeek.GetWeeksInYear(year), ISOWeek.GetYearStart(year).Ticks, end) + "\n";
            yearHash.AppendData(Encoding.UTF8.GetBytes(line));
        }
        var days = new List<object>();
        for (int year = 2000; year < 2400; year++)
        {
            using var hash = IncrementalHash.CreateHash(HashAlgorithmName.SHA256);
            int count = 0;
            for (var date = new DateTime(year,1,1); date.Year == year; date = date.AddDays(1))
            {
                var dateOnly = DateOnly.FromDateTime(date);
                string line = string.Join('|', date.Ticks, ISOWeek.GetWeekOfYear(date), ISOWeek.GetYear(date), ISOWeek.GetWeekOfYear(dateOnly), ISOWeek.GetYear(dateOnly)) + "\n";
                hash.AppendData(Encoding.UTF8.GetBytes(line));
                count++;
            }
            days.Add(new { year, count, sha256 = Convert.ToHexString(hash.GetHashAndReset()).ToLowerInvariant() });
        }
        var conversions = new List<object>();
        foreach (int year in new[] { 1, 9999 }.Concat(Enumerable.Range(2000, 400)))
        {
            using var hash = IncrementalHash.CreateHash(HashAlgorithmName.SHA256);
            int count = 0;
            for (int week = 1; week <= 53; week++)
                for (int day = 0; day <= 7; day++)
                {
                    string dateTime, dateOnly;
                    try { dateTime = ISOWeek.ToDateTime(year,week,(DayOfWeek)day).Ticks.ToString(CultureInfo.InvariantCulture); }
                    catch (ArgumentException error) { dateTime = ErrorText(error); }
                    try { dateOnly = ISOWeek.ToDateOnly(year,week,(DayOfWeek)day).DayNumber.ToString(CultureInfo.InvariantCulture); }
                    catch (ArgumentException error) { dateOnly = ErrorText(error); }
                    hash.AppendData(Encoding.UTF8.GetBytes(string.Join('|', year,week,day,dateTime,dateOnly) + "\n"));
                    count++;
                }
            conversions.Add(new { year, count, sha256 = Convert.ToHexString(hash.GetHashAndReset()).ToLowerInvariant() });
        }
        return JsonSerializer.Serialize(new { runtime = Environment.Version.ToString(), sourceTag = "v10.0.7", rows,
            allYears = new { count = 9999, sha256 = Convert.ToHexString(yearHash.GetHashAndReset()).ToLowerInvariant() }, days, conversions }, new JsonSerializerOptions { WriteIndented = true }) + "\n";
    }
}
