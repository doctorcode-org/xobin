// Derived from the official .NET 10.0.7 ISOWeek test input providers.
// Licensed to the .NET Foundation under the MIT license.
using System.Globalization;
internal static class ISOWeekReferenceInputs {
        private static readonly HashSet<int> s_yearsWith53Weeks = new HashSet<int>
        {
            004, 009, 015, 020, 026,
            032, 037, 043, 048, 054,
            060, 065, 071, 076, 082,
            088, 093, 099, 105, 111, 116, 122,
            128, 133, 139, 144, 150,
            156, 161, 167, 172, 178,
            184, 189, 195, 201, 207, 212, 218,
            224, 229, 235, 240, 246,
            252, 257, 263, 268, 274,
            280, 285, 291, 296, 303, 308, 314,
            320, 325, 331, 336, 342,
            348, 353, 359, 364, 370,
            376, 381, 387, 392, 398
        };

        // From https://en.wikipedia.org/wiki/ISO_week_date#Relation_with_the_Gregorian_calendar.
        private static readonly DateData[] s_dateData =
        {
            new DateData(new DateTime(0001, 01, 01), 0001, 01, DayOfWeek.Monday),
            new DateData(new DateTime(2005, 01, 01), 2004, 53, DayOfWeek.Saturday),
            new DateData(new DateTime(2005, 01, 02), 2004, 53, DayOfWeek.Sunday),
            new DateData(new DateTime(2005, 12, 31), 2005, 52, DayOfWeek.Saturday),
            new DateData(new DateTime(2006, 01, 01), 2005, 52, DayOfWeek.Sunday),
            new DateData(new DateTime(2006, 01, 02), 2006, 01, DayOfWeek.Monday),
            new DateData(new DateTime(2006, 12, 31), 2006, 52, DayOfWeek.Sunday),
            new DateData(new DateTime(2007, 01, 01), 2007, 01, DayOfWeek.Monday),
            new DateData(new DateTime(2007, 12, 30), 2007, 52, DayOfWeek.Sunday),
            new DateData(new DateTime(2007, 12, 31), 2008, 01, DayOfWeek.Monday),
            new DateData(new DateTime(2008, 01, 01), 2008, 01, DayOfWeek.Tuesday),
            new DateData(new DateTime(2008, 12, 28), 2008, 52, DayOfWeek.Sunday),
            new DateData(new DateTime(2008, 12, 29), 2009, 01, DayOfWeek.Monday),
            new DateData(new DateTime(2008, 12, 30), 2009, 01, DayOfWeek.Tuesday),
            new DateData(new DateTime(2008, 12, 31), 2009, 01, DayOfWeek.Wednesday),
            new DateData(new DateTime(2009, 01, 01), 2009, 01, DayOfWeek.Thursday),
            new DateData(new DateTime(2009, 12, 31), 2009, 53, DayOfWeek.Thursday),
            new DateData(new DateTime(2010, 01, 01), 2009, 53, DayOfWeek.Friday),
            new DateData(new DateTime(2010, 01, 02), 2009, 53, DayOfWeek.Saturday),
            new DateData(new DateTime(2010, 01, 03), 2009, 53, DayOfWeek.Sunday),
            new DateData(new DateTime(9999, 12, 31), 9999, 52, DayOfWeek.Friday),
        };

        private static readonly YearData[] s_yearData =
        {
            new YearData(0001, new DateTime(0001, 01, 01), new DateTime(0001, 12, 30)),
            new YearData(2005, new DateTime(2005, 01, 03), new DateTime(2006, 01, 01)),
            new YearData(2006, new DateTime(2006, 01, 02), new DateTime(2006, 12, 31)),
            new YearData(2007, new DateTime(2007, 01, 01), new DateTime(2007, 12, 30)),
            new YearData(2008, new DateTime(2007, 12, 31), new DateTime(2008, 12, 28)),
            new YearData(2009, new DateTime(2008, 12, 29), new DateTime(2010, 01, 03)),
            new YearData(9998, new DateTime(9997, 12, 29), new DateTime(9999, 01, 03)),
        };

        public static IEnumerable<object[]> GetWeekOfYear_TestData()
        {
            return s_dateData.Select(x => new object[] {x.Date, x.Week});
        }

        public static IEnumerable<object[]> GetWeekOfYear_DateOnly_TestData()
        {
            return s_dateData.Select(x => new object[] { DateOnly.FromDateTime(x.Date), x.Week});
        }

        public static IEnumerable<object[]> GetYear_TestData()
        {
            return s_dateData.Select(x => new object[] {x.Date, x.Year});
        }

        public static IEnumerable<object[]> GetYear_DateOnly_TestData()
        {
            return s_dateData.Select(x => new object[] { DateOnly.FromDateTime(x.Date), x.Year});
        }

        public static IEnumerable<object[]> ToDateTime_TestData()
        {
            return s_dateData.Select(x => new object[] {x.Year, x.Week, x.DayOfWeek, x.Date});
        }

        public static IEnumerable<object[]> ToDateOnly_TestData()
        {
            return s_dateData.Select(x => new object[] {x.Year, x.Week, x.DayOfWeek, DateOnly.FromDateTime(x.Date)});
        }

        public static IEnumerable<object[]> GetYearStart_TestData()
        {
            return s_yearData.Select(x => new object[] {x.Year, x.StartDate});
        }

        public static IEnumerable<object[]> GetYearEnd_TestData()
        {
            return s_yearData.Select(x => new object[] {x.Year, x.EndDate});
        }

public static IEnumerable<object[]> WeeksInYear_TestData() {
for (int year = 0; year <= 400; year++)
            {
                int expected = s_yearsWith53Weeks.Contains(year) ? 53 : 52;
                yield return new object[] { 2000 + year, expected };
            }
        }
        private struct DateData
        {
            public readonly DateTime Date;

            public readonly int Year;

            public readonly int Week;

            public readonly DayOfWeek DayOfWeek;

            public DateData(DateTime date, int year, int week, DayOfWeek dayOfWeek)
            {
                Date = date;
                Year = year;
                Week = week;
                DayOfWeek = dayOfWeek;
            }
        }

        private struct YearData
        {
            public readonly int Year;

            public readonly DateTime StartDate;

            public readonly DateTime EndDate;

            public YearData(int year, DateTime startDate, DateTime endDate)
            {
                Year = year;
                StartDate = startDate;
                EndDate = endDate;
            }
        }
}
