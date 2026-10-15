// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
import { HijriCalendar } from '@xobin/globalization/hijri-calendar';
import { cultureData as defaultCultureData } from '@xobin/globalization/locales/fr-DZ';
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
            "mouharram",
            "safar",
            "rabia al awal",
            "rabia ath-thani",
            "joumada al oula",
            "joumada ath-thania",
            "rajab",
            "chaabane",
            "ramadan",
            "chawwal",
            "dhou al qi`da",
            "dhou al-hijja",
            ""
          ],
          "abbreviatedMonthNames": [
            "mouh.",
            "saf.",
            "rab. aw.",
            "rab. th.",
            "joum. ou.",
            "joum. th.",
            "raj.",
            "chaa.",
            "ram.",
            "chaw.",
            "dhou. qi.",
            "dhou. hi.",
            ""
          ],
          "monthGenitiveNames": [
            "mouharram",
            "safar",
            "rabia al awal",
            "rabia ath-thani",
            "joumada al oula",
            "joumada ath-thania",
            "rajab",
            "chaabane",
            "ramadan",
            "chawwal",
            "dhou al qi`da",
            "dhou al-hijja",
            ""
          ],
          "abbreviatedMonthGenitiveNames": [
            "mouh.",
            "saf.",
            "rab. aw.",
            "rab. th.",
            "joum. oul.",
            "joum. tha.",
            "raj.",
            "chaa.",
            "ram.",
            "chaw.",
            "dhou. q.",
            "dhou. h.",
            ""
          ],
          "nativeCalendarName": "calendrier musulman"
        }
    },
    calendarFactories: [() => new GregorianCalendar(1), () => new HijriCalendar()]
};
