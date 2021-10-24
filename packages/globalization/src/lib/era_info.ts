import { DateTime } from './date_time';

export class EraInfo {
    ticks: number;

    constructor(public era: number, startYear: number, startMonth: number, startDay: number, public yearOffset: number, public minEraYear: number, public maxEraYear: number) {
        this.ticks = (new DateTime(startYear, startMonth, startDay)).ticks;
    }

}