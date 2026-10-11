// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "", 
    lcid: 4096, 
    name: "xog", 
    nativeName: "Olusoga", 
    englishName: "Soga", 
    twoLetterISOLanguageName: "xog", 
    threeLetterISOLanguageName: "xog", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: true, 
    numberFormat: {
        currencyDecimalDigits: 0, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ",", 
        currencySymbol: "USh", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 8, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ".", 
        numberGroupSeparator: ",", 
        currencyPositivePattern: 3, 
        positiveInfinitySymbol: "∞", 
        positiveSign: "+", 
        percentDecimalDigits: 2, 
        percentDecimalSeparator: ".", 
        percentGroupSeparator: ",", 
        percentSymbol: "%", 
        perMilleSymbol: "‰", 
        nativeDigits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], 
        digitSubstitution: 1
    }, 
    dateTimeFormat: {
      "leapYearMonthNames": null,
      "abbreviatedDayNames": [
        "Sabi",
        "Bala",
        "Kubi",
        "Kusa",
        "Kuna",
        "Kuta",
        "Muka"
      ],
      "abbreviatedMonthGenitiveNames": [
        "Jan",
        "Feb",
        "Mar",
        "Apu",
        "Maa",
        "Juu",
        "Jul",
        "Agu",
        "Seb",
        "Oki",
        "Nov",
        "Des",
        ""
      ],
      "abbreviatedMonthNames": [
        "Jan",
        "Feb",
        "Mar",
        "Apu",
        "Maa",
        "Juu",
        "Jul",
        "Agu",
        "Seb",
        "Oki",
        "Nov",
        "Des",
        ""
      ],
      "amDesignator": "Munkyo",
      "dateSeparator": "/",
      "dayNames": [
        "Sabiiti",
        "Balaza",
        "Owokubili",
        "Owokusatu",
        "Olokuna",
        "Olokutaanu",
        "Olomukaaga"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, d MMMM yyyy HH:mm:ss",
      "longDatePattern": "dddd, d MMMM yyyy",
      "longTimePattern": "HH:mm:ss",
      "monthDayPattern": "MMMM d",
      "monthGenitiveNames": [
        "Janwaliyo",
        "Febwaliyo",
        "Marisi",
        "Apuli",
        "Maayi",
        "Juuni",
        "Julaayi",
        "Agusito",
        "Sebuttemba",
        "Okitobba",
        "Novemba",
        "Desemba",
        ""
      ],
      "monthNames": [
        "Janwaliyo",
        "Febwaliyo",
        "Marisi",
        "Apuli",
        "Maayi",
        "Juuni",
        "Julaayi",
        "Agusito",
        "Sebuttemba",
        "Okitobba",
        "Novemba",
        "Desemba",
        ""
      ],
      "nativeCalendarName": "gregorian",
      "pmDesignator": "Eigulo",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "dd/MM/yyyy",
      "shortestDayNames": [
        "S",
        "B",
        "B",
        "S",
        "K",
        "K",
        "M"
      ],
      "shortTimePattern": "HH:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "AF"
      ],
      "abbreviatedEraNames": [
        "AF"
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "dd/MM/yyyy",
          "d MMM yyyy",
          "d/M/yyyy"
        ],
        "D": [
          "dddd, d MMMM yyyy",
          "d MMMM yyyy"
        ],
        "t": [
          "HH:mm"
        ],
        "T": [
          "HH:mm:ss"
        ],
        "y": [
          "MMMM yyyy"
        ],
        "Y": [
          "MMMM yyyy"
        ],
        "m": [
          "MMMM d"
        ],
        "M": [
          "MMMM d"
        ]
      }
    },
    calendarFormats: {
      "1": {}
    },
    calendarFactories: [() => new GregorianCalendar(1)],
    calendar: new GregorianCalendar(1)
};