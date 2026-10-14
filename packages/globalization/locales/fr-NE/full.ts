// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar, HijriCalendar } from '@xobin/globalization';
import { cultureData as defaultCultureData } from '@xobin/globalization/locales/fr-NE';
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
