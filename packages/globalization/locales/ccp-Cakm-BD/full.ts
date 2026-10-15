// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
import { HijriCalendar } from '@xobin/globalization/hijri-calendar';
import { cultureData as defaultCultureData } from '@xobin/globalization/locales/ccp-Cakm-BD';
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
            "𑄟𑄧𑄦𑄧𑄢𑄧𑄟𑄴",
            "𑄥𑄧𑄜𑄢𑄴",
            "𑄢𑄧𑄝𑄨𑄅𑄣𑄴 𑄃𑄃𑄪𑄠𑄣𑄴",
            "𑄢𑄧𑄝𑄨𑄅𑄥𑄴 𑄥𑄚𑄨",
            "𑄎𑄧𑄟𑄘𑄨𑄅𑄣𑄴 𑄃𑄃𑄪𑄠𑄣𑄴",
            "𑄎𑄧𑄟𑄘𑄨𑄅𑄌𑄴 𑄥𑄚𑄨",
            "𑄢𑄧𑄎𑄧𑄝𑄴",
            "𑄥𑄳𑄃𑄝𑄧𑄚𑄴",
            "𑄢𑄧𑄟𑄴𑄎𑄚𑄴",
            "𑄥𑄤𑄣𑄴",
            "𑄎𑄨𑄣𑄴𑄇𑄧𑄘𑄴",
            "𑄎𑄨𑄣𑄴𑄦𑄧𑄎𑄴𑄎𑄧",
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
            "𑄟𑄧𑄦𑄧𑄢𑄧𑄟𑄴",
            "𑄥𑄧𑄜𑄢𑄴",
            "𑄢𑄧𑄝𑄨𑄅𑄣𑄴 𑄃𑄃𑄪𑄠𑄣𑄴",
            "𑄢𑄧𑄝𑄨𑄅𑄥𑄴 𑄥𑄚𑄨",
            "𑄎𑄧𑄟𑄘𑄨𑄅𑄣𑄴 𑄃𑄃𑄪𑄠𑄣𑄴",
            "𑄎𑄧𑄟𑄘𑄨𑄅𑄌𑄴 𑄥𑄚𑄨",
            "𑄢𑄧𑄎𑄧𑄝𑄴",
            "𑄥𑄳𑄃𑄝𑄧𑄚𑄴",
            "𑄢𑄧𑄟𑄴𑄎𑄚𑄴",
            "𑄥𑄤𑄣𑄴",
            "𑄎𑄨𑄣𑄴𑄇𑄧𑄘𑄴",
            "𑄎𑄨𑄣𑄴𑄦𑄧𑄎𑄴𑄎𑄧",
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
          "nativeCalendarName": "𑄃𑄨𑄥𑄴𑄣𑄟𑄨𑄇𑄴 𑄇𑄳𑄠𑄣𑄬𑄚𑄴𑄓𑄢𑄴"
        }
    },
    calendarFactories: [() => new GregorianCalendar(1), () => new HijriCalendar()]
};
