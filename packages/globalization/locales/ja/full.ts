// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar, JapaneseCalendar } from '@xobin/globalization';
import { cultureData as defaultCultureData } from '@xobin/globalization/locales/ja';
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
