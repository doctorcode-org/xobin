// Derived from official .NET 10.0.7 tests.
// Licensed to the .NET Foundation under the MIT license.
using System.Globalization;
using System.Text;
internal static class DateOnlyFormatReferenceTests {
[Fact]
public static void TryFormatTest()
        {
            // UTF16
            {
                Span<char> buffer = stackalloc char[100];
                FormatObservedDateOnly dateOnly = FormatObservedDateOnly.FromDateTime(TemporalFormatOracle.Now.Date);

                Assert.True(dateOnly.TryFormat(buffer, out int charsWritten));
                Assert.True(dateOnly.TryFormat(buffer, out charsWritten, "o"));
                Assert.Equal(10, charsWritten);
                Assert.True(dateOnly.TryFormat(buffer, out charsWritten, "R"));
                Assert.Equal(16, charsWritten);
                Assert.False(dateOnly.TryFormat(buffer.Slice(0, 3), out charsWritten));
                Assert.False(dateOnly.TryFormat(buffer.Slice(0, 3), out charsWritten, "r"));
                Assert.False(dateOnly.TryFormat(buffer.Slice(0, 3), out charsWritten, "O"));
                Assert.Throws<FormatException>(() => dateOnly.TryFormat(stackalloc char[100], out charsWritten, "u"));
                Assert.Throws<FormatException>(() => dateOnly.TryFormat(stackalloc char[100], out charsWritten, "hh-ss"));
                Assert.Throws<FormatException>(() => $"{dateOnly:u}");
                Assert.Throws<FormatException>(() => $"{dateOnly:hh-ss}");
            }

            // UTF8
            {
                Span<byte> buffer = stackalloc byte[100];
                FormatObservedDateOnly dateOnly = FormatObservedDateOnly.FromDateTime(TemporalFormatOracle.Now.Date);

                Assert.True(dateOnly.TryFormat(buffer, out int charsWritten, default, null));
                Assert.True(dateOnly.TryFormat(buffer, out charsWritten, "o", null));
                Assert.Equal(10, charsWritten);
                Assert.True(dateOnly.TryFormat(buffer, out charsWritten, "R", null));
                Assert.Equal(16, charsWritten);
                Assert.False(dateOnly.TryFormat(buffer.Slice(0, 3), out charsWritten, default, null));
                Assert.False(dateOnly.TryFormat(buffer.Slice(0, 3), out charsWritten, "r", null));
                Assert.False(dateOnly.TryFormat(buffer.Slice(0, 3), out charsWritten, "O", null));
                Assert.Throws<FormatException>(() => dateOnly.TryFormat(stackalloc byte[100], out charsWritten, "u", null));
                Assert.Throws<FormatException>(() => dateOnly.TryFormat(stackalloc byte[100], out charsWritten, "hh-ss", null));
                Assert.Throws<FormatException>(() => $"{dateOnly:u}");
                Assert.Throws<FormatException>(() => $"{dateOnly:hh-ss}");
            }
        }
// Formatting portion only; parsing remains deferred.
public static void OAndRFormatsTest_FormattingPortion()
        {
            FormatObservedDateOnly dateOnly = FormatObservedDateOnly.FromDateTime(TemporalFormatOracle.Now.Date);
            string formattedDate = dateOnly.ToString("o");
            Assert.Equal(10, formattedDate.Length);
            Assert.Equal('-', formattedDate[4]);
            Assert.Equal('-', formattedDate[7]);

            formattedDate = dateOnly.ToString("r");
            Assert.Equal(16, formattedDate.Length);
            Assert.Equal(',', formattedDate[3]);
            Assert.Equal(' ', formattedDate[4]);
            Assert.Equal(' ', formattedDate[7]);
            Assert.Equal(' ', formattedDate[11]);
        }
// Formatting portion only; parsing remains deferred.
public static void CustomFormattingTest_FormattingPortion()
        {
            FormatObservedDateOnly dateOnly = FormatObservedDateOnly.FromDateTime(TemporalFormatOracle.Now.Date);
            string format = "dd, ddd 'dash' MMMM \"dash\" yyyy";
            string formatted = dateOnly.ToString(format);

            Assert.Throws<FormatException>(() => dateOnly.ToString("dd-MM-yyyy hh"));
            Assert.Throws<FormatException>(() => dateOnly.ToString("dd-MM-yyyy m"));
            Assert.Throws<FormatException>(() => dateOnly.ToString("dd-MM-yyyy s"));
            Assert.Throws<FormatException>(() => dateOnly.ToString("dd-MM-yyyy z"));
        }
}
internal static class TimeOnlyFormatReferenceTests {
[Fact]
public static void TryFormatTest()
        {
            // UTF16
            {
                Span<char> buffer = stackalloc char[100];
                FormatObservedTimeOnly timeOnly = FormatObservedTimeOnly.FromDateTime(TemporalFormatOracle.Now);

                buffer.Fill(' ');
                Assert.True(timeOnly.TryFormat(buffer, out int charsWritten));
                Assert.Equal(charsWritten, buffer.TrimEnd().Length);

                buffer.Fill(' ');
                Assert.True(timeOnly.TryFormat(buffer, out charsWritten, "o"));
                Assert.Equal(16, charsWritten);
                Assert.Equal(16, buffer.TrimEnd().Length);

                buffer.Fill(' ');
                Assert.True(timeOnly.TryFormat(buffer, out charsWritten, "R"));
                Assert.Equal(8, charsWritten);
                Assert.Equal(8, buffer.TrimEnd().Length);

                Assert.False(timeOnly.TryFormat(buffer.Slice(0, 3), out charsWritten));
                Assert.False(timeOnly.TryFormat(buffer.Slice(0, 3), out charsWritten, "r"));
                Assert.False(timeOnly.TryFormat(buffer.Slice(0, 3), out charsWritten, "O"));

                Assert.Throws<FormatException>(() => timeOnly.TryFormat(stackalloc char[100], out charsWritten, "u"));
                Assert.Throws<FormatException>(() => timeOnly.TryFormat(stackalloc char[100], out charsWritten, "dd-yyyy"));
                Assert.Throws<FormatException>(() => $"{timeOnly:u}");
                Assert.Throws<FormatException>(() => $"{timeOnly:dd-yyyy}");
            }

            // UTF8
            {
                Span<byte> buffer = stackalloc byte[100];
                FormatObservedTimeOnly timeOnly = FormatObservedTimeOnly.FromDateTime(TemporalFormatOracle.Now);

                buffer.Fill((byte)' ');
                Assert.True(timeOnly.TryFormat(buffer, out int bytesWritten));
                Assert.Equal(bytesWritten, buffer.TrimEnd(" "u8).Length);

                buffer.Fill((byte)' ');
                Assert.True(timeOnly.TryFormat(buffer, out bytesWritten, "o"));
                Assert.Equal(16, bytesWritten);
                Assert.Equal(16, buffer.TrimEnd(" "u8).Length);

                buffer.Fill((byte)' ');
                Assert.True(timeOnly.TryFormat(buffer, out bytesWritten, "R"));
                Assert.Equal(8, bytesWritten);
                Assert.Equal(8, buffer.TrimEnd(" "u8).Length);

                Assert.False(timeOnly.TryFormat(buffer.Slice(0, 3), out bytesWritten));
                Assert.False(timeOnly.TryFormat(buffer.Slice(0, 3), out bytesWritten, "r"));
                Assert.False(timeOnly.TryFormat(buffer.Slice(0, 3), out bytesWritten, "O"));

                Assert.Throws<FormatException>(() => timeOnly.TryFormat(new byte[100], out bytesWritten, "u"));
                Assert.Throws<FormatException>(() => timeOnly.TryFormat(new byte[100], out bytesWritten, "dd-yyyy"));
                Assert.Throws<FormatException>(() => $"{timeOnly:u}");
                Assert.Throws<FormatException>(() => $"{timeOnly:dd-yyyy}");
            }
        }
// Formatting portion only; parsing remains deferred.
public static void OAndRFormatsTest_FormattingPortion()
        {
            FormatObservedTimeOnly timeOnly = FormatObservedTimeOnly.FromDateTime(TemporalFormatOracle.Now);
            string formattedDate = timeOnly.ToString("o");
            Assert.Equal(16, formattedDate.Length);
            Assert.Equal(':', formattedDate[2]);
            Assert.Equal(':', formattedDate[5]);
            Assert.Equal('.', formattedDate[8]);

            timeOnly = new FormatObservedTimeOnly(timeOnly.Hour, timeOnly.Minute, timeOnly.Second);
            formattedDate = timeOnly.ToString("r");
            Assert.Equal(8, formattedDate.Length);
            Assert.Equal(':', formattedDate[2]);
            Assert.Equal(':', formattedDate[5]);
        }
// Formatting portion only; parsing remains deferred.
public static void CustomFormattingTest_FormattingPortion()
        {
            FormatObservedTimeOnly timeOnly = FormatObservedTimeOnly.FromDateTime(TemporalFormatOracle.Now);
            string format = "HH 'dash' mm \"dash\" ss'....'fffffff";
            string formatted = timeOnly.ToString(format);

            Assert.Throws<FormatException>(() => timeOnly.ToString("hh:mm:ss dd"));
            Assert.Throws<FormatException>(() => timeOnly.ToString("hh:mm:ss MM"));
            Assert.Throws<FormatException>(() => timeOnly.ToString("hh:mm:ss yy"));
        }
}
internal static class TimeSpanFormatReferenceTests {
private static class PlatformDetection { internal static bool IsInvariantGlobalization => false; internal static bool IsNotInvariantGlobalization => true; }
public static IEnumerable<object[]> ToString_TestData()
        {
            CultureInfo invariantInfo = CultureInfo.InvariantCulture;
            CultureInfo commaSeparatorInfo = new CultureInfo("fr-FR");
            commaSeparatorInfo.NumberFormat.NegativeSign = "!@#!@#"; // validate this is ignored

            var input = new FormatObservedTimeSpan(123456789101112);
            yield return new object[] { input, "%d", invariantInfo, "142" };
            yield return new object[] { input, "dd", invariantInfo, "142" };
            yield return new object[] { input, "%h", invariantInfo, "21" };
            yield return new object[] { input, "hh", invariantInfo, "21" };
            yield return new object[] { input, "%m", invariantInfo, "21" };
            yield return new object[] { input, "mm", invariantInfo, "21" };
            yield return new object[] { input, "%s", invariantInfo, "18" };
            yield return new object[] { input, "ss", invariantInfo, "18" };
            yield return new object[] { input, "%f", invariantInfo, "9" };
            yield return new object[] { input, "ff", invariantInfo, "91" };
            yield return new object[] { input, "fff", invariantInfo, "910" };
            yield return new object[] { input, "ffff", invariantInfo, "9101" };
            yield return new object[] { input, "fffff", invariantInfo, "91011" };
            yield return new object[] { input, "ffffff", invariantInfo, "910111" };
            yield return new object[] { input, "fffffff", invariantInfo, "9101112" };
            yield return new object[] { input, "%F", invariantInfo, "9" };
            yield return new object[] { input, "FF", invariantInfo, "91" };
            yield return new object[] { input, "FFF", invariantInfo, "91" };
            yield return new object[] { input, "FFFF", invariantInfo, "9101" };
            yield return new object[] { input, "FFFFF", invariantInfo, "91011" };
            yield return new object[] { input, "FFFFFF", invariantInfo, "910111" };
            yield return new object[] { input, "FFFFFFF", invariantInfo, "9101112" };
            yield return new object[] { input, "dd\\.ss", invariantInfo, "142.18" };
            yield return new object[] { input, "dd\\.ss", commaSeparatorInfo, "142.18" };
            yield return new object[] { input, "dddddd\\.ss", invariantInfo, "000142.18" };

            // constant/invariant format
            CultureInfo[] cultureInfos = PlatformDetection.IsInvariantGlobalization ? new[] { (CultureInfo)null } : new[] { null, invariantInfo, commaSeparatorInfo };
            foreach (CultureInfo info in cultureInfos) // validate that culture is ignored
            {
                foreach (string constFormat in new[] { null, "c", "t", "T" })
                {
                    yield return new object[] { input, constFormat, info, "142.21:21:18.9101112" };
                    yield return new object[] { FormatObservedTimeSpan.Zero, constFormat, info, "00:00:00" };
                    yield return new object[] { new FormatObservedTimeSpan(1), constFormat, info, "00:00:00.0000001" };
                    yield return new object[] { new FormatObservedTimeSpan(-1), constFormat, info, "-00:00:00.0000001" };
                    yield return new object[] { FormatObservedTimeSpan.MaxValue, constFormat, info, "10675199.02:48:05.4775807" };
                    yield return new object[] { FormatObservedTimeSpan.MinValue, constFormat, info, "-10675199.02:48:05.4775808" };
                    yield return new object[] { new FormatObservedTimeSpan(1, 2, 3), constFormat, info, "01:02:03" };
                    yield return new object[] { -new FormatObservedTimeSpan(1, 2, 3), constFormat, info, "-01:02:03" };
                    yield return new object[] { new FormatObservedTimeSpan(12, 34, 56), constFormat, info, "12:34:56" };
                    yield return new object[] { new FormatObservedTimeSpan(12, 34, 56, 23), constFormat, info, "13.10:56:23" };
                    yield return new object[] { new FormatObservedTimeSpan(12, 34, 56, 23, 45), constFormat, info, "13.10:56:23.0450000" };
                    yield return new object[] { new FormatObservedTimeSpan(0, 23, 59, 59, 999), constFormat, info, "23:59:59.9990000" };
                }
            }

            // general short format, invariant culture
            yield return new object[] { input, "g", invariantInfo, "142:21:21:18.9101112" };
            yield return new object[] { FormatObservedTimeSpan.Zero, "g", invariantInfo, "0:00:00" };
            yield return new object[] { new FormatObservedTimeSpan(1), "g", invariantInfo, "0:00:00.0000001" };
            yield return new object[] { new FormatObservedTimeSpan(-1), "g", invariantInfo, "-0:00:00.0000001" };
            yield return new object[] { FormatObservedTimeSpan.MaxValue, "g", invariantInfo, "10675199:2:48:05.4775807" };
            yield return new object[] { FormatObservedTimeSpan.MinValue, "g", invariantInfo, "-10675199:2:48:05.4775808" };
            yield return new object[] { new FormatObservedTimeSpan(1, 2, 3), "g", invariantInfo, "1:02:03" };
            yield return new object[] { -new FormatObservedTimeSpan(1, 2, 3), "g", invariantInfo, "-1:02:03" };
            yield return new object[] { new FormatObservedTimeSpan(12, 34, 56), "g", invariantInfo, "12:34:56" };
            yield return new object[] { new FormatObservedTimeSpan(12, 34, 56, 23), "g", invariantInfo, "13:10:56:23" };
            yield return new object[] { new FormatObservedTimeSpan(12, 34, 56, 23, 45), "g", invariantInfo, "13:10:56:23.045" };
            yield return new object[] { new FormatObservedTimeSpan(0, 23, 59, 59, 999), "g", invariantInfo, "23:59:59.999" };

            if (PlatformDetection.IsNotInvariantGlobalization)
            {
                // general short format, NumberDecimalSeparator used
                yield return new object[] { input, "g", commaSeparatorInfo, "142:21:21:18,9101112" };
                yield return new object[] { FormatObservedTimeSpan.Zero, "g", commaSeparatorInfo, "0:00:00" };
                yield return new object[] { new FormatObservedTimeSpan(1), "g", commaSeparatorInfo, "0:00:00,0000001" };
                yield return new object[] { new FormatObservedTimeSpan(-1), "g", commaSeparatorInfo, "-0:00:00,0000001" };
                yield return new object[] { FormatObservedTimeSpan.MaxValue, "g", commaSeparatorInfo, "10675199:2:48:05,4775807" };
                yield return new object[] { FormatObservedTimeSpan.MinValue, "g", commaSeparatorInfo, "-10675199:2:48:05,4775808" };
                yield return new object[] { new FormatObservedTimeSpan(1, 2, 3), "g", commaSeparatorInfo, "1:02:03" };
                yield return new object[] { -new FormatObservedTimeSpan(1, 2, 3), "g", commaSeparatorInfo, "-1:02:03" };
                yield return new object[] { new FormatObservedTimeSpan(12, 34, 56), "g", commaSeparatorInfo, "12:34:56" };
                yield return new object[] { new FormatObservedTimeSpan(12, 34, 56, 23), "g", commaSeparatorInfo, "13:10:56:23" };
                yield return new object[] { new FormatObservedTimeSpan(12, 34, 56, 23, 45), "g", commaSeparatorInfo, "13:10:56:23,045" };
                yield return new object[] { new FormatObservedTimeSpan(0, 23, 59, 59, 999), "g", commaSeparatorInfo, "23:59:59,999" };
            }

            // general long format, invariant culture
            yield return new object[] { input, "G", invariantInfo, "142:21:21:18.9101112" };
            yield return new object[] { FormatObservedTimeSpan.Zero, "G", invariantInfo, "0:00:00:00.0000000" };
            yield return new object[] { new FormatObservedTimeSpan(1), "G", invariantInfo, "0:00:00:00.0000001" };
            yield return new object[] { new FormatObservedTimeSpan(-1), "G", invariantInfo, "-0:00:00:00.0000001" };
            yield return new object[] { FormatObservedTimeSpan.MaxValue, "G", invariantInfo, "10675199:02:48:05.4775807" };
            yield return new object[] { FormatObservedTimeSpan.MinValue, "G", invariantInfo, "-10675199:02:48:05.4775808" };
            yield return new object[] { new FormatObservedTimeSpan(1, 2, 3), "G", invariantInfo, "0:01:02:03.0000000" };
            yield return new object[] { -new FormatObservedTimeSpan(1, 2, 3), "G", invariantInfo, "-0:01:02:03.0000000" };
            yield return new object[] { new FormatObservedTimeSpan(12, 34, 56), "G", invariantInfo, "0:12:34:56.0000000" };
            yield return new object[] { new FormatObservedTimeSpan(12, 34, 56, 23), "G", invariantInfo, "13:10:56:23.0000000" };
            yield return new object[] { new FormatObservedTimeSpan(12, 34, 56, 23, 45), "G", invariantInfo, "13:10:56:23.0450000" };
            yield return new object[] { new FormatObservedTimeSpan(0, 23, 59, 59, 999), "G", invariantInfo, "0:23:59:59.9990000" };

            if (PlatformDetection.IsNotInvariantGlobalization)
            {
                // general long format, NumberDecimalSeparator used
                yield return new object[] { input, "G", commaSeparatorInfo, "142:21:21:18,9101112" };
                yield return new object[] { FormatObservedTimeSpan.Zero, "G", commaSeparatorInfo, "0:00:00:00,0000000" };
                yield return new object[] { new FormatObservedTimeSpan(1), "G", commaSeparatorInfo, "0:00:00:00,0000001" };
                yield return new object[] { new FormatObservedTimeSpan(-1), "G", commaSeparatorInfo, "-0:00:00:00,0000001" };
                yield return new object[] { FormatObservedTimeSpan.MaxValue, "G", commaSeparatorInfo, "10675199:02:48:05,4775807" };
                yield return new object[] { FormatObservedTimeSpan.MinValue, "G", commaSeparatorInfo, "-10675199:02:48:05,4775808" };
                yield return new object[] { new FormatObservedTimeSpan(1, 2, 3), "G", commaSeparatorInfo, "0:01:02:03,0000000" };
                yield return new object[] { -new FormatObservedTimeSpan(1, 2, 3), "G", commaSeparatorInfo, "-0:01:02:03,0000000" };
                yield return new object[] { new FormatObservedTimeSpan(12, 34, 56), "G", commaSeparatorInfo, "0:12:34:56,0000000" };
                yield return new object[] { new FormatObservedTimeSpan(12, 34, 56, 23), "G", commaSeparatorInfo, "13:10:56:23,0000000" };
                yield return new object[] { new FormatObservedTimeSpan(12, 34, 56, 23, 45), "G", commaSeparatorInfo, "13:10:56:23,0450000" };
                yield return new object[] { new FormatObservedTimeSpan(0, 23, 59, 59, 999), "G", commaSeparatorInfo, "0:23:59:59,9990000" };
            }
        }
[Theory]
[MemberData(nameof(ToString_TestData))]
public static void ToString_Valid(FormatObservedTimeSpan input, string format, CultureInfo info, string expected)
        {
            Assert.Equal(expected, input.ToString(format, info));
            if (info == null)
            {
                Assert.Equal(expected, input.ToString(format));
                if (format == null)
                {
                    Assert.Equal(expected, input.ToString());
                }
            }
        }
public static IEnumerable<object[]> ToString_InvalidFormat_TestData()
        {
            yield return new object[] { "y" };
            yield return new object[] { "cc" };
            yield return new object[] { "F" };
            yield return new object[] { "C" };
        }
[Theory]
[MemberData(nameof(ToString_InvalidFormat_TestData))]
public static void ToString_InvalidFormat_ThrowsFormatException(string invalidFormat)
        {
            Assert.Throws<FormatException>(() => new FormatObservedTimeSpan().ToString(invalidFormat));
        }
[Theory]
[MemberData(nameof(ToString_TestData))]
public static void TryFormat_Valid(FormatObservedTimeSpan input, string format, CultureInfo info, string expected)
        {
            // UTF16
            {
                int charsWritten;
                Span<char> dst;

                dst = new char[expected.Length - 1];
                Assert.False(input.TryFormat(dst, out charsWritten, format, info));
                Assert.Equal(0, charsWritten);

                dst = new char[expected.Length];
                Assert.True(input.TryFormat(dst, out charsWritten, format, info));
                Assert.Equal(expected.Length, charsWritten);
                Assert.Equal(expected, new string(dst));

                dst = new char[expected.Length + 1];
                Assert.True(input.TryFormat(dst, out charsWritten, format, info));
                Assert.Equal(expected.Length, charsWritten);
                Assert.Equal(expected, new string(dst.Slice(0, dst.Length - 1)));
                Assert.Equal(0, dst[dst.Length - 1]);
            }

            // UTF8
            {
                int bytesWritten;
                Span<byte> dst;

                dst = new byte[expected.Length - 1];
                Assert.False(input.TryFormat(dst, out bytesWritten, format, info));
                Assert.Equal(0, bytesWritten);

                dst = new byte[expected.Length];
                Assert.True(input.TryFormat(dst, out bytesWritten, format, info));
                Assert.Equal(expected.Length, bytesWritten);
                Assert.Equal(expected, Encoding.UTF8.GetString(dst));

                dst = new byte[expected.Length + 1];
                Assert.True(input.TryFormat(dst, out bytesWritten, format, info));
                Assert.Equal(expected.Length, bytesWritten);
                Assert.Equal(expected, Encoding.UTF8.GetString(dst.Slice(0, dst.Length - 1)));
                Assert.Equal(0, dst[dst.Length - 1]);
            }
        }
[Theory]
[MemberData(nameof(ToString_InvalidFormat_TestData))]
public static void TryFormat_InvalidFormat_ThrowsFormatException(string invalidFormat)
        {
            Assert.Throws<FormatException>(() => new FormatObservedTimeSpan().TryFormat(new char[1], out int charsWritten, invalidFormat, null));
            Assert.Throws<FormatException>(() => ((IUtf8SpanFormattable)new FormatObservedTimeSpan()).TryFormat(new byte[1], out int bytesWritten, invalidFormat, null));
        }
}
