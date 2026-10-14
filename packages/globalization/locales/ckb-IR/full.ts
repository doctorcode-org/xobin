// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, PersianCalendar, GregorianCalendar, HijriCalendar } from '@xobin/globalization';
import { cultureData as defaultCultureData } from '@xobin/globalization/locales/ckb-IR';
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
          "nativeCalendarName": "islamic"
        }
    },
    calendarFactories: [() => new PersianCalendar(), () => new GregorianCalendar(1), () => new HijriCalendar()]
};
