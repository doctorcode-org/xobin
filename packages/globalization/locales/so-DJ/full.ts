// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar, HijriCalendar } from '@xobin/globalization';
import { cultureData as defaultCultureData } from '@xobin/globalization/locales/so-DJ';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    ...defaultCultureData,
    calendarFormats: {
        ...defaultCultureData.calendarFormats,
        "6": {
          "eraNames": [
            "بعد الهجرة"
          ],
          "abbreviatedEraNames": [
            "هـ"
          ],
          "monthNames": [
            "Muxarram",
            "Safar",
            "Rabic al-awwal",
            "Rabic al-thani",
            "Jumada al-awwal",
            "jumada al-thani",
            "Rajab",
            "Shacban",
            "Ramadan",
            "Shawwal",
            "Dul al-qacdah",
            "Dul xijjah",
            ""
          ],
          "abbreviatedMonthNames": [
            "Mux.",
            "Saf.",
            "Rab. I",
            "Rab. II",
            "Jum. I",
            "Jum. II",
            "Raj.",
            "Sha.",
            "Ram.",
            "Shaw.",
            "Dul-Q.",
            "Dul-X.",
            ""
          ],
          "monthGenitiveNames": [
            "Muxarram",
            "Safar",
            "Rabic al-awwal",
            "Rabic al-thani",
            "Jumada al-awwal",
            "jumada al-thani",
            "Rajab",
            "Shacban",
            "Ramadan",
            "Shawwal",
            "Dul al-qacda",
            "Dul xijjah",
            ""
          ],
          "abbreviatedMonthGenitiveNames": [
            "Mux.",
            "Saf.",
            "Rab. I",
            "Rab. II",
            "Jum. I",
            "Jum. II",
            "Raj.",
            "Sha.",
            "Ram.",
            "Shaw.",
            "Dul’-Qicda.",
            "Dhuʻl-H.",
            ""
          ],
          "nativeCalendarName": "Habeentiriska islaamka"
        }
    },
    calendarFactories: [() => new GregorianCalendar(1), () => new HijriCalendar()]
};
