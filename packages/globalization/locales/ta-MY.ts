// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar } from '@xobin/globalization';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    parent: "ta", 
    lcid: 4096, 
    name: "ta-MY", 
    nativeName: "தமிழ் (மலேசியா)", 
    englishName: "Tamil (Malaysia)", 
    twoLetterISOLanguageName: "ta", 
    threeLetterISOLanguageName: "tam", 
    listSeparator: ";", 
    isRightToLeft: false, 
    isNeutralCulture: false, 
    numberFormat: {
        currencyDecimalDigits: 2, 
        currencyDecimalSeparator: ".", 
        currencyGroupSizes: [3], 
        numberGroupSizes: [3], 
        percentGroupSizes: [3], 
        currencyGroupSeparator: ",", 
        currencySymbol: "RM", 
        naNSymbol: "NaN", 
        currencyNegativePattern: 9, 
        numberNegativePattern: 1, 
        percentPositivePattern: 1, 
        percentNegativePattern: 1, 
        negativeInfinitySymbol: "-∞", 
        negativeSign: "-", 
        numberDecimalDigits: 2, 
        numberDecimalSeparator: ".", 
        numberGroupSeparator: ",", 
        currencyPositivePattern: 2, 
        positiveInfinitySymbol: "∞", 
        positiveSign: "+", 
        percentDecimalDigits: 2, 
        percentDecimalSeparator: ".", 
        percentGroupSeparator: ",", 
        percentSymbol: "%", 
        perMilleSymbol: "‰", 
        nativeDigits: ["௦", "௧", "௨", "௩", "௪", "௫", "௬", "௭", "௮", "௯"], 
        digitSubstitution: 1
    }, 
    dateTimeFormat: {
      "leapYearMonthNames": null,
      "abbreviatedDayNames": [
        "ஞாயி.",
        "திங்.",
        "செவ்.",
        "புத.",
        "வியா.",
        "வெள்.",
        "சனி"
      ],
      "abbreviatedMonthGenitiveNames": [
        "ஜன.",
        "பிப்.",
        "மார்.",
        "ஏப்.",
        "மே",
        "ஜூன்",
        "ஜூலை",
        "ஆக.",
        "செப்.",
        "அக்.",
        "நவ.",
        "டிச.",
        ""
      ],
      "abbreviatedMonthNames": [
        "ஜன.",
        "பிப்.",
        "மார்.",
        "ஏப்.",
        "மே",
        "ஜூன்",
        "ஜூலை",
        "ஆக.",
        "செப்.",
        "அக்.",
        "நவ.",
        "டிச.",
        ""
      ],
      "amDesignator": "முற்பகல்",
      "dateSeparator": "/",
      "dayNames": [
        "ஞாயிறு",
        "திங்கள்",
        "செவ்வாய்",
        "புதன்",
        "வியாழன்",
        "வெள்ளி",
        "சனி"
      ],
      "firstDayOfWeek": 1,
      "calendarWeekRule": 0,
      "fullDateTimePattern": "dddd, d MMMM, yyyy tt h:mm:ss",
      "longDatePattern": "dddd, d MMMM, yyyy",
      "longTimePattern": "tt h:mm:ss",
      "monthDayPattern": "d MMMM",
      "monthGenitiveNames": [
        "ஜனவரி",
        "பிப்ரவரி",
        "மார்ச்",
        "ஏப்ரல்",
        "மே",
        "ஜூன்",
        "ஜூலை",
        "ஆகஸ்ட்",
        "செப்டம்பர்",
        "அக்டோபர்",
        "நவம்பர்",
        "டிசம்பர்",
        ""
      ],
      "monthNames": [
        "ஜனவரி",
        "பிப்ரவரி",
        "மார்ச்",
        "ஏப்ரல்",
        "மே",
        "ஜூன்",
        "ஜூலை",
        "ஆகஸ்ட்",
        "செப்டம்பர்",
        "அக்டோபர்",
        "நவம்பர்",
        "டிசம்பர்",
        ""
      ],
      "nativeCalendarName": "கிரிகோரியன் நாள்காட்டி",
      "pmDesignator": "பிற்பகல்",
      "rfC1123Pattern": "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'",
      "shortDatePattern": "d/M/yyyy",
      "shortestDayNames": [
        "ஞா",
        "தி",
        "செ",
        "பு",
        "வி",
        "வெ",
        "ச"
      ],
      "shortTimePattern": "tt h:mm",
      "sortableDateTimePattern": "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
      "timeSeparator": ":",
      "universalSortableDateTimePattern": "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
      "yearMonthPattern": "MMMM yyyy",
      "eraNames": [
        "கி.பி."
      ],
      "abbreviatedEraNames": [
        "கி.பி."
      ],
      "abbreviatedEnglishEraNames": [
        ""
      ],
      "allDateTimePatterns": {
        "d": [
          "d/M/yyyy",
          "d MMM, yyyy",
          "d/M/yy"
        ],
        "D": [
          "dddd, d MMMM, yyyy",
          "d MMMM, yyyy"
        ],
        "t": [
          "tt h:mm"
        ],
        "T": [
          "tt h:mm:ss"
        ],
        "y": [
          "MMMM yyyy"
        ],
        "Y": [
          "MMMM yyyy"
        ],
        "m": [
          "d MMMM"
        ],
        "M": [
          "d MMMM"
        ]
      }
    },
    calendarFormats: {},
    calendar: new GregorianCalendar(1)
};