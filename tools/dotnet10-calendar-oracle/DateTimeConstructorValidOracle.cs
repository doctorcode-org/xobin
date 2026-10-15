using System.Globalization;
using System.Text.Json;

internal static class DateTimeConstructorValidOracle
{
    internal static string Generate()
    {
        int[][] millisecondRows =
        [
            [1986, 8, 15, 10, 20, 5, 600],
            [1986, 2, 28, 10, 20, 5, 600],
            [1986, 12, 31, 10, 20, 5, 600],
            [2000, 2, 28, 10, 20, 5, 600],
            [2000, 2, 29, 10, 20, 5, 600],
            [2000, 12, 31, 10, 20, 5, 600],
            [1900, 2, 28, 10, 20, 5, 600],
            [1900, 12, 31, 10, 20, 5, 600],
        ];
        int[][] microsecondRows = millisecondRows.Select(row => row.Append(300).ToArray()).ToArray();
        int[] nanoseconds = [0, 100, 200, 300, 400, 500, 600, 900];
        var rows = new List<string>();

        void Add(string source, int[] arguments, DateTime value)
        {
            rows.Add(JsonSerializer.Serialize(new
            {
                source,
                arguments,
                ticks = value.Ticks.ToString(),
                year = value.Year,
                month = value.Month,
                day = value.Day,
                hour = value.Hour,
                minute = value.Minute,
                second = value.Second,
                millisecond = value.Millisecond,
                microsecond = value.Microsecond,
                nanosecond = value.Nanosecond,
                kind = (int)value.Kind,
            }));
        }

        foreach (int[] a in millisecondRows)
        {
            Add("DateTimeTests.Ctor_Int_Int_Int_Int_Int_Int_Int", a,
                new DateTime(a[0], a[1], a[2], a[3], a[4], a[5], a[6]));
            Add("DateTimeTests.Ctor_Int_Int_Int_Int_Int_Int_Int_Calendar", a,
                new DateTime(a[0], a[1], a[2], a[3], a[4], a[5], a[6], new GregorianCalendar()));
            Add("DateTimeTests.Ctor_Int_Int_Int_Int_Int_Int_Int_Int_DateTimeKind", a,
                new DateTime(a[0], a[1], a[2], a[3], a[4], a[5], a[6], DateTimeKind.Local));
            Add("DateTimeTests.Ctor_Int_Int_Int_Int_Int_Int_Int_Int_Calendar_DateTimeKind", a,
                new DateTime(a[0], a[1], a[2], a[3], a[4], a[5], a[6], new GregorianCalendar(), DateTimeKind.Local));
        }

        foreach (int[] a in microsecondRows)
        {
            Add("DateTimeTests.Ctor_Int_Int_Int_Int_Int_Int_Int_Int", a,
                new DateTime(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]));
            Add("DateTimeTests.Ctor_Int_Int_Int_Int_Int_Int_Int_Int_Calendar", a,
                new DateTime(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], new GregorianCalendar()));
            Add("DateTimeTests.Ctor_Int_Int_Int_Int_Int_Int_Int_Int_Int_DateTimeKind", a,
                new DateTime(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], DateTimeKind.Local));
            Add("DateTimeTests.Ctor_Int_Int_Int_Int_Int_Int_Int_Int_Int_Calendar_DateTimeKind", a,
                new DateTime(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], new GregorianCalendar(), DateTimeKind.Local));
        }

        for (int index = 0; index < microsecondRows.Length; index++)
        {
            int[] a = microsecondRows[index].Append(nanoseconds[index]).ToArray();
            DateTime value = new DateTime(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]);
            value = value.AddTicks(a[8] / 100);
            Add("DateTimeTests.Ctor_Int_Int_Int_Int_Int_Int_Int_Int_Int_WithNanoseconds", a, value);
        }

        return "{\n  \"runtime\": \"10.0.7\",\n  \"rows\": [\n"
            + string.Join(",\n", rows.Select(row => "    " + row)) + "\n  ]\n}\n";
    }
}
