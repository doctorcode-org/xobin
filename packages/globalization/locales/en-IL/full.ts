// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar, HebrewCalendar, HijriCalendar } from '@xobin/globalization';
import { cultureData as defaultCultureData } from '@xobin/globalization/locales/en-IL';
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
            "Muharram",
            "Safar",
            "Rabiʻ I",
            "Rabiʻ II",
            "Jumada I",
            "Jumada II",
            "Rajab",
            "Shaʻban",
            "Ramadan",
            "Shawwal",
            "Dhuʻl-Qiʻdah",
            "Dhuʻl-Hijjah",
            ""
          ],
          "abbreviatedMonthNames": [
            "Muh.",
            "Saf.",
            "Rab. I",
            "Rab. II",
            "Jum. I",
            "Jum. II",
            "Raj.",
            "Sha.",
            "Ram.",
            "Shaw.",
            "Dhuʻl-Q.",
            "Dhuʻl-H.",
            ""
          ],
          "monthGenitiveNames": [
            "Muharram",
            "Safar",
            "Rabiʻ I",
            "Rabiʻ II",
            "Jumada I",
            "Jumada II",
            "Rajab",
            "Shaʻban",
            "Ramadan",
            "Shawwal",
            "Dhuʻl-Qiʻdah",
            "Dhuʻl-Hijjah",
            ""
          ],
          "abbreviatedMonthGenitiveNames": [
            "Muh.",
            "Saf.",
            "Rab. I",
            "Rab. II",
            "Jum. I",
            "Jum. II",
            "Raj.",
            "Sha.",
            "Ram.",
            "Shaw.",
            "Dhuʻl-Q.",
            "Dhuʻl-H.",
            ""
          ],
          "nativeCalendarName": "Islamic Calendar"
        },
        "8": {
          "leapYearMonthNames": [
            "Tishri",
            "Heshvan",
            "Kislev",
            "Tevet",
            "Shevat",
            "Adar I",
            "Adar II",
            "Nisan",
            "Iyar",
            "Sivan",
            "Tamuz",
            "Av",
            "Elul"
          ],
          "eraNames": [
            "C.E."
          ],
          "abbreviatedEraNames": [
            "C.E."
          ],
          "monthNames": [
            "Tishri",
            "Heshvan",
            "Kislev",
            "Tevet",
            "Shevat",
            "Adar",
            "Adar II",
            "Nisan",
            "Iyar",
            "Sivan",
            "Tamuz",
            "Av",
            "Elul"
          ],
          "abbreviatedMonthNames": [
            "Tishri",
            "Heshvan",
            "Kislev",
            "Tevet",
            "Shevat",
            "Adar I",
            "Adar",
            "Nisan",
            "Iyar",
            "Sivan",
            "Tamuz",
            "Av",
            "Elul"
          ],
          "monthGenitiveNames": [
            "Tishri",
            "Heshvan",
            "Kislev",
            "Tevet",
            "Shevat",
            "Adar I",
            "Adar",
            "Nisan",
            "Iyar",
            "Sivan",
            "Tamuz",
            "Av",
            "Elul"
          ],
          "abbreviatedMonthGenitiveNames": [
            "Tishri",
            "Heshvan",
            "Kislev",
            "Tevet",
            "Shevat",
            "Adar I",
            "Adar",
            "Nisan",
            "Iyar",
            "Sivan",
            "Tamuz",
            "Av",
            "Elul"
          ],
          "nativeCalendarName": "Hebrew Calendar"
        }
    },
    calendarFactories: [() => new GregorianCalendar(1), () => new HebrewCalendar(), () => new HijriCalendar()]
};
