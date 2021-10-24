import { NumberFormatInfo } from './number_format_info';
import { DateTimeFormatInfo } from './date_time_format_info';
import { Calendar } from './calendar';

export interface CultureData {
    parent: string;
    lcid: number;
    name: string;
    nativeName: string;
    englishName: string;
    twoLetterISOLanguageName: string;
    threeLetterISOLanguageName: string;
    listSeparator: string;
    isRightToLeft: boolean;
    isNeutralCulture: boolean;
    numberFormat: NumberFormatInfo;
    dateTimeFormat: DateTimeFormatInfo;
    calendar: Calendar;
}