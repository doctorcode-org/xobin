// Date format data generated from the pinned .NET 10.0.7 formatting oracle.
import type { CultureData } from '@xobin/globalization';
import { GregorianCalendar } from '@xobin/globalization/gregorian-calendar';
import { HijriCalendar } from '@xobin/globalization/hijri-calendar';
import { cultureData as defaultCultureData } from '@xobin/globalization/locales/bn';
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
            "মহররম",
            "সফর",
            "রবিউল আউয়াল",
            "রবিউস সানি",
            "জমাদিউল আউয়াল",
            "জমাদিউস সানি",
            "রজব",
            "শা‘বান",
            "রমজান",
            "শাওয়াল",
            "জ্বিলকদ",
            "জ্বিলহজ্জ",
            ""
          ],
          "abbreviatedMonthNames": [
            "মহররম",
            "সফর",
            "রবিউল আউয়াল",
            "রবিউস সানি",
            "জমাদিউল আউয়াল",
            "জমাদিউস সানি",
            "রজব",
            "শা‘বান",
            "রমজান",
            "শাওয়াল",
            "জ্বিলকদ",
            "জ্বিলহজ্জ",
            ""
          ],
          "monthGenitiveNames": [
            "মহররম",
            "সফর",
            "রবিউল আউয়াল",
            "রবিউস সানি",
            "জমাদিউল আউয়াল",
            "জমাদিউস সানি",
            "রজব",
            "শা‘বান",
            "রমজান",
            "শাওয়াল",
            "জ্বিলকদ",
            "জ্বিলহজ্জ",
            ""
          ],
          "abbreviatedMonthGenitiveNames": [
            "মহররম",
            "সফর",
            "রবিউল আউয়াল",
            "রবিউস সানি",
            "জমাদিউল আউয়াল",
            "জমাদিউস সানি",
            "রজব",
            "শা‘বান",
            "রমজান",
            "শাওয়াল",
            "জ্বিলকদ",
            "জ্বিলহজ্জ",
            ""
          ],
          "nativeCalendarName": "ইসলামিক ক্যালেন্ডার"
        }
    },
    calendarFactories: [() => new GregorianCalendar(1), () => new HijriCalendar()]
};
