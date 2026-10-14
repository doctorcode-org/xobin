// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import { CultureData, GregorianCalendar, KoreanCalendar } from '@xobin/globalization';
import { cultureData as defaultCultureData } from '@xobin/globalization/locales/ko';
export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {
    ...defaultCultureData,
    calendarFormats: {
        ...defaultCultureData.calendarFormats,
        "5": {
          "eraNames": [
            "단기"
          ],
          "abbreviatedEraNames": [
            "단기"
          ],
          "nativeCalendarName": "단기력"
        }
    },
    calendarFactories: [() => new GregorianCalendar(1), () => new KoreanCalendar()]
};
