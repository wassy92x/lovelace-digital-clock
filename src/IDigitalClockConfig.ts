import {DateTimeFormatOptions} from 'luxon';
import {LocaleOptions} from 'luxon/src/datetime';

export default interface IDigitalClockConfig {
    interval?: number;
    locale?: string;
    timeFormat?: (LocaleOptions & DateTimeFormatOptions) | string;
    dateFormat?: (LocaleOptions & DateTimeFormatOptions) | string;
    firstLineFormat?: (LocaleOptions & DateTimeFormatOptions) | string;
    secondLineFormat?: (LocaleOptions & DateTimeFormatOptions) | string;
}
