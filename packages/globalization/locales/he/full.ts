// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar, HebrewCalendar, HijriCalendar } from '@xobin/globalization';
import { cultureData as defaultCultureData } from '@xobin/globalization/locales/he';
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
            "מוחרם",
            "צפר",
            "רביע אל־אוול",
            "רביע א־ת׳אני",
            "ג׳ומאדא אל־אולא",
            "ג׳ומאדא א־ת׳אניה",
            "רג׳ב",
            "שעבאן",
            "רמדאן",
            "שוואל",
            "ד׳ו אל־קעדה",
            "ד׳ו אל־חיג׳ה",
            ""
          ],
          "abbreviatedMonthNames": [
            "מוחרם",
            "צפר",
            "רביע א׳",
            "רביע ב׳",
            "ג׳ומאדא א׳",
            "ג׳ומאדא ב׳",
            "רג׳ב",
            "שעבאן",
            "רמדאן",
            "שוואל",
            "ד׳ו אל־קעדה",
            "ד׳ו אל־חיג׳ה",
            ""
          ],
          "monthGenitiveNames": [
            "מוחרם",
            "צפר",
            "רביע אל-אוול",
            "רביע א-ת׳אני",
            "ג׳ומאדא אל-אולא",
            "ג׳ומאדא א-ת׳אניה",
            "רג׳ב",
            "שעבאן",
            "רמדאן",
            "שוואל",
            "ד׳ו אל־קעדה",
            "ד׳ו אל־חיג׳ה",
            ""
          ],
          "abbreviatedMonthGenitiveNames": [
            "מוחרם",
            "צפר",
            "רביע א׳",
            "רביע ב׳",
            "ג׳ומאדא א׳",
            "ג׳ומאדא ב׳",
            "רג׳ב",
            "שעבאן",
            "רמדאן",
            "שוואל",
            "ד׳ו אל־קעדה",
            "ד׳ו אל־חיג׳ה",
            ""
          ],
          "nativeCalendarName": "לוח השנה המוסלמי"
        },
        "8": {
          "leapYearMonthNames": [
            "תשרי",
            "חשוון",
            "כסלו",
            "טבת",
            "שבט",
            "אדר א׳",
            "אדר ב׳",
            "ניסן",
            "אייר",
            "סיוון",
            "תמוז",
            "אב",
            "אלול"
          ],
          "eraNames": [
            "C.E."
          ],
          "abbreviatedEraNames": [
            "C.E."
          ],
          "monthNames": [
            "תשרי",
            "חשוון",
            "כסלו",
            "טבת",
            "שבט",
            "אדר",
            "אדר ב׳",
            "ניסן",
            "אייר",
            "סיוון",
            "תמוז",
            "אב",
            "אלול"
          ],
          "abbreviatedMonthNames": [
            "תשרי",
            "חשון",
            "כסלו",
            "טבת",
            "שבט",
            "אדר א׳",
            "אדר",
            "ניסן",
            "אייר",
            "סיון",
            "תמוז",
            "אב",
            "אלול"
          ],
          "monthGenitiveNames": [
            "תשרי",
            "חשוון",
            "כסלו",
            "טבת",
            "שבט",
            "אדר א׳",
            "אדר",
            "ניסן",
            "אייר",
            "סיוון",
            "תמוז",
            "אב",
            "אלול"
          ],
          "abbreviatedMonthGenitiveNames": [
            "תשרי",
            "חשון",
            "כסלו",
            "טבת",
            "שבט",
            "אדר א׳",
            "אדר",
            "ניסן",
            "אייר",
            "סיון",
            "תמוז",
            "אב",
            "אלול"
          ],
          "nativeCalendarName": "לוח השנה העברי"
        }
    },
    calendarFactories: [() => new GregorianCalendar(1), () => new HebrewCalendar(), () => new HijriCalendar()]
};
