using System.Globalization;
using System.Text.Json;

if (Environment.Version.ToString() != "10.0.7")
    throw new InvalidOperationException($"Expected .NET 10.0.7, got {Environment.Version}.");
CultureInfo.CurrentCulture = CultureInfo.InvariantCulture;
CultureInfo.CurrentUICulture = CultureInfo.GetCultureInfo("en-US");
if (args.Length >= 2 && args[0] == "--gregorian")
{
    if (args.Length > 3 || (args.Length == 3 && args[2] != "--check"))
        throw new ArgumentException("Pass --gregorian, the fixture output path, and optionally --check.");
    string gregorianFixture = GregorianOracle.Generate();
    if (args.Length == 3)
    {
        if (!File.Exists(args[1]) || File.ReadAllText(args[1]) != gregorianFixture)
            throw new InvalidOperationException("Gregorian fixture differs from the .NET 10.0.7 output.");
    }
    else
    {
        File.WriteAllText(args[1], gregorianFixture);
    }
    return;
}
if (args.Length >= 2 && args[0] == "--thai-buddhist")
{
    if (args.Length > 3 || (args.Length == 3 && args[2] != "--check"))
        throw new ArgumentException("Pass --thai-buddhist, the fixture output path, and optionally --check.");
    string thaiFixture = ThaiBuddhistOracle.Generate();
    if (args.Length == 3)
    {
        if (!File.Exists(args[1]) || File.ReadAllText(args[1]) != thaiFixture)
            throw new InvalidOperationException("Thai Buddhist fixture differs from the .NET 10.0.7 output.");
    }
    else
    {
        File.WriteAllText(args[1], thaiFixture);
    }
    return;
}
if (args.Length >= 2 && args[0] == "--persian")
{
    if (args.Length > 3 || (args.Length == 3 && args[2] != "--check"))
        throw new ArgumentException("Pass --persian, the fixture output path, and optionally --check.");
    string persianFixture = PersianOracle.Generate();
    if (args.Length == 3)
    {
        if (!File.Exists(args[1]) || File.ReadAllText(args[1]) != persianFixture)
            throw new InvalidOperationException("Persian fixture differs from the .NET 10.0.7 output.");
    }
    else
    {
        File.WriteAllText(args[1], persianFixture);
    }
    return;
}
if (args.Length >= 2 && args[0] == "--um-al-qura")
{
    if (args.Length > 3 || (args.Length == 3 && args[2] != "--check"))
        throw new ArgumentException("Pass --um-al-qura, the fixture output path, and optionally --check.");
    string umAlQuraFixture = UmAlQuraOracle.Generate();
    if (args.Length == 3)
    {
        if (!File.Exists(args[1]) || File.ReadAllText(args[1]) != umAlQuraFixture)
            throw new InvalidOperationException("Um Al Qura fixture differs from the .NET 10.0.7 output.");
    }
    else
    {
        File.WriteAllText(args[1], umAlQuraFixture);
    }
    return;
}
if (args.Length >= 2 && args[0] == "--calendar-state")
{
    if (args.Length > 3 || (args.Length == 3 && args[2] != "--check"))
        throw new ArgumentException("Pass --calendar-state, the fixture output path, and optionally --check.");
    string calendarStateFixture = CalendarStateOracle.Generate();
    if (args.Length == 3)
    {
        if (!File.Exists(args[1]) || File.ReadAllText(args[1]) != calendarStateFixture)
            throw new InvalidOperationException("Calendar state fixture differs from the .NET 10.0.7 output.");
    }
    else
    {
        File.WriteAllText(args[1], calendarStateFixture);
    }
    return;
}
if (args.Length >= 2 && args[0] == "--calendar-invalid-date")
{
    if (args.Length > 3 || (args.Length == 3 && args[2] != "--check"))
        throw new ArgumentException("Pass --calendar-invalid-date, the fixture output path, and optionally --check.");
    string invalidDateFixture = CalendarInvalidDateOracle.Generate();
    if (args.Length == 3)
    {
        if (!File.Exists(args[1]) || File.ReadAllText(args[1]) != invalidDateFixture)
            throw new InvalidOperationException("Calendar invalid date fixture differs from the .NET 10.0.7 output.");
    }
    else
    {
        File.WriteAllText(args[1], invalidDateFixture);
    }
    return;
}
if (args.Length >= 2 && args[0] == "--calendar-conversion")
{
    if (args.Length > 3 || (args.Length == 3 && args[2] != "--check"))
        throw new ArgumentException("Pass --calendar-conversion, the fixture output path, and optionally --check.");
    string conversionFixture = CalendarConversionOracle.Generate();
    if (args.Length == 3)
    {
        if (!File.Exists(args[1]) || File.ReadAllText(args[1]) != conversionFixture)
            throw new InvalidOperationException("Calendar conversion fixture differs from the .NET 10.0.7 output.");
    }
    else
    {
        File.WriteAllText(args[1], conversionFixture);
    }
    return;
}
if (args.Length is < 1 or > 2 || (args.Length == 2 && args[1] != "--check"))
    throw new ArgumentException("Pass the fixture output path, optionally followed by --check.");

var calendarFactories = new Dictionary<string, Func<Calendar>>
{
    ["Gregorian"] = () => new GregorianCalendar(),
    ["Persian"] = () => new PersianCalendar(),
    ["ThaiBuddhist"] = () => new ThaiBuddhistCalendar(),
    ["UmAlQura"] = () => new UmAlQuraCalendar(),
};

var exceptionConstructors = new[]
{
    (name: "empty", error: new ArgumentOutOfRangeException()),
    (name: "parameter", error: new ArgumentOutOfRangeException("year")),
    (name: "message", error: new ArgumentOutOfRangeException("year", "Invalid year.")),
    (name: "actualValue", error: new ArgumentOutOfRangeException("year", -1, "Invalid year.")),
    (name: "large15", error: new ArgumentOutOfRangeException("value", 1e15, "Invalid value.")),
    (name: "large16", error: new ArgumentOutOfRangeException("value", 1e16, "Invalid value.")),
    (name: "large17", error: new ArgumentOutOfRangeException("value", 1e17, "Invalid value.")),
    (name: "small4", error: new ArgumentOutOfRangeException("value", 1e-4, "Invalid value.")),
    (name: "small5", error: new ArgumentOutOfRangeException("value", 1e-5, "Invalid value.")),
    (name: "small6", error: new ArgumentOutOfRangeException("value", 1e-6, "Invalid value.")),
}.Select(row => new { row.name, paramName = row.error.ParamName,
    message = row.error.Message, actualValue = row.error.ActualValue }).ToArray();

var weeks = new List<object>();
var invalidWeeks = new List<object>();
var invalidTimes = new List<object>();
var years = new List<object>();
var adds = new List<object>();
foreach (var (name, makeCalendar) in calendarFactories)
{
    Calendar calendar = makeCalendar();
    var dates = new SortedSet<long>
    {
        calendar.MinSupportedDateTime.Ticks,
        calendar.MaxSupportedDateTime.Ticks,
    };
    if (name is "Gregorian" or "ThaiBuddhist")
    {
        foreach (var date in new[]
        {
            new DateTime(1, 1, 2), new DateTime(1900, 1, 1), new DateTime(2000, 1, 1),
            new DateTime(2000, 12, 31), new DateTime(2023, 12, 31), new DateTime(2024, 1, 1),
            new DateTime(2024, 12, 31), new DateTime(2025, 1, 1), new DateTime(9999, 12, 30),
        }) dates.Add(date.Ticks);
    }
    else
    {
        int[] sampleYears = name == "Persian" ? [1402, 1403, 1404] : [1400, 1445, 1499];
        foreach (int year in sampleYears)
        {
            var first = calendar.ToDateTime(year, 1, 1, 0, 0, 0, 0);
            foreach (int offset in new[] { -1, 0, 1, 6, 7 })
            {
                var date = first.AddDays(offset);
                if (date >= calendar.MinSupportedDateTime && date <= calendar.MaxSupportedDateTime)
                    dates.Add(date.Ticks);
            }
        }
    }

    foreach (long ticks in dates)
    {
        var time = new DateTime(ticks);
        foreach (CalendarWeekRule rule in Enum.GetValues<CalendarWeekRule>())
        {
            for (int firstDay = 0; firstDay < 7; firstDay++)
            {
                weeks.Add(new
                {
                    calendar = name,
                    ticks = ticks.ToString(CultureInfo.InvariantCulture),
                    rule = (int)rule,
                    firstDay,
                    week = calendar.GetWeekOfYear(time, rule, (DayOfWeek)firstDay),
                });
            }
        }
    }

    foreach (var (rule, firstDay) in new[] { (-1, 6), (3, 6), (0, -1), (0, 7) })
    {
        try
        {
            calendar.GetWeekOfYear(calendar.MaxSupportedDateTime, (CalendarWeekRule)rule, (DayOfWeek)firstDay);
            throw new InvalidOperationException("Expected an invalid week argument to throw.");
        }
        catch (ArgumentOutOfRangeException error)
        {
            invalidWeeks.Add(new { calendar = name, rule, firstDay, error = error.GetType().Name,
                paramName = error.ParamName, message = error.Message, actualValue = error.ActualValue });
        }
    }

    if (name is "Persian" or "UmAlQura")
    {
        int year = name == "Persian" ? 1403 : 1445;
        foreach (var (hour, minute, second, millisecond) in new[]
        {
            (-1, 0, 0, 0), (24, 0, 0, 0), (0, -1, 0, 0), (0, 60, 0, 0),
            (0, 0, -1, 0), (0, 0, 60, 0), (0, 0, 0, -1), (0, 0, 0, 1000),
        })
        {
            try
            {
                calendar.ToDateTime(year, 1, 1, hour, minute, second, millisecond);
                throw new InvalidOperationException("Expected an invalid time argument to throw.");
            }
            catch (ArgumentOutOfRangeException error)
            {
                invalidTimes.Add(new { calendar = name, year, hour, minute, second, millisecond,
                    error = error.GetType().Name, paramName = error.ParamName, message = error.Message,
                    actualValue = error.ActualValue });
            }
        }
    }

    int[] maxValues = name switch
    {
        "Gregorian" => [2029, 2049, 2099],
        "Persian" => [1410, 1450],
        "ThaiBuddhist" => [2049, 2572],
        _ => [99, 1451, 1499],
    };
    foreach (int max in maxValues)
    {
        calendar.TwoDigitYearMax = max;
        foreach (int year in new[] { -1, 0, 9, 10, 11, 25, 46, 49, 50, 72, 73, 99, 100, 1400, 9999, 10000 })
        {
            try
            {
                years.Add(new { calendar = name, max, year, result = (int?)calendar.ToFourDigitYear(year), error = (string?)null,
                    paramName = (string?)null, message = (string?)null, actualValue = (object?)null });
            }
            catch (ArgumentOutOfRangeException error)
            {
                years.Add(new { calendar = name, max, year, result = (int?)null, error = nameof(ArgumentOutOfRangeException),
                    paramName = error.ParamName, message = error.Message, actualValue = error.ActualValue });
            }
        }
    }

    var sample = new DateTime(2024, 3, 20, 12, 34, 56, 789).AddTicks(1234);
    var operations = new (string Name, Func<Calendar, DateTime, double, DateTime> Apply)[]
    {
        ("addMilliseconds", (c, t, v) => c.AddMilliseconds(t, v)),
        ("addSeconds", (c, t, v) => c.AddSeconds(t, (int)v)),
        ("addMinutes", (c, t, v) => c.AddMinutes(t, (int)v)),
        ("addHours", (c, t, v) => c.AddHours(t, (int)v)),
        ("addDays", (c, t, v) => c.AddDays(t, (int)v)),
        ("addWeeks", (c, t, v) => c.AddWeeks(t, (int)v)),
    };
    foreach (var operation in operations)
    {
        double[] values = operation.Name == "addMilliseconds"
            ? [-1e20, -31.25, -1.5, -0.5, -0.00001, 0, 0.00001, 0.5, 1.5, 31.25, 1e20]
            : [-31, -2, -1, 0, 1, 2, 31];
        foreach (double value in values)
        {
            try
            {
                var result = operation.Apply(calendar, sample, value);
                adds.Add(new { calendar = name, operation = operation.Name, ticks = sample.Ticks.ToString(CultureInfo.InvariantCulture), value,
                    result = result.Ticks.ToString(CultureInfo.InvariantCulture), error = (string?)null, paramName = (string?)null,
                    message = (string?)null, actualValue = (object?)null });
            }
            catch (ArgumentException error)
            {
                adds.Add(new { calendar = name, operation = operation.Name, ticks = sample.Ticks.ToString(CultureInfo.InvariantCulture), value,
                    result = (string?)null, error = error.GetType().Name, paramName = error.ParamName,
                    message = error.Message, actualValue = (error as ArgumentOutOfRangeException)?.ActualValue });
            }
        }
    }
    foreach (var (time, value) in new[] { (calendar.MinSupportedDateTime, -1.0), (calendar.MaxSupportedDateTime, 1.0) })
    {
        foreach (var operation in operations)
        {
            try
            {
                var result = operation.Apply(calendar, time, value);
                adds.Add(new { calendar = name, operation = operation.Name, ticks = time.Ticks.ToString(CultureInfo.InvariantCulture), value,
                    result = result.Ticks.ToString(CultureInfo.InvariantCulture), error = (string?)null, paramName = (string?)null,
                    message = (string?)null, actualValue = (object?)null });
            }
            catch (ArgumentException error)
            {
                adds.Add(new { calendar = name, operation = operation.Name, ticks = time.Ticks.ToString(CultureInfo.InvariantCulture), value,
                    result = (string?)null, error = error.GetType().Name, paramName = error.ParamName,
                    message = error.Message, actualValue = (error as ArgumentOutOfRangeException)?.ActualValue });
            }
        }
    }
}

var fixture = "{\n  \"runtime\": \"" + Environment.Version + "\",\n  \"exceptionConstructors\": [\n"
    + string.Join(",\n", exceptionConstructors.Select(row => "    " + JsonSerializer.Serialize(row)))
    + "\n  ],\n  \"weeks\": [\n"
    + string.Join(",\n", weeks.Select(row => "    " + JsonSerializer.Serialize(row)))
    + "\n  ],\n  \"invalidWeeks\": [\n"
    + string.Join(",\n", invalidWeeks.Select(row => "    " + JsonSerializer.Serialize(row)))
    + "\n  ],\n  \"invalidTimes\": [\n"
    + string.Join(",\n", invalidTimes.Select(row => "    " + JsonSerializer.Serialize(row)))
    + "\n  ],\n  \"years\": [\n"
    + string.Join(",\n", years.Select(row => "    " + JsonSerializer.Serialize(row)))
    + "\n  ],\n  \"adds\": [\n"
    + string.Join(",\n", adds.Select(row => "    " + JsonSerializer.Serialize(row)))
    + "\n  ]\n}\n";
if (args.Length == 2)
{
    if (!File.Exists(args[0]) || File.ReadAllText(args[0]) != fixture)
        throw new InvalidOperationException("Calendar fixture differs from the .NET 10.0.7 output.");
}
else
{
    File.WriteAllText(args[0], fixture);
}
