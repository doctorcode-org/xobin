// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
import { UmAlQuraCalendar } from '@xobin/globalization/um-al-qura-calendar';
import { HijriCalendar } from '@xobin/globalization/hijri-calendar';
import { cultureData as defaultCultureData } from '@xobin/globalization/locales/en-AE';
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
        "23": {
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
          "nativeCalendarName": "Islamic Calendar (Umm al-Qura)"
        }
    },
    calendarFactories: [() => new GregorianCalendar(1), () => new UmAlQuraCalendar(), () => new HijriCalendar()]
};
