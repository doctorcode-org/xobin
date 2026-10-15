// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
import { HijriCalendar } from '@xobin/globalization/hijri-calendar';
import { cultureData as defaultCultureData } from '@xobin/globalization/locales/ff-Adlm-MR';
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
            "𞤔𞤮𞤥𞤦𞤫𞤲𞤼𞤫",
            "𞤅𞤢𞤦𞥆𞤮𞤪𞤣𞤵-𞤆𞤢𞤪𞤢𞤲",
            "𞤆𞤢𞤪𞤢𞤲",
            "𞤃𞤭𞤥𞤨𞤢𞤪𞤢𞤲",
            "𞤄𞤢𞤨𞥆𞤢𞤪𞤢𞤲",
            "𞤅𞤢𞤦𞥆𞤮𞤪𞤣𞤵-𞤈𞤢𞥄𞤶𞤭𞤦𞤭",
            "𞤈𞤢𞥄𞤶𞤭𞤦𞤭",
            "𞤅𞤢𞤦𞥆𞤮𞤪𞤣𞤵-𞤅𞤵𞥅𞤥𞤢𞤴𞤫𞥅",
            "𞤅𞤵𞥅𞤥𞤢𞤴𞤫𞥅",
            "𞤔𞤵𞥅𞤤𞤣𞤢𞥄𞤲𞥋𞤣𞤵",
            "𞤅𞤢𞤦𞥆𞤮𞤪𞤣𞤵-𞤁𞤮𞤲𞤳𞤭𞤲",
            "𞤁𞤵𞤲𞤳𞤭𞤲",
            ""
          ],
          "abbreviatedMonthNames": [
            "𞤔𞤮𞤦.",
            "𞤅𞤢𞤨.",
            "𞤆𞤢𞤪.",
            "𞤃𞤭𞤨.",
            "𞤄𞤢𞤨.",
            "𞤅𞤢𞤪.",
            "𞤈𞤢𞤶.",
            "𞤅𞤢𞤧.",
            "𞤅𞤵𞤥.",
            "𞤔𞤵𞤤.",
            "𞤅𞤢𞤣.",
            "𞤁𞤮𞤲.",
            ""
          ],
          "monthGenitiveNames": [
            "𞤔𞤮𞤥𞤦𞤫𞤲𞤼𞤫",
            "𞤅𞤢𞤦𞥆𞤮𞤪𞤣𞤵-𞤆𞤢𞤪𞤢𞤲",
            "𞤆𞤢𞤪𞤢𞤲",
            "𞤃𞤭𞤥𞤨𞤢𞤪𞤢𞤲",
            "𞤄𞤢𞤨𞥆𞤢𞤪𞤢𞤲",
            "𞤅𞤢𞤦𞥆𞤮𞤪𞤣𞤵-𞤈𞤢𞥄𞤶𞤭𞤦𞤭",
            "𞤈𞤢𞥄𞤶𞤭𞤦𞤭",
            "𞤅𞤢𞤦𞥆𞤮𞤪𞤣𞤵-𞤅𞤵𞥅𞤥𞤢𞤴𞤫𞥅",
            "𞤅𞤵𞥅𞤥𞤢𞤴𞤫𞥅",
            "𞤔𞤵𞥅𞤤𞤣𞤢𞥄𞤲𞥋𞤣𞤵",
            "𞤅𞤢𞤦𞥆𞤮𞤪𞤣𞤵-𞤁𞤮𞤲𞤳𞤭𞤲",
            "𞤁𞤵𞤲𞤳𞤭𞤲",
            ""
          ],
          "abbreviatedMonthGenitiveNames": [
            "𞤔𞤮𞤦.",
            "𞤅𞤢𞤨.",
            "𞤆𞤢𞤪.",
            "𞤃𞤭𞤨.",
            "𞤄𞤢𞤨.",
            "𞤅𞤢𞤪.",
            "𞤈𞤢𞤶.",
            "𞤅𞤢𞤧.",
            "𞤅𞤵𞤥.",
            "𞤔𞤵𞤤.",
            "𞤅𞤢𞤣.",
            "𞤁𞤮𞤲.",
            ""
          ],
          "nativeCalendarName": "𞤙𞤢𞤤𞤥𞤫𞤪𞤫 𞤂𞤭𞤧𞤤𞤢𞥄𞤥𞤴𞤢𞤲𞤳𞤮"
        }
    },
    calendarFactories: [() => new GregorianCalendar(1), () => new HijriCalendar()]
};
