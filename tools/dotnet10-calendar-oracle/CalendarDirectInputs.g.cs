// Derived from the official .NET 10.0.7 calendar test input providers.
// Licensed to the .NET Foundation under the MIT license.
using System.Globalization;
internal static class CalendarDirectInputs {
public static IEnumerable<object[]> AddMonths_TestData()
        {
            yield return new object[] { new DateTime(2006, 11, 28), 1, new DateTime(2006, 12, 28) };
            yield return new object[] { new DateTime(2006, 11, 28), -1, new DateTime(2006, 10, 28) };
            yield return new object[] { new DateTime(2006, 11, 28), 0, new DateTime(2006, 11, 28) };
            yield return new object[] { new DateTime(2006, 11, 28), 1000, new DateTime(2090, 3, 28) };

            yield return new object[] { new DateTime(2006, 12, 1), 1, new DateTime(2007, 1, 1) };
            yield return new object[] { new DateTime(2007, 1, 1), -1, new DateTime(2006, 12, 1) };

            // Boundary values
            yield return new object[] { new DateTime(1868, 9, 8), 1, new DateTime(1868, 10, 8) };
            yield return new object[] { new DateTime(1868, 10, 8), -1, new DateTime(1868, 9, 8) };
            yield return new object[] { new DateTime(9999, 11, 30), 1, new DateTime(9999, 12, 30) };
            yield return new object[] { new DateTime(9999, 12, 30), -1, new DateTime(9999, 11, 30) };
            yield return new object[] { DateTime.MaxValue, 0, DateTime.MaxValue };
            yield return new object[] { new DateTime(1868, 9, 8), 0, new DateTime(1868, 9, 8) };

            // Day is not in the month
            yield return new object[] { new DateTime(2006, 10, 31), 1, new DateTime(2006, 11, 30) };
            yield return new object[] { new DateTime(2006, 12, 31), -1, new DateTime(2006, 11, 30) };
        }
public static IEnumerable<object[]> Calendars_TestData()
        {
            //                              Calendar               yearHasLeapMonth        CalendarAlgorithmType
            yield return new object[] { new ChineseLunisolarCalendar()  , 2017  , CalendarAlgorithmType.LunisolarCalendar   };
            yield return new object[] { new GregorianCalendar()         , 0     , CalendarAlgorithmType.SolarCalendar       };
            yield return new object[] { new HebrewCalendar()            , 5345  , CalendarAlgorithmType.LunisolarCalendar   };
            yield return new object[] { new HijriCalendar()             , 0     , CalendarAlgorithmType.LunarCalendar       };
            yield return new object[] { new JapaneseCalendar()          , 0     , CalendarAlgorithmType.SolarCalendar       };
            yield return new object[] { new JapaneseLunisolarCalendar() , 29    , CalendarAlgorithmType.LunisolarCalendar   };
            yield return new object[] { new JulianCalendar()            , 0     , CalendarAlgorithmType.SolarCalendar       };
            yield return new object[] { new KoreanCalendar()            , 0     , CalendarAlgorithmType.SolarCalendar       };
            yield return new object[] { new KoreanLunisolarCalendar()   , 2017  , CalendarAlgorithmType.LunisolarCalendar   };
            yield return new object[] { new PersianCalendar()           , 0     , CalendarAlgorithmType.SolarCalendar       };
            yield return new object[] { new TaiwanCalendar()            , 0     , CalendarAlgorithmType.SolarCalendar       };
            yield return new object[] { new TaiwanLunisolarCalendar()   , 106   , CalendarAlgorithmType.LunisolarCalendar   };
            yield return new object[] { new ThaiBuddhistCalendar()      , 0     , CalendarAlgorithmType.SolarCalendar       };
            yield return new object[] { new UmAlQuraCalendar()          , 0     , CalendarAlgorithmType.LunarCalendar       };
        }
}
