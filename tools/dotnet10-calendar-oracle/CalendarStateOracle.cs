using System.Globalization;
using System.Text.Json;

internal static class CalendarStateOracle
{
    internal static string Generate()
    {
        var rows = new List<string>();

        void Capture(string name, string operation, Func<Calendar, object?> apply, Func<Calendar> make)
        {
            try
            {
                object? result = apply(make());
                rows.Add(JsonSerializer.Serialize(new { name, operation, result,
                    error = (string?)null, paramName = (string?)null, message = (string?)null,
                    actualValue = (object?)null }));
            }
            catch (Exception error)
            {
                rows.Add(JsonSerializer.Serialize(new { name, operation, result = (object?)null,
                    error = error.GetType().Name, paramName = (error as ArgumentException)?.ParamName,
                    message = error.Message, actualValue = (error as ArgumentOutOfRangeException)?.ActualValue }));
            }
        }

        var calendars = new (string name, Func<Calendar> make)[]
        {
            ("GregorianCalendarDefaultTests", () => new GregorianCalendar()),
            ("GregorianCalendarArabicTests", () => new GregorianCalendar(GregorianCalendarTypes.Arabic)),
            ("GregorianCalendarLocalizedTests", () => new GregorianCalendar(GregorianCalendarTypes.Localized)),
            ("GregorianCalendarMiddleEastFrenchTests", () => new GregorianCalendar(GregorianCalendarTypes.MiddleEastFrench)),
            ("GregorianCalendarTransliteratedEnglishTests", () => new GregorianCalendar(GregorianCalendarTypes.TransliteratedEnglish)),
            ("GregorianCalendarTransliteratedFrenchTests", () => new GregorianCalendar(GregorianCalendarTypes.TransliteratedFrench)),
            ("GregorianCalendarUSEnglishTests", () => new GregorianCalendar(GregorianCalendarTypes.USEnglish)),
            ("PersianCalendarTests", () => new PersianCalendar()),
            ("ThaiBuddhistCalendarTests", () => new ThaiBuddhistCalendar()),
            ("UmAlQuraCalendarTests", () => new UmAlQuraCalendar()),
        };

        foreach (var (name, make) in calendars)
        {
            Capture(name, "properties", c => new {
                min = c.MinSupportedDateTime.Ticks.ToString(CultureInfo.InvariantCulture),
                max = c.MaxSupportedDateTime.Ticks.ToString(CultureInfo.InvariantCulture),
                eras = c.Eras, distinctEras = !ReferenceEquals(c.Eras, c.Eras),
                algorithmType = (int)c.AlgorithmType, isReadOnly = c.IsReadOnly,
            }, make);
            Capture(name, "cloneAndReadOnly", c => {
                c.TwoDigitYearMax = 99;
                Calendar clone = (Calendar)c.Clone();
                Calendar readOnly = Calendar.ReadOnly(c);
                Calendar cloneOfReadOnly = (Calendar)readOnly.Clone();
                clone.TwoDigitYearMax = 100;
                cloneOfReadOnly.TwoDigitYearMax = 101;
                return new {
                    cloneSameType = c.GetType() == clone.GetType(),
                    readOnlySameType = c.GetType() == readOnly.GetType(),
                    cloneOfReadOnlySameType = c.GetType() == cloneOfReadOnly.GetType(),
                    cloneDistinct = !ReferenceEquals(c, clone),
                    readOnlyDistinct = !ReferenceEquals(c, readOnly),
                    readOnlyIdempotent = ReferenceEquals(readOnly, Calendar.ReadOnly(readOnly)),
                    originalIsReadOnly = c.IsReadOnly, cloneIsReadOnly = clone.IsReadOnly,
                    readOnlyIsReadOnly = readOnly.IsReadOnly,
                    cloneOfReadOnlyIsReadOnly = cloneOfReadOnly.IsReadOnly,
                    originalTwoDigitYearMax = c.TwoDigitYearMax,
                    cloneTwoDigitYearMax = clone.TwoDigitYearMax,
                    readOnlyTwoDigitYearMax = readOnly.TwoDigitYearMax,
                    cloneOfReadOnlyTwoDigitYearMax = cloneOfReadOnly.TwoDigitYearMax,
                    originalCalendarType = (c as GregorianCalendar)?.CalendarType,
                    cloneCalendarType = (clone as GregorianCalendar)?.CalendarType,
                    readOnlyCalendarType = (readOnly as GregorianCalendar)?.CalendarType,
                };
            }, make);
            Capture(name, "setReadOnlyTwoDigitYearMax", c => {
                Calendar.ReadOnly(c).TwoDigitYearMax = 99;
                return null;
            }, make);
            Capture(name, "setReadOnlyInvalidTwoDigitYearMax", c => {
                Calendar.ReadOnly(c).TwoDigitYearMax = 98;
                return null;
            }, make);
            if (name.StartsWith("GregorianCalendar", StringComparison.Ordinal))
            {
                Capture(name, "setReadOnlyCalendarType", c => {
                    ((GregorianCalendar)Calendar.ReadOnly(c)).CalendarType = GregorianCalendarTypes.Arabic;
                    return null;
                }, make);
                Capture(name, "setReadOnlyInvalidCalendarType", c => {
                    ((GregorianCalendar)Calendar.ReadOnly(c)).CalendarType = (GregorianCalendarTypes)0;
                    return null;
                }, make);
            }
        }
        Capture("Calendar", "readOnlyNull", _ => Calendar.ReadOnly(null!), () => new GregorianCalendar());

        return "{\n  \"runtime\": \"10.0.7\",\n  \"rows\": [\n"
            + string.Join(",\n", rows.Select(row => "    " + row)) + "\n  ]\n}\n";
    }
}
