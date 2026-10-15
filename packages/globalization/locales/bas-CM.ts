// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "bas", 
    lcid: 4096, 
    name: "bas-CM", 
    nativeName: "Ɓàsàa (Kàmɛ̀rûn)", 
    englishName: "Basaa (Cameroon)", 
    twoLetterISOLanguageName: "bas", 
    threeLetterISOLanguageName: "bas", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 0, 
        currencyDecimalSeparator: ",", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: " ", 
        currencySymbol: "FCFA", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 8, 
        numberNegativePattern: 1, 
        percentPositivePattern: 0, 
        percentNegativePattern: 0, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ",", 
        numberGroupSeparator: " ", 
        currencyPositivePattern: 3, 
        positiveInfinitySymbol: "∞", 
        positiveSign: "+", 
        percentDecimalDigits: 2, 
        percentDecimalSeparator: ",", 
        percentGroupSeparator: " ", 
        percentSymbol: "%", 
        perMilleSymbol: "‰", 
        nativeDigits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], 
        digitSubstitution: 1
    }, 
    dateTimeFormat: {
      "leapYearMonthNames": null,
      "abbreviatedDayNames": [
        "nɔy",
        "nja",
        "uum",
        "ŋge",
        "mbɔ",
        "kɔɔ",
        "jon"
      ],
      "abbreviatedMonthGenitiveNames": [
        "kɔn",
        "mac",
        "mat",
        "mto",
        "mpu",
        "hil",
        "nje",
        "hik",
        "dip",
        "bio",
        "may",
        "liɓ",
        ""
      ],
      "abbreviatedMonthNames": [
        "kɔn",
        "mac",
        "mat",
        "mto",
        "mpu",
        "hil",
        "nje",
        "hik",
        "dip",
        "bio",
        "may",
        "liɓ",
        ""
      ],
      "amDesignator": "I bikɛ̂glà",
      "dateSeparator": "/",
      "dayNames": [
        "ŋgwà nɔ̂y",
        "ŋgwà njaŋgumba",
        "ŋgwà ûm",
        "ŋgwà ŋgê",
        "ŋgwà mbɔk",
        "ŋgwà kɔɔ",
        "ŋgwà jôn"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd d MMMM yyyy HH:mm:ss",
      "longDatePattern": "dddd d MMMM yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "Kɔndɔŋ",
        "Màcɛ̂l",
        "Màtùmb",
        "Màtop",
        "M̀puyɛ",
        "Hìlòndɛ̀",
        "Njèbà",
        "Hìkaŋ",
        "Dìpɔ̀s",
        "Bìòôm",
        "Màyɛsèp",
        "Lìbuy li ńyèe",
        ""
      ],
      "monthNames": [
        "Kɔndɔŋ",
        "Màcɛ̂l",
        "Màtùmb",
        "Màtop",
        "M̀puyɛ",
        "Hìlòndɛ̀",
        "Njèbà",
        "Hìkaŋ",
        "Dìpɔ̀s",
        "Bìòôm",
        "Màyɛsèp",
        "Lìbuy li ńyèe",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "I ɓugajɔp",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d/M/yyyy",
      "shortestDayNames": [
        "n",
        "n",
        "u",
        "ŋ",
        "m",
        "k",
        "j"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "yyyy MMMM",
      "eraNames": [
        "m.Y.K"
      ],
      "abbreviatedEraNames": [
        "m.Y.K"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "d/M/yyyy",
          "d MMM, yyyy"
        ],
        "D": [
          "dddd d MMMM yyyy",
          "d MMMM yyyy"
        ],
        "t": [
          "HH:mm"
        ],
        "T": [
          "HH:mm:ss"
        ],
        "y": [
          "yyyy MMMM"
        ],
        "Y": [
          "yyyy MMMM"
        ],
        "m": [
          "MMMM d"
        ],
        "M": [
          "MMMM d"
        ]
      }
    },
    calendarFormats: {},
    calendar: new GregorianCalendar(1)
};