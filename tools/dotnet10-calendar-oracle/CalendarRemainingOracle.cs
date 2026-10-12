using System.Globalization;
using System.Reflection;
using System.Text.Json;

internal static class CalendarRemainingOracle
{
    internal static string Generate()
    {
        var rows = new List<object>();
        object? Normalize(object? value) => value is DateTime date ? date.Ticks.ToString(CultureInfo.InvariantCulture)
            : value is Enum ? Convert.ToInt32(value) : value;

        void Capture(string source, string calendar, string operation, object[] arguments, Func<object?> invoke)
        {
            try
            {
                rows.Add(new { source, calendar, operation, arguments = arguments.Select(Normalize), result = Normalize(invoke()), error = (string?)null });
            }
            catch (ArgumentException error)
            {
                rows.Add(new { source, calendar, operation, arguments = arguments.Select(Normalize), result = (object?)null,
                    error = error.GetType().Name, message = error.Message, paramName = error.ParamName,
                    actualValue = (error as ArgumentOutOfRangeException)?.ActualValue });
            }
        }

        foreach (object[] input in CalendarDirectInputs.AddMonths_TestData())
        {
            Capture("JapaneseCalendarAddMonths.AddMonths", "JapaneseCalendar", "addMonths", input,
                () => new JapaneseCalendar().AddMonths((DateTime)input[0], (int)input[1]));
        }
        foreach (int year in new[] { 1, 99, 2016 })
            Capture("JapaneseCalendarToFourDigitYear.ToFourDigitYear", "JapaneseCalendar", "toFourDigitYear", [year], () => new JapaneseCalendar().ToFourDigitYear(year));
        foreach (int value in new[] { 200, 99 })
            Capture("JapaneseCalendarTwoDigitYearMax.TwoDigitYearMax_Set", "JapaneseCalendar", "setTwoDigitYearMax", [value], () => { var c = new JapaneseCalendar(); c.TwoDigitYearMax = value; return c.TwoDigitYearMax; });
        Capture("JapaneseCalendarTwoDigitYearMax.TwoDigitYearMax_Get", "JapaneseCalendar", "twoDigitYearMax", [], () => new JapaneseCalendar().TwoDigitYearMax);
        Capture("JapaneseCalendarTests.Eras_Get_ReturnsAtLeastFour", "JapaneseCalendar", "eras", [], () => new JapaneseCalendar().Eras);

        Capture("JapaneseLunisolarTests.Eras_Get_ReturnsAtLeastTwo", "JapaneseLunisolarCalendar", "eras", [], () => new JapaneseLunisolarCalendar().Eras);
        foreach (var (year, month) in new[] { (2057,8), (2057,9), (2089,7), (2089,8), (2097,6), (2097,7) })
            Capture("ChineseLunisolarCalendarTests.OffByOneDay", "ChineseLunisolarCalendar", "getDaysInMonth", [year,month], () => new ChineseLunisolarCalendar().GetDaysInMonth(year,month));
        foreach (var (year, month) in new[] { (2057,9), (2089,8), (2097,7) })
            Capture("ChineseLunisolarCalendarTests.OffByOneDay", "ChineseLunisolarCalendar", "dateOnly", [year,month,1], () => new DateOnly(year,month,1,new ChineseLunisolarCalendar()).DayNumber);
        Capture("CalendarsTests.ChineseLunisolarTest", "ChineseLunisolarCalendar", "eraCount", [], () => new ChineseLunisolarCalendar().Eras.Length);
        Capture("CalendarsTests.KoreanLunisolarTest", "KoreanLunisolarCalendar", "eraCount", [], () => new KoreanLunisolarCalendar().Eras.Length);
        Capture("CalendarsTests.TaiwanLunisolarTest", "TaiwanLunisolarCalendar", "eraCount", [], () => new TaiwanLunisolarCalendar().Eras.Length);

        foreach (int type in new[] { 0, 13 })
            Capture("GregorianCalendarTests.Ctor_InvalidType_ThrowsArgumentOutOfRangeException", "GregorianCalendar", "ctor", [type], () => new GregorianCalendar((GregorianCalendarTypes)type));
        foreach (var (name, initialType) in new[] { ("Default", 1), ("Arabic", 10), ("Localized", 1), ("MiddleEastFrench", 9), ("TransliteratedEnglish", 11), ("TransliteratedFrench", 12), ("USEnglish", 2) })
        {
            string sourceClass = "GregorianCalendarTestBase.";
            string testClass = "@GregorianCalendar" + name + "Tests";
            Capture(sourceClass + "CalendarType_Get_ReturnsExpected" + testClass, "GregorianCalendar", "calendarType", [initialType], () => new GregorianCalendar((GregorianCalendarTypes)initialType).CalendarType);
            foreach (int type in new[] { 10, 1, 9, 11, 12, 2, 0, 13 })
                Capture(sourceClass + (type is 0 or 13 ? "CalendarType_SetInvalidValue_ThrowsArgumentOutOfRangeException" : "CalendarType_Set"),
                    "GregorianCalendar", "setCalendarType", [initialType, type], () => { var c = new GregorianCalendar((GregorianCalendarTypes)initialType); c.CalendarType = (GregorianCalendarTypes)type; return c.CalendarType; });
        }

        Capture("CalendarsTests.HijriTest", "HijriCalendar", "hijriAdjustment", [], () => new HijriCalendar().HijriAdjustment);
        Capture("CalendarsTests.UmAlQuraTest", "UmAlQuraCalendar", "isLeapMonth", [1400, 10], () => new UmAlQuraCalendar().IsLeapMonth(1400, 10));
        Capture("CalendarsTests.HebrewTest", "HebrewCalendar", "isLeapMonth", [5343, 4], () => new HebrewCalendar().IsLeapMonth(5343, 4));
        Capture("CalendarsTests.JapaneseTest", "JapaneseCalendar", "eras", [], () => new JapaneseCalendar().Eras);
        Capture("CalendarsTests.JulianTest", "JulianCalendar", "isLeapYear", [1999], () => new JulianCalendar().IsLeapYear(1999));
        Capture("MiscCalendarsTests.HebrewTest", "HebrewCalendar", "toDateTime", [5360, 4, 14, 0, 0, 0, 0], () => new HebrewCalendar().ToDateTime(5360, 4, 14, 0, 0, 0, 0));
        foreach (var (year, month) in new[] { (0, 3), (10000, 3), (5000, 0) })
            Capture("MiscCalendarsTests.HebrewTest", "HebrewCalendar", "toDateTime", [year, month, 25, 0, 0, 0, 0], () => new HebrewCalendar().ToDateTime(year, month, 25, 0, 0, 0, 0));
        Capture("MiscCalendarsTests.HijriTest", "HijriCalendar", "toDateTime", [1008, 6, 15, 0, 0, 0, 0], () => new HijriCalendar().ToDateTime(1008, 6, 15, 0, 0, 0, 0));
        Capture("MiscCalendarsTests.JapaneseTest", "JapaneseCalendar", "toDateTime", [1, 1, 8, 0, 0, 0, 0, 4], () => new JapaneseCalendar().ToDateTime(1, 1, 8, 0, 0, 0, 0, 4));

        // Shared providers include four lunisolar implementations. Keep all their rows in the oracle;
        // the corresponding official methods remain unmapped until the LUNI tasks are complete.
        foreach (object[] input in CalendarDirectInputs.Calendars_TestData())
        {
            var c = (Calendar)input[0];
            string name = c.GetType().Name;
            int leapYear = (int)input[1];
            Capture("CalendarsTests.CloningTest", name, "cloneType", [], () => c.Clone().GetType() == c.GetType());
            Capture("CalendarsTests.ReadOnlyTest", name, "readOnly", [], () => new[] { c.IsReadOnly, Calendar.ReadOnly(c).IsReadOnly, ((Calendar)Calendar.ReadOnly(c).Clone()).IsReadOnly });
            Capture("CalendarsTests.AlgorithmTypeTest", name, "algorithmType", [], () => c.AlgorithmType);
            int year = leapYear > 0 ? leapYear : c.GetYear(new DateTime(2026, 10, 11));
            Capture("CalendarsTests.GetLeapMonthTest", name, "getLeapMonth", [year], () => c.GetLeapMonth(year));
            if (leapYear > 0) Capture("CalendarsTests.GetLeapMonthTest", name, "getLeapMonth", [year - 1], () => c.GetLeapMonth(year - 1));
        }

        var eraInfo = (object[])typeof(JapaneseCalendar).GetMethod("GetEraInfo", BindingFlags.NonPublic | BindingFlags.Static)!.Invoke(null, null)!;
        var japaneseEraData = eraInfo.Select(info =>
        {
            object Field(string name) => info.GetType().GetField(name, BindingFlags.NonPublic | BindingFlags.Instance)!.GetValue(info)!;
            return new { era = (int)Field("era"), ticks = ((long)Field("ticks")).ToString(CultureInfo.InvariantCulture),
                yearOffset = (int)Field("yearOffset"), minEraYear = (int)Field("minEraYear"), maxEraYear = (int)Field("maxEraYear") };
        }).ToArray();
        return JsonSerializer.Serialize(new { runtime = Environment.Version.ToString(), sourceTag = "v10.0.7",
            hijriAdjustment = new HijriCalendar().HijriAdjustment, japaneseEraData, rows }, new JsonSerializerOptions { WriteIndented = true }) + "\n";
    }
}
