import { DateTimeFormatInfo } from './date_time_format_info';
import { DateTime } from './date_time';
import { PlainObject } from '@xobin/core';
import { CultureInfo } from './culture_info';

/*
Customized format patterns:
P.S. Format in the table below is the internal number format used to display the pattern.

Patterns   Format      Description                           Example
=========  ==========  ===================================== ========
"h"         "0"         hour (12-hour clock)w/o leading zero  3
"hh"        "00"        hour (12-hour clock)with leading zero 03
"hh*"       "00"        hour (12-hour clock)with leading zero 03

"H"         "0"         hour (24-hour clock)w/o leading zero  8
"HH"        "00"        hour (24-hour clock)with leading zero 08
"HH*"       "00"        hour (24-hour clock)                  08

"m"         "0"         minute w/o leading zero
"mm"        "00"        minute with leading zero
"mm*"       "00"        minute with leading zero

"s"         "0"         second w/o leading zero
"ss"        "00"        second with leading zero
"ss*"       "00"        second with leading zero

"f"         "0"         second fraction (1 digit)
"ff"        "00"        second fraction (2 digit)
"fff"       "000"       second fraction (3 digit)
"ffff"      "0000"      second fraction (4 digit)
"fffff"     "00000"         second fraction (5 digit)
"ffffff"    "000000"    second fraction (6 digit)
"fffffff"   "0000000"   second fraction (7 digit)

"F"         "0"         second fraction (up to 1 digit)
"FF"        "00"        second fraction (up to 2 digit)
"FFF"       "000"       second fraction (up to 3 digit)
"FFFF"      "0000"      second fraction (up to 4 digit)
"FFFFF"     "00000"     second fraction (up to 5 digit)
"FFFFFF"    "000000"    second fraction (up to 6 digit)
"FFFFFFF"   "0000000"   second fraction (up to 7 digit)

"t"                     first character of AM/PM designator  A
"tt"                    AM/PM designator                     AM
"tt*"                   AM/PM designator                     PM

"d"         "0"         day w/o leading zero                  1
"dd"        "00"        day with leading zero                 01
"ddd"                   short weekday name (abbreviation)     Mon
"dddd"                  full weekday name                     Monday
"dddd*"                 full weekday name                     Monday


"M"         "0"         month w/o leading zero                2
"MM"        "00"        month with leading zero               02
"MMM"                   short month name (abbreviation)       Feb
"MMMM"                  full month name                       Febuary
"MMMM*"                 full month name                       Febuary

"y"         "0"         two digit year (year % 100) w/o leading zero           0
"yy"        "00"        two digit year (year % 100) with leading zero          00
"yyy"       "D3"        year                                  2000
"yyyy"      "D4"        year                                  2000
"yyyyy"     "D5"        year                                  2000
...

"z"         "+0;-0"     timezone offset w/o leading zero      -8
"zz"        "+00;-00"   timezone offset with leading zero     -08
"zzz"       "+00;-00"   for hour offset, "00" for minute offset  full timezone offset   -07:30
"zzz*"      "+00;-00"   for hour offset, "00" for minute offset   full timezone offset   -08:00

"K"         -Local       "zzz", e.g. -08:00
            -Utc         "'Z'", representing UTC
            -Unspecified ""
            -DateTimeOffset      "zzzzz" e.g -07:30:15

"g*"                the current era name                  A.D.

":"                 time separator                        : -- DEPRECATED - Insert separator directly into pattern (eg: "H.mm.ss")
"/"                 date separator                        /-- DEPRECATED - Insert separator directly into pattern (eg: "M-dd-yyyy")
"'"                 quoted string                         'ABC' will insert ABC into the formatted string.
'"'                 quoted string                         "ABC" will insert ABC into the formatted string.
"%"                 used to quote a single pattern characters      E.g.The format character "%y" is to print two digit year.
"\"                 escaped character                     E.g. '\d' insert the character 'd' into the format string.
other characters    insert the character into the format string.

Pre-defined format characters:
(U) to indicate Universal time is used.
(G) to indicate Gregorian calendar is used.

Format              Description                             Real format                             Example
=========           =================================       ======================                  =======================
"d"                 short date                              culture-specific                        10/31/1999
"D"                 long data                               culture-specific                        Sunday, October 31, 1999
"f"                 full date (long date + short time)      culture-specific                        Sunday, October 31, 1999 2:00 AM
"F"                 full date (long date + long time)       culture-specific                        Sunday, October 31, 1999 2:00:00 AM
"g"                 general date (short date + short time)  culture-specific                        10/31/1999 2:00 AM
"G"                 general date (short date + long time)   culture-specific                        10/31/1999 2:00:00 AM
"m"/"M"             Month/Day date                          culture-specific                        October 31
(G)     "o"/"O"     Round Trip XML                          "yyyy-MM-ddTHH:mm:ss.fffffffK"          1999-10-31 02:00:00.0000000Z
(G)     "r"/"R"     RFC 1123 date,                          "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'"   Sun, 31 Oct 1999 10:00:00 GMT
(G)     "s"         Sortable format, based on ISO 8601.     "yyyy-MM-dd'T'HH:mm:ss"                 1999-10-31T02:00:00
                                                            ('T' for local time)
"t"                 short time                              culture-specific                        2:00 AM
"T"                 long time                               culture-specific                        2:00:00 AM
(G)     "u"         Universal time with sortable format,    "yyyy'-'MM'-'dd HH':'mm':'ss'Z'"        1999-10-31 10:00:00Z
                    based on ISO 8601.
(U)     "U"         Universal time with full                culture-specific                        Sunday, October 31, 1999 10:00:00 AM
                    (long date + long time) format
"y"/"Y"             Year/Month day                          culture-specific                        October, 1999

*/

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

const allStandardFormats: string[] = [
    'd', 'D', 'f', 'F', 'g', 'G',
    'm', 'M', 'o', 'O', 'r', 'R',
    's', 't', 'T', 'u', 'U', 'y', 'Y',
];

const RoundtripFormat = "yyyy'-'MM'-'dd'T'HH':'mm':'ss.fffffffK";
const RoundtripDateTimeUnfixed = "yyyy'-'MM'-'ddTHH':'mm':'ss zzz";

const DEFAULT_ALL_DATETIMES_SIZE = 132;

const InvariantFormatInfo = CultureInfo.invariantCulture.dateTimeFormat;
const InvariantAbbreviatedMonthNames = InvariantFormatInfo.abbreviatedMonthNames;
const InvariantAbbreviatedDayNames = InvariantFormatInfo.abbreviatedDayNames;
const Gmt = "GMT";

const fixedNumberFormats = [
    "0",
    "00",
    "000",
    "0000",
    "00000",
    "000000",
    "0000000",
];

function FormatDigits(outputBuffer:string) {

}

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

const RoundtripFormat = "yyyy'-'MM'-'dd'T'HH':'mm':'ss.fffffffK";
//const RoundtripDateTimeUnfixed = "yyyy'-'MM'-'ddTHH':'mm':'ss zzz";
const DATE_FORMAT_RX = /(y{5,}|yyyy|yyy|yy|y|M{4,}|MMM|MM|M|d{4,}|ddd|dd|d|h{2,}|h|H{2,}|H|m{2,}|m|s{2,}|s|fffffff|ffffff|fffff|ffff|fff|ff|f|FFFFFFF|FFFFFF|FFFFF|FFFF|FFF|FF|F|t{2,}|t|z{3,}|zz|z|K|g|:|\/)/;

export class DateTimeFormat {

    /**
     * 
     * @param date
     * @param format
     * @param culture
     */
    formatInput(date: DateTime, format: string, culture: CultureInfo = CultureInfo.currentCulture): string {
        if (format.length == 1) {
            format = getRealFormat(format, culture.dateTimeFormat);
        }

        let year: number;
        let month: number;
        let day: number;
        //let dayOfWeek: number;
        let hour: number;
        let minute: number;
        let second: number;
        let millisecond: number;

        const calendar = culture.calendar;
        year = calendar.getYear(date);
        month = calendar.getMonth(date);
        day = calendar.getDayOfMonth(date);
        //dayOfWeek = calendar.getDayOfWeek(this);
        hour = calendar.getHour(date);
        minute = calendar.getMinute(date);
        second = calendar.getSecond(date);
        millisecond = calendar.getMilliseconds(date);

        const dateTimeFormat = CultureInfo.currentCulture.dateTimeFormat;

        const data: PlainObject<any> = {};
        data["yyyy"] = year;
        data["yyy"] = year;
        data["yy"] = pad((year % 100));
        data["y"] = (year % 100);
        //..........................................................................................
        data["MMMM"] = dateTimeFormat.monthNames[month];
        data["MMM"] = dateTimeFormat.abbreviatedMonthNames[month];
        data["MM"] = pad(month);
        data["M"] = month;
        //..........................................................................................
        data["dddd"] = dateTimeFormat.dayNames[date.dayOfWeek];
        data["ddd"] = dateTimeFormat.shortestDayNames[date.dayOfWeek];
        data["dd"] = pad(day);
        data["d"] = day;
        //..........................................................................................
        data["hh"] = pad(hour > 12 ? hour - 12 : hour);
        data["h"] = hour > 12 ? hour - 12 : hour;
        //..........................................................................................
        data["HH"] = pad(hour);
        data["H"] = hour;
        //..........................................................................................
        data["mm"] = pad(minute);
        data["m"] = minute;
        //..........................................................................................
        data["ss"] = pad(second);
        data["s"] = second;
        //..........................................................................................
        data["fffffff"] = "";
        data["ffffff"] = "";
        data["fffff"] = "";
        data["ffff"] = "";
        data["fff"] = millisecond;
        data["ff"] = Math.round(millisecond / 10);
        data["f"] = Math.round(millisecond / 100);
        //..........................................................................................
        data["FFFFFFF"] = "";
        data["FFFFFF"] = "";
        data["FFFFF"] = "";
        data["FFFF"] = "";
        data["FFF"] = "";
        data["FF"] = "";
        data["F"] = "";
        //..........................................................................................
        data["tt"] = (hour > 12 ? dateTimeFormat.pmDesignator : dateTimeFormat.amDesignator);
        data["t"] = (hour > 12 ? dateTimeFormat.pmDesignator : dateTimeFormat.amDesignator)[0]; // اینجا فقط یک کارکتر نیاز داریم
        //..........................................................................................
        data["zzz"] = "";
        data["zz"] = "";
        data["z"] = "";
        //..........................................................................................
        data["K"] = "";
        //..........................................................................................
        data["g"] = "";
        //..........................................................................................
        data[":"] = dateTimeFormat.timeSeparator;
        data["/"] = dateTimeFormat.dateSeparator;
        //..........................................................................................

        let res = format!.split(DATE_FORMAT_RX);

        let output = "";

        for (var i = 0; i < res.length; i++) {
            if (res[i]) {
                if (data[res[i]!]) {
                    output += data[res[i]!];
                }
                else {
                    output += res[i];
                }
            }
        }

        return output;
    }

}

function getRealFormat(format: string, dtfi: DateTimeFormatInfo): string {
    let realFormat: string;

    switch (format[0]) {
        case 'd':       // Short Date
            realFormat = dtfi.shortDatePattern;
            break;
        case 'D':       // Long Date
            realFormat = dtfi.longDatePattern;
            break;
        case 'f':       // Full (long date + short time)
            realFormat = dtfi.longDatePattern + " " + dtfi.shortTimePattern;
            break;
        case 'F':       // Full (long date + long time)
            realFormat = dtfi.fullDateTimePattern;
            break;
        case 'g':       // General (short date + short time)
            realFormat = dtfi.shortDatePattern + dtfi.shortTimePattern;
            break;
        case 'G':       // General (short date + long time)
            realFormat = dtfi.shortDatePattern + dtfi.longTimePattern;
            break;
        case 'm':
        case 'M':       // Month/Day Date
            realFormat = dtfi.monthDayPattern;
            break;
        case 'o':
        case 'O':
            realFormat = RoundtripFormat;
            break;
        case 'r':
        case 'R':       // RFC 1123 Standard
            realFormat = dtfi.rfC1123Pattern;
            break;
        case 's':       // Sortable without Time Zone Info
            realFormat = dtfi.sortableDateTimePattern;
            break;
        case 't':       // Short Time
            realFormat = dtfi.shortTimePattern;
            break;
        case 'T':       // Long Time
            realFormat = dtfi.longTimePattern;
            break;
        case 'u':       // Universal with Sortable format
            realFormat = dtfi.universalSortableDateTimePattern;
            break;
        case 'U':       // Universal with Full (long date + long time) format
            realFormat = dtfi.fullDateTimePattern;
            break;
        case 'y':
        case 'Y':       // Year/Month Date
            realFormat = dtfi.yearMonthPattern;
            break;
        default:
            realFormat = format;
            break;
    }

    return realFormat;
}

function pad(value: number): string {
    return (value > 9) ?
        "" + value :
        "0" + value;
}

/*
 "yyyy/MMMMM/dd Ali".replace(DATE_FORMAT_RX, function(i){
console.log(i)
switch(i){
    case 'yyyy':
    return 1986;
   case 'MMMMM':
    return 'Feb';
 case 'dd':
    return 23;
    default:
return i;
}
})
 */