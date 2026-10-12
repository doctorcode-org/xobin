using System.Globalization;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

internal static class LunisolarOracle
{
    internal static string Generate()
    {
        var properties = new List<object>();
        var rows = new List<object>();
        var years = new List<object>();
        foreach (EastAsianLunisolarCalendar calendar in new EastAsianLunisolarCalendar[] {
            new ChineseLunisolarCalendar(), new JapaneseLunisolarCalendar(), new KoreanLunisolarCalendar(), new TaiwanLunisolarCalendar() })
        {
            string name = calendar.GetType().Name;
            properties.Add(new { name, twoDigitYearMax = calendar.TwoDigitYearMax, eras = calendar.Eras });
            void Capture(string operation, object[] arguments, Func<object?> invoke)
            {
                try
                {
                    object? result = invoke();
                    if (result is DateTime date) result = date.Ticks.ToString(CultureInfo.InvariantCulture);
                    rows.Add(new { name, operation, arguments, result, error = (string?)null });
                }
                catch (ArgumentException error)
                {
                    object? actualValue = (error as ArgumentOutOfRangeException)?.ActualValue;
                    if (actualValue is long ticks) actualValue = ticks.ToString(CultureInfo.InvariantCulture);
                    rows.Add(new { name, operation, arguments, result = (object?)null, error = error.GetType().Name,
                        message = error.Message, paramName = error.ParamName, actualValue });
                }
            }

            foreach (int cycle in new[] { -1, 0 }.Concat(Enumerable.Range(1,60)).Concat(new[] { 61, int.MaxValue }))
            {
                Capture("getCelestialStem", [cycle], () => calendar.GetCelestialStem(cycle));
                Capture("getTerrestrialBranch", [cycle], () => calendar.GetTerrestrialBranch(cycle));
            }
            foreach (var date in new[] { calendar.MinSupportedDateTime.AddTicks(-1), calendar.MaxSupportedDateTime.AddTicks(1) })
                Capture("getSexagenaryYear", [date.Ticks.ToString()], () => calendar.GetSexagenaryYear(date));
            foreach (int max in new[] { 98,99,100,2049,2050,2100,4382 })
                Capture("setTwoDigitYearMax", [max], () => { var c = (Calendar)calendar.Clone(); c.TwoDigitYearMax = max; return c.TwoDigitYearMax; });

            var samples = new SortedSet<long> { calendar.MinSupportedDateTime.Ticks, calendar.MaxSupportedDateTime.Ticks };
            for (int i = 1; i <= 32; i++) samples.Add(calendar.MinSupportedDateTime.Ticks + (calendar.MaxSupportedDateTime.Ticks - calendar.MinSupportedDateTime.Ticks) / 33 * i);
            foreach (var date in new[] { new DateTime(1989,1,8), new DateTime(1989,2,5), new DateTime(1989,2,6), new DateTime(2019,5,1) })
                if (date >= calendar.MinSupportedDateTime && date <= calendar.MaxSupportedDateTime) samples.Add(date.Ticks);
            foreach (long ticks in samples)
            {
                var date = new DateTime(ticks);
                foreach (int months in new[] { -13,-1,0,1,13 })
                    Capture("addMonths", [ticks.ToString(),months], () => calendar.AddMonths(date,months));
                foreach (int amount in new[] { -4,-1,0,1,4,int.MinValue,int.MaxValue })
                    Capture("addYears", [ticks.ToString(),amount], () => calendar.AddYears(date,amount));
            }

            for (int year = calendar.MinSupportedDateTime.Year; year <= calendar.MaxSupportedDateTime.Year; year++)
            {
                var first = new DateTime(year,1,1);
                if (first < calendar.MinSupportedDateTime) first = calendar.MinSupportedDateTime.Date;
                var last = new DateTime(year,12,31);
                if (last > calendar.MaxSupportedDateTime) last = calendar.MaxSupportedDateTime.Date;
                using var hash = IncrementalHash.CreateHash(HashAlgorithmName.SHA256);
                int count = 0;
                for (var date = first; date <= last; date = date.AddDays(1))
                {
                    int y = calendar.GetYear(date), m = calendar.GetMonth(date), d = calendar.GetDayOfMonth(date), era = calendar.GetEra(date);
                    int cycle = calendar.GetSexagenaryYear(date);
                    string roundTrip;
                    try { roundTrip = calendar.ToDateTime(y,m,d,0,0,0,0,era).Ticks.ToString(CultureInfo.InvariantCulture); }
                    catch (ArgumentException error) { roundTrip = error.GetType().Name + "|" + error.ParamName + "|" + error.Message + "|" + (error as ArgumentOutOfRangeException)?.ActualValue; }
                    string line = string.Join('|', date.Ticks.ToString(), y,m,d,calendar.GetDayOfYear(date), (int)calendar.GetDayOfWeek(date), era,cycle,
                        calendar.GetCelestialStem(cycle),calendar.GetTerrestrialBranch(cycle),roundTrip) + "\n";
                    hash.AppendData(Encoding.UTF8.GetBytes(line));
                    count++;
                }
                years.Add(new { name, year, firstTicks = first.Ticks.ToString(), lastTicks = last.Ticks.ToString(), count,
                    sha256 = Convert.ToHexString(hash.GetHashAndReset()).ToLowerInvariant() });
            }
        }
        return JsonSerializer.Serialize(new { runtime = Environment.Version.ToString(), sourceTag = "v10.0.7", properties, rows, years }, new JsonSerializerOptions { WriteIndented = true }) + "\n";
    }
}
