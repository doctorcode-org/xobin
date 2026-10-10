using System.Globalization;
using System.Text.Json;
#pragma warning disable CS8625, CS0162

// Official ToString data from dotnet/runtime v10.0.7, with non-invariant globalization enabled.
internal static class DateTimeFormatOracle
{
        public static IEnumerable<object[]> ToString_MatchesExpected_MemberData()
        {
            // Randomly generated data on .NET Framework with:
            //     using System;
            //     using System.Globalization;
            //     class Program
            //     {
            //         static void Main()
            //         {
            //             var rand = new Random(1);
            //             var bytes = new byte[8];
            //             for (int i = 0; i < 100; )
            //             {
            //                 const string Formats = "dDfFgGmMoOrRstTuUyY";
            //                 string format = Formats[rand.Next(Formats.Length - 1)].ToString();
            //                 DateTimeKind kind = format == "U" || rand.Next(2) == 0 ? DateTimeKind.Utc : DateTimeKind.Unspecified;
            //                 try
            //                 {
            //                     rand.NextBytes(bytes);
            //                     long seed = BitConverter.ToInt64(bytes, 0);
            //                     var dt = new DateTime(seed, kind);
            //                     if (format[0] is 'o' or 'O' or 'r' or 'R' or 'u' or 's')
            //                     {
            //                         Console.WriteLine($"yield return new object[] {{ new DateTime({seed}, DateTimeKind.{kind}), \"{format}\", null, \"{dt.ToString(format)}\" }};");
            //                     }
            //                     Console.WriteLine($"yield return new object[] {{ new DateTime({seed}, DateTimeKind.{kind}), \"{format}\", CultureInfo.InvariantCulture, \"{dt.ToString(format, CultureInfo.InvariantCulture)}\" }};");
            //                     i++;
            //                 }
            //                 catch { }
            //             }
            //         }
            //     }
            yield return new object[] { new DateTime(2512683898575779670, DateTimeKind.Utc), "M", CultureInfo.InvariantCulture, "May 19" };
            yield return new object[] { new DateTime(1418427749603514933, DateTimeKind.Unspecified), "M", CultureInfo.InvariantCulture, "October 26" };
            yield return new object[] { new DateTime(2499951271131650615, DateTimeKind.Unspecified), "F", CultureInfo.InvariantCulture, "Saturday, 13 January 7923 02:51:53" };
            yield return new object[] { new DateTime(710634958044951822, DateTimeKind.Utc), "s", null, "2252-11-30T03:56:44" };
            yield return new object[] { new DateTime(710634958044951822, DateTimeKind.Utc), "s", CultureInfo.InvariantCulture, "2252-11-30T03:56:44" };
            yield return new object[] { new DateTime(436815073371195206, DateTimeKind.Utc), "u", null, "1385-03-19 00:02:17Z" };
            yield return new object[] { new DateTime(436815073371195206, DateTimeKind.Utc), "u", CultureInfo.InvariantCulture, "1385-03-19 00:02:17Z" };
            yield return new object[] { new DateTime(316446896574206081, DateTimeKind.Unspecified), "R", null, "Thu, 13 Oct 1003 23:34:17 GMT" };
            yield return new object[] { new DateTime(316446896574206081, DateTimeKind.Unspecified), "R", CultureInfo.InvariantCulture, "Thu, 13 Oct 1003 23:34:17 GMT" };
            yield return new object[] { new DateTime(1352087970149786791, DateTimeKind.Unspecified), "s", null, "4285-08-06T15:10:14" };
            yield return new object[] { new DateTime(1352087970149786791, DateTimeKind.Unspecified), "s", CultureInfo.InvariantCulture, "4285-08-06T15:10:14" };
            yield return new object[] { new DateTime(2088191207949098198, DateTimeKind.Unspecified), "s", null, "6618-03-20T23:19:54" };
            yield return new object[] { new DateTime(2088191207949098198, DateTimeKind.Unspecified), "s", CultureInfo.InvariantCulture, "6618-03-20T23:19:54" };
            yield return new object[] { new DateTime(2288235758934952239, DateTimeKind.Unspecified), "r", null, "Sun, 18 Feb 7252 00:24:53 GMT" };
            yield return new object[] { new DateTime(2288235758934952239, DateTimeKind.Unspecified), "r", CultureInfo.InvariantCulture, "Sun, 18 Feb 7252 00:24:53 GMT" };
            yield return new object[] { new DateTime(209108096540236683, DateTimeKind.Unspecified), "o", null, "0663-08-22T06:14:14.0236683" };
            yield return new object[] { new DateTime(209108096540236683, DateTimeKind.Unspecified), "o", CultureInfo.InvariantCulture, "0663-08-22T06:14:14.0236683" };
            yield return new object[] { new DateTime(1316597307220179904, DateTimeKind.Utc), "y", CultureInfo.InvariantCulture, "4173 February" };
            yield return new object[] { new DateTime(751912476142109916, DateTimeKind.Utc), "s", null, "2383-09-20T01:40:14" };
            yield return new object[] { new DateTime(751912476142109916, DateTimeKind.Utc), "s", CultureInfo.InvariantCulture, "2383-09-20T01:40:14" };
            yield return new object[] { new DateTime(3046050580483567299, DateTimeKind.Unspecified), "F", CultureInfo.InvariantCulture, "Sunday, 20 July 9653 12:07:28" };
            yield return new object[] { new DateTime(3125195716254155533, DateTimeKind.Unspecified), "f", CultureInfo.InvariantCulture, "Monday, 09 May 9904 16:07" };
            yield return new object[] { new DateTime(2164505795082557313, DateTimeKind.Utc), "s", null, "6860-01-18T00:58:28" };
            yield return new object[] { new DateTime(2164505795082557313, DateTimeKind.Utc), "s", CultureInfo.InvariantCulture, "6860-01-18T00:58:28" };
            yield return new object[] { new DateTime(2018959023098512429, DateTimeKind.Unspecified), "o", null, "6398-10-30T03:05:09.8512429" };
            yield return new object[] { new DateTime(2018959023098512429, DateTimeKind.Unspecified), "o", CultureInfo.InvariantCulture, "6398-10-30T03:05:09.8512429" };
            yield return new object[] { new DateTime(362242523795069450, DateTimeKind.Unspecified), "M", CultureInfo.InvariantCulture, "November 26" };
            yield return new object[] { new DateTime(975348914587607928, DateTimeKind.Unspecified), "R", null, "Mon, 05 Oct 3091 01:24:18 GMT" };
            yield return new object[] { new DateTime(975348914587607928, DateTimeKind.Unspecified), "R", CultureInfo.InvariantCulture, "Mon, 05 Oct 3091 01:24:18 GMT" };
            yield return new object[] { new DateTime(1332077483785455528, DateTimeKind.Utc), "g", CultureInfo.InvariantCulture, "03/10/4222 08:19" };
            yield return new object[] { new DateTime(938000944370428233, DateTimeKind.Unspecified), "F", CultureInfo.InvariantCulture, "Saturday, 29 May 2973 05:47:17" };
            yield return new object[] { new DateTime(102597329933554815, DateTimeKind.Utc), "s", null, "0326-02-13T21:49:53" };
            yield return new object[] { new DateTime(102597329933554815, DateTimeKind.Utc), "s", CultureInfo.InvariantCulture, "0326-02-13T21:49:53" };
            yield return new object[] { new DateTime(1575336794858529992, DateTimeKind.Utc), "s", null, "4993-01-16T11:24:45" };
            yield return new object[] { new DateTime(1575336794858529992, DateTimeKind.Utc), "s", CultureInfo.InvariantCulture, "4993-01-16T11:24:45" };
            yield return new object[] { new DateTime(2450361739181076766, DateTimeKind.Unspecified), "R", null, "Wed, 20 Nov 7765 19:51:58 GMT" };
            yield return new object[] { new DateTime(2450361739181076766, DateTimeKind.Unspecified), "R", CultureInfo.InvariantCulture, "Wed, 20 Nov 7765 19:51:58 GMT" };
            yield return new object[] { new DateTime(1831173654073094025, DateTimeKind.Unspecified), "O", null, "5803-10-05T22:50:07.3094025" };
            yield return new object[] { new DateTime(1831173654073094025, DateTimeKind.Unspecified), "O", CultureInfo.InvariantCulture, "5803-10-05T22:50:07.3094025" };
            yield return new object[] { new DateTime(137945581016100484, DateTimeKind.Utc), "F", CultureInfo.InvariantCulture, "Thursday, 18 February 0438 05:41:41" };
            yield return new object[] { new DateTime(525341615994432483, DateTimeKind.Unspecified), "r", null, "Mon, 28 Sep 1665 06:39:59 GMT" };
            yield return new object[] { new DateTime(525341615994432483, DateTimeKind.Unspecified), "r", CultureInfo.InvariantCulture, "Mon, 28 Sep 1665 06:39:59 GMT" };
            yield return new object[] { new DateTime(2613907075018610263, DateTimeKind.Utc), "o", null, "8284-02-22T09:51:41.8610263Z" };
            yield return new object[] { new DateTime(2613907075018610263, DateTimeKind.Utc), "o", CultureInfo.InvariantCulture, "8284-02-22T09:51:41.8610263Z" };
            yield return new object[] { new DateTime(1712606630201205966, DateTimeKind.Unspecified), "M", CultureInfo.InvariantCulture, "January 14" };
            yield return new object[] { new DateTime(725879962860475783, DateTimeKind.Utc), "f", CultureInfo.InvariantCulture, "Saturday, 23 March 2301 20:18" };
            yield return new object[] { new DateTime(322635236878311096, DateTimeKind.Utc), "u", null, "1023-05-24 09:54:47Z" };
            yield return new object[] { new DateTime(322635236878311096, DateTimeKind.Utc), "u", CultureInfo.InvariantCulture, "1023-05-24 09:54:47Z" };
            yield return new object[] { new DateTime(381748720453740183, DateTimeKind.Unspecified), "D", CultureInfo.InvariantCulture, "Saturday, 18 September 1210" };
            yield return new object[] { new DateTime(42694710897975892, DateTimeKind.Unspecified), "g", CultureInfo.InvariantCulture, "04/18/0136 04:11" };
            yield return new object[] { new DateTime(2889335867722033047, DateTimeKind.Unspecified), "t", CultureInfo.InvariantCulture, "17:39" };
            yield return new object[] { new DateTime(2206002659591968158, DateTimeKind.Utc), "s", null, "6991-07-18T19:39:19" };
            yield return new object[] { new DateTime(2206002659591968158, DateTimeKind.Utc), "s", CultureInfo.InvariantCulture, "6991-07-18T19:39:19" };
            yield return new object[] { new DateTime(500692619528772429, DateTimeKind.Utc), "U", CultureInfo.InvariantCulture, "Thursday, 20 August 1587 08:19:12" };
            yield return new object[] { new DateTime(1252677333999884910, DateTimeKind.Unspecified), "m", CultureInfo.InvariantCulture, "July 31" };
            yield return new object[] { new DateTime(1634887756817883247, DateTimeKind.Unspecified), "g", CultureInfo.InvariantCulture, "10/03/5181 04:48" };
            yield return new object[] { new DateTime(2995838620636779202, DateTimeKind.Unspecified), "T", CultureInfo.InvariantCulture, "19:27:43" };
            yield return new object[] { new DateTime(1108255955917223459, DateTimeKind.Unspecified), "u", null, "3512-12-04 15:39:51Z" };
            yield return new object[] { new DateTime(1108255955917223459, DateTimeKind.Unspecified), "u", CultureInfo.InvariantCulture, "3512-12-04 15:39:51Z" };
            yield return new object[] { new DateTime(1345442651123205077, DateTimeKind.Utc), "U", CultureInfo.InvariantCulture, "Saturday, 16 July 4264 06:58:32" };
            yield return new object[] { new DateTime(1683269053145633504, DateTimeKind.Unspecified), "f", CultureInfo.InvariantCulture, "Wednesday, 26 January 5335 01:41" };
            yield return new object[] { new DateTime(261818716531476839, DateTimeKind.Utc), "G", CultureInfo.InvariantCulture, "09/02/0830 22:07:33" };
            yield return new object[] { new DateTime(149735664893692740, DateTimeKind.Unspecified), "m", CultureInfo.InvariantCulture, "June 30" };
            yield return new object[] { new DateTime(1633263998564961778, DateTimeKind.Unspecified), "G", CultureInfo.InvariantCulture, "08/10/5176 20:24:16" };
            yield return new object[] { new DateTime(1850421988142570769, DateTimeKind.Utc), "U", CultureInfo.InvariantCulture, "Monday, 03 October 5864 02:46:54" };
            yield return new object[] { new DateTime(2161519739750829933, DateTimeKind.Utc), "g", CultureInfo.InvariantCulture, "08/01/6850 22:59" };
            yield return new object[] { new DateTime(94926719545582445, DateTimeKind.Unspecified), "g", CultureInfo.InvariantCulture, "10/24/0301 21:19" };
            yield return new object[] { new DateTime(95117358366291132, DateTimeKind.Unspecified), "g", CultureInfo.InvariantCulture, "06/02/0302 12:50" };
            yield return new object[] { new DateTime(79516486664227528, DateTimeKind.Unspecified), "y", CultureInfo.InvariantCulture, "0252 December" };
            yield return new object[] { new DateTime(2919373514923133815, DateTimeKind.Utc), "F", CultureInfo.InvariantCulture, "Friday, 16 February 9252 12:44:52" };
            yield return new object[] { new DateTime(2841096139227741307, DateTimeKind.Utc), "U", CultureInfo.InvariantCulture, "Sunday, 29 January 9004 17:12:02" };
            yield return new object[] { new DateTime(984728578700999277, DateTimeKind.Unspecified), "s", null, "3121-06-26T03:37:50" };
            yield return new object[] { new DateTime(984728578700999277, DateTimeKind.Unspecified), "s", CultureInfo.InvariantCulture, "3121-06-26T03:37:50" };
            yield return new object[] { new DateTime(1756213541961400682, DateTimeKind.Unspecified), "g", CultureInfo.InvariantCulture, "03/22/5566 13:29" };
            yield return new object[] { new DateTime(1610212733937562232, DateTimeKind.Utc), "O", null, "5103-07-26T03:29:53.7562232Z" };
            yield return new object[] { new DateTime(1610212733937562232, DateTimeKind.Utc), "O", CultureInfo.InvariantCulture, "5103-07-26T03:29:53.7562232Z" };
            yield return new object[] { new DateTime(1502152713607918360, DateTimeKind.Utc), "d", CultureInfo.InvariantCulture, "02/18/4761" };
            yield return new object[] { new DateTime(230701341483195296, DateTimeKind.Unspecified), "T", CultureInfo.InvariantCulture, "10:35:48" };
            yield return new object[] { new DateTime(2946266365850485700, DateTimeKind.Utc), "D", CultureInfo.InvariantCulture, "Tuesday, 07 May 9337" };
            yield return new object[] { new DateTime(1177714949170378355, DateTimeKind.Utc), "d", CultureInfo.InvariantCulture, "01/12/3733" };
            yield return new object[] { new DateTime(2431112234795033050, DateTimeKind.Unspecified), "R", null, "Fri, 21 Nov 7704 07:24:39 GMT" };
            yield return new object[] { new DateTime(2431112234795033050, DateTimeKind.Unspecified), "R", CultureInfo.InvariantCulture, "Fri, 21 Nov 7704 07:24:39 GMT" };
            yield return new object[] { new DateTime(1166878226846532954, DateTimeKind.Unspecified), "R", null, "Tue, 09 Sep 3698 12:04:44 GMT" };
            yield return new object[] { new DateTime(1166878226846532954, DateTimeKind.Unspecified), "R", CultureInfo.InvariantCulture, "Tue, 09 Sep 3698 12:04:44 GMT" };
            yield return new object[] { new DateTime(806691560290860158, DateTimeKind.Utc), "T", CultureInfo.InvariantCulture, "18:53:49" };
            yield return new object[] { new DateTime(2329057094873169055, DateTimeKind.Unspecified), "t", CultureInfo.InvariantCulture, "22:24" };
            yield return new object[] { new DateTime(40244582424527696, DateTimeKind.Utc), "m", CultureInfo.InvariantCulture, "July 13" };
            yield return new object[] { new DateTime(754027911411478522, DateTimeKind.Unspecified), "g", CultureInfo.InvariantCulture, "06/03/2390 11:45" };
            yield return new object[] { new DateTime(932480534482684875, DateTimeKind.Unspecified), "r", null, "Sun, 30 Nov 2955 21:04:08 GMT" };
            yield return new object[] { new DateTime(932480534482684875, DateTimeKind.Unspecified), "r", CultureInfo.InvariantCulture, "Sun, 30 Nov 2955 21:04:08 GMT" };
            yield return new object[] { new DateTime(794982031942527306, DateTimeKind.Utc), "o", null, "2520-03-14T02:13:14.2527306Z" };
            yield return new object[] { new DateTime(794982031942527306, DateTimeKind.Utc), "o", CultureInfo.InvariantCulture, "2520-03-14T02:13:14.2527306Z" };
            yield return new object[] { new DateTime(2552572811382202194, DateTimeKind.Unspecified), "D", CultureInfo.InvariantCulture, "Wednesday, 12 October 8089" };
            yield return new object[] { new DateTime(924767003882430526, DateTimeKind.Unspecified), "o", null, "2931-06-22T04:19:48.2430526" };
            yield return new object[] { new DateTime(924767003882430526, DateTimeKind.Unspecified), "o", CultureInfo.InvariantCulture, "2931-06-22T04:19:48.2430526" };
            yield return new object[] { new DateTime(2081361007423859108, DateTimeKind.Utc), "r", null, "Wed, 27 Jul 6596 15:32:22 GMT" };
            yield return new object[] { new DateTime(2081361007423859108, DateTimeKind.Utc), "r", CultureInfo.InvariantCulture, "Wed, 27 Jul 6596 15:32:22 GMT" };
            yield return new object[] { new DateTime(976120464384576984, DateTimeKind.Utc), "m", CultureInfo.InvariantCulture, "March 16" };
            yield return new object[] { new DateTime(2714985378271158548, DateTimeKind.Utc), "D", CultureInfo.InvariantCulture, "Wednesday, 13 June 8604" };
            yield return new object[] { new DateTime(388901633623941264, DateTimeKind.Unspecified), "O", null, "1233-05-19T15:09:22.3941264" };
            yield return new object[] { new DateTime(388901633623941264, DateTimeKind.Unspecified), "O", CultureInfo.InvariantCulture, "1233-05-19T15:09:22.3941264" };
            yield return new object[] { new DateTime(319688581620784322, DateTimeKind.Utc), "d", CultureInfo.InvariantCulture, "01/20/1014" };
            yield return new object[] { new DateTime(1003375214898507843, DateTimeKind.Unspecified), "m", CultureInfo.InvariantCulture, "July 27" };
            yield return new object[] { new DateTime(2731383388115156519, DateTimeKind.Utc), "g", CultureInfo.InvariantCulture, "05/30/8656 08:46" };
            yield return new object[] { new DateTime(520874643765750485, DateTimeKind.Unspecified), "g", CultureInfo.InvariantCulture, "08/03/1651 04:06" };
            yield return new object[] { new DateTime(1817267127527243509, DateTimeKind.Unspecified), "o", null, "5759-09-10T10:25:52.7243509" };
            yield return new object[] { new DateTime(1817267127527243509, DateTimeKind.Unspecified), "o", CultureInfo.InvariantCulture, "5759-09-10T10:25:52.7243509" };
            yield return new object[] { new DateTime(806709007011133014, DateTimeKind.Unspecified), "t", CultureInfo.InvariantCulture, "23:31" };
            yield return new object[] { new DateTime(2916204299343097820, DateTimeKind.Unspecified), "F", CultureInfo.InvariantCulture, "Friday, 31 January 9242 10:58:54" };
            yield return new object[] { new DateTime(2540972632026940446, DateTimeKind.Utc), "U", CultureInfo.InvariantCulture, "Wednesday, 08 January 8053 13:06:42" };
            yield return new object[] { new DateTime(3000408879267760663, DateTimeKind.Unspecified), "F", CultureInfo.InvariantCulture, "Wednesday, 02 December 9508 11:05:26" };
            yield return new object[] { new DateTime(577741049440182530, DateTimeKind.Utc), "d", CultureInfo.InvariantCulture, "10/16/1831" };
            yield return new object[] { new DateTime(2034367617628955170, DateTimeKind.Unspecified), "t", CultureInfo.InvariantCulture, "03:36" };
            yield return new object[] { new DateTime(2403989608406651024, DateTimeKind.Unspecified), "M", CultureInfo.InvariantCulture, "December 10" };
            yield return new object[] { new DateTime(169944266714106250, DateTimeKind.Utc), "s", null, "0539-07-14T18:04:31" };
            yield return new object[] { new DateTime(169944266714106250, DateTimeKind.Utc), "s", CultureInfo.InvariantCulture, "0539-07-14T18:04:31" };
            yield return new object[] { new DateTime(1496223718294708781, DateTimeKind.Utc), "s", null, "4742-05-07T09:57:09" };
            yield return new object[] { new DateTime(1496223718294708781, DateTimeKind.Utc), "s", CultureInfo.InvariantCulture, "4742-05-07T09:57:09" };
            yield return new object[] { new DateTime(1955185877962687130, DateTimeKind.Utc), "G", CultureInfo.InvariantCulture, "09/26/6196 14:49:56" };
            yield return new object[] { new DateTime(2580142503695336223, DateTimeKind.Utc), "U", CultureInfo.InvariantCulture, "Sunday, 23 February 8177 01:06:09" };
            yield return new object[] { new DateTime(1821923614163252532, DateTimeKind.Unspecified), "s", null, "5774-06-12T21:16:56" };
            yield return new object[] { new DateTime(1821923614163252532, DateTimeKind.Unspecified), "s", CultureInfo.InvariantCulture, "5774-06-12T21:16:56" };
            yield return new object[] { new DateTime(1463554571190465720, DateTimeKind.Utc), "f", CultureInfo.InvariantCulture, "Saturday, 27 October 4638 21:38" };
            yield return new object[] { new DateTime(930216714557251488, DateTimeKind.Unspecified), "D", CultureInfo.InvariantCulture, "Friday, 27 September 2948" };
            yield return new object[] { new DateTime(394960014092996385, DateTimeKind.Utc), "o", null, "1252-07-30T15:30:09.2996385Z" };
            yield return new object[] { new DateTime(394960014092996385, DateTimeKind.Utc), "o", CultureInfo.InvariantCulture, "1252-07-30T15:30:09.2996385Z" };
            yield return new object[] { new DateTime(315410460953591926, DateTimeKind.Utc), "o", null, "1000-07-01T09:41:35.3591926Z" };
            yield return new object[] { new DateTime(315410460953591926, DateTimeKind.Utc), "o", CultureInfo.InvariantCulture, "1000-07-01T09:41:35.3591926Z" };
            yield return new object[] { new DateTime(632402741486587776, DateTimeKind.Unspecified), "f", CultureInfo.InvariantCulture, "Sunday, 02 January 2005 14:49" };
            yield return new object[] { new DateTime(2476889938089063320, DateTimeKind.Utc), "f", CultureInfo.InvariantCulture, "Friday, 14 December 7849 18:16" };
            yield return new object[] { new DateTime(1461010624152234289, DateTimeKind.Unspecified), "d", CultureInfo.InvariantCulture, "10/05/4630" };
            yield return new object[] { new DateTime(628703264608901490, DateTimeKind.Utc), "o", null, "1993-04-13T19:34:20.8901490Z" };
            yield return new object[] { new DateTime(628703264608901490, DateTimeKind.Utc), "o", CultureInfo.InvariantCulture, "1993-04-13T19:34:20.8901490Z" };
            yield return new object[] { new DateTime(681957838388530050, DateTimeKind.Utc), "O", null, "2162-01-15T01:17:18.8530050Z" };
            yield return new object[] { new DateTime(681957838388530050, DateTimeKind.Utc), "O", CultureInfo.InvariantCulture, "2162-01-15T01:17:18.8530050Z" };
            yield return new object[] { new DateTime(788041760058691059, DateTimeKind.Unspecified), "d", CultureInfo.InvariantCulture, "03/16/2498" };
            yield return new object[] { new DateTime(2146466025818766443, DateTimeKind.Utc), "o", null, "6802-11-18T16:16:21.8766443Z" };
            yield return new object[] { new DateTime(2146466025818766443, DateTimeKind.Utc), "o", CultureInfo.InvariantCulture, "6802-11-18T16:16:21.8766443Z" };

            // Year patterns
            if (true)
            {
                var enUS = new CultureInfo("en-US");
                var thTH = new CultureInfo("th-TH");
                yield return new object[] { new DateTime(1234, 5, 6), "yy", enUS, "34" };
                yield return new object[] { DateTime.MaxValue, "yy", thTH, "42" };
                for (int i = 3; i < 20; i++)
                {
                    yield return new object[] { new DateTime(1234, 5, 6), new string('y', i), enUS, 1234.ToString("D" + i) };
                    yield return new object[] { DateTime.MaxValue, new string('y', i), thTH, 10542.ToString("D" + i) };
                }
            }
            else
            {
                var invariant = new CultureInfo("");
                yield return new object[] { new DateTime(1234, 5, 6), "yy", invariant, "34" };

                for (int i = 3; i < 20; i++)
                {
                    yield return new object[] { new DateTime(1234, 5, 6), new string('y', i), invariant, 1234.ToString("D" + i) };
                }
            }

            // Non-ASCII in format string
            yield return new object[] { new DateTime(2023, 04, 17, 10, 46, 12, DateTimeKind.Utc), "HH\u202dmm", null, "10\u202d46" };
        }

    internal static string Generate()
    {
        var rows = new List<object>();
        var cultures = new Dictionary<string, object>();
        foreach (var a in ToString_MatchesExpected_MemberData())
        {
            var date = (DateTime)a[0];
            string format = (string)a[1];
            var provider = (CultureInfo?)a[2];
            string actual = date.ToString(format, provider);
            if (actual != (string)a[3]) throw new InvalidOperationException("Official ToString assertion failed.");
            string name = provider?.Name ?? "";
            var c = provider ?? CultureInfo.InvariantCulture;
            AddCulture(c);
            rows.Add(new { source = "DateTimeTests.ToString_Invoke_ReturnsExpected", ticks = date.Ticks.ToString(), kind = (int)date.Kind,
                format, culture = name, result = actual });
            var chars = new char[actual.Length];
            var bytes = new byte[System.Text.Encoding.UTF8.GetByteCount(actual)];
            if (!date.TryFormat(chars, out int charsWritten, format, provider) || charsWritten != actual.Length || new string(chars) != actual
                || !date.TryFormat(bytes, out int bytesWritten, format, provider) || bytesWritten != bytes.Length
                || System.Text.Encoding.UTF8.GetString(bytes) != actual
                || date.TryFormat(chars.AsSpan(0, chars.Length - 1), out charsWritten, format, provider) || charsWritten != 0
                || date.TryFormat(bytes.AsSpan(0, bytes.Length - 1), out bytesWritten, format, provider) || bytesWritten != 0)
                throw new InvalidOperationException("Official TryFormat assertion failed.");
            rows.Add(new { source = "DateTimeTests.TryFormat_MatchesExpected", ticks = date.Ticks.ToString(), kind = (int)date.Kind,
                format, culture = name, result = actual });
        }
        var supplemental = new List<object>();
        string[] formats = ["d", "D", "t", "T", "f", "F", "g", "G", "m", "M", "y", "Y", "s", "u", "U", "r", "R", "o", "O",
            "yyyy-MM-dd HH:mm:ss.fffffff K", "yyyy MM dd HH:mm:ss.FFFFFFF", "yy y yyy yyyy yyyyyyyyyyyyyyyyy",
            "MMM MMMM dd d ddd dddd", "HH H h hh m mm s ss t tt g gg", "yyyy z zz zzz K KKK", "HH:mm:ss.fff ffff fffff ffffff fffffff",
            "ss.F FF FFF FFFF FFFFF FFFFFF FFFFFFF", "ss.%F", "\\y '%M' \"literal\" %M %d %H", "'it\\'s'", "'", "\"", "\\", "%", "%%", "Q", "ffffffff", "FFFFFFFF", "%ff", "", "%y %M %d", "yyyy'年'MM'月'dd'日'", "HH\u202dmm"];
        foreach (string name in new[] { "", "en-US", "th-TH", "fr-FR", "ru-RU", "fa-IR", "ar-SA" })
        {
            var culture = CultureInfo.GetCultureInfo(name);
            AddCulture(culture);
            foreach (long ticks in new[] { 0L, 630873792000000000L, 638454117081234567L, DateTime.MaxValue.Ticks })
            foreach (var kind in new[] { DateTimeKind.Unspecified, DateTimeKind.Utc, DateTimeKind.Local })
            foreach (string format in formats)
            {
                string? result = null;
                Exception? error = null;
                try { result = new DateTime(ticks, kind).ToString(format, culture); } catch (Exception e) { error = e; }
                supplemental.Add(new { ticks = ticks.ToString(), kind = (int)kind, format, culture = name, result,
                    error = error?.GetType().Name, paramName = (error as ArgumentException)?.ParamName, message = error?.Message });
            }
        }
        var allFormats = new List<object>();
        foreach (string name in cultures.Keys)
        foreach (var kind in new[] { DateTimeKind.Unspecified, DateTimeKind.Utc, DateTimeKind.Local })
        foreach (string? format in "dDfFgGmMoOrRstTuUyYx".Select(value => (string?)value.ToString()).Prepend(null))
        {
            var date = new DateTime(2009, 7, 28, 5, 23, 15, kind);
            string[]? result = null;
            Exception? error = null;
            try { result = format == null ? date.GetDateTimeFormats(CultureInfo.GetCultureInfo(name))
                : date.GetDateTimeFormats(format[0], CultureInfo.GetCultureInfo(name)); } catch (Exception e) { error = e; }
            allFormats.Add(new { ticks = date.Ticks.ToString(), kind = (int)kind, format, culture = name, result,
                error = error?.GetType().Name, message = error?.Message });
        }
        var customFormats = new List<object>();
        foreach (string name in cultures.Keys)
        foreach (string pattern in new[] { "yyyy", "'custom'" })
        foreach (string format in new[] { "F", "U" })
        {
            var culture = new CultureInfo(name, false);
            culture.DateTimeFormat.FullDateTimePattern = pattern;
            var date = new DateTime(2024, 3, 20, 3, 4, 5, DateTimeKind.Utc);
            customFormats.Add(new { culture = name, pattern, format, ticks = date.Ticks.ToString(),
                kind = (int)date.Kind, result = date.ToString(format, culture) });
        }
        return JsonSerializer.Serialize(new { runtime = Environment.Version.ToString(), timeZone = TimeZoneInfo.Local.Id, cultures, rows, supplemental, allFormats, customFormats }, new JsonSerializerOptions { WriteIndented = true }) + "\n";

        void AddCulture(CultureInfo c)
        {
            var f = c.DateTimeFormat;
            var gregorian = (DateTimeFormatInfo)f.Clone();
            gregorian.Calendar = new GregorianCalendar();
            cultures[c.Name] = new { calendar = f.Calendar.GetType().Name, formatInfo = Info(f), gregorianDateTimeFormat = Info(gregorian) };
        }
        object Info(DateTimeFormatInfo f) => new {
                abbreviatedDayNames = f.AbbreviatedDayNames, abbreviatedMonthGenitiveNames = f.AbbreviatedMonthGenitiveNames,
                abbreviatedMonthNames = f.AbbreviatedMonthNames, amDesignator = f.AMDesignator, dateSeparator = f.DateSeparator,
                dayNames = f.DayNames, firstDayOfWeek = (int)f.FirstDayOfWeek, calendarWeekRule = (int)f.CalendarWeekRule,
                fullDateTimePattern = f.FullDateTimePattern,
                longDatePattern = f.LongDatePattern, longTimePattern = f.LongTimePattern, monthDayPattern = f.MonthDayPattern,
                monthGenitiveNames = f.MonthGenitiveNames, monthNames = f.MonthNames, nativeCalendarName = f.NativeCalendarName,
                pmDesignator = f.PMDesignator, rfC1123Pattern = f.RFC1123Pattern, shortDatePattern = f.ShortDatePattern,
                shortestDayNames = f.ShortestDayNames, shortTimePattern = f.ShortTimePattern, sortableDateTimePattern = f.SortableDateTimePattern,
                timeSeparator = f.TimeSeparator, universalSortableDateTimePattern = f.UniversalSortableDateTimePattern,
                yearMonthPattern = f.YearMonthPattern, eraNames = f.Calendar.Eras.Select(f.GetEraName).ToArray(),
                allDateTimePatterns = new[] { 'd', 'D', 't', 'T', 'y', 'Y', 'm', 'M' }.ToDictionary(value => value.ToString(), value => f.GetAllDateTimePatterns(value)) };
    }
}
