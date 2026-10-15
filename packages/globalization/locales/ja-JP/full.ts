// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
import { JapaneseCalendar } from '@xobin/globalization/japanese-calendar';
import { cultureData as defaultCultureData } from '@xobin/globalization/locales/ja-JP';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    ...defaultCultureData,
    calendarFormats: {
        ...defaultCultureData.calendarFormats,
        "3": {
          "eraNames": [
            "明治",
            "大正",
            "昭和",
            "平成",
            "令和"
          ],
          "abbreviatedEraNames": [
            "明",
            "大",
            "昭",
            "平",
            "令"
          ],
          "abbreviatedEnglishEraNames": [
            "M",
            "T",
            "S",
            "H",
            "R"
          ],
          "nativeCalendarName": "和暦"
        }
    },
    calendarFactories: [() => new GregorianCalendar(1), () => new JapaneseCalendar()]
};
