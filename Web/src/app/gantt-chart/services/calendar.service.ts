import { Injectable } from '@angular/core';

export enum DateRangeTypes {
  Year,
  Quarter,
  Month,
  Week,
  Day
}

@Injectable()
export class CalendarService {
  public getDateRange(rangeType: DateRangeTypes, date: Date) {
    let result;

    switch (rangeType) {
      case DateRangeTypes.Year:
        result = this.getYearRange(date);
        break;
      case DateRangeTypes.Quarter:
        result = this.getQuarterRange(date);
        break;
      case DateRangeTypes.Month:
        result = this.getMonthRange(date);
        break;
      case DateRangeTypes.Week:
        result = this.getWeekRange(date);
        break;
      case DateRangeTypes.Day:
        result = this.getDayRange(date);
        break;
      default:
        result = '';
    }

    return result;
  }

  private getYearRange (date: Date) {
    return 'Year';
  }
  private getQuarterRange (date: Date) {
    return 'Quarter';
  }
  private getMonthRange (date: Date) {
    return 'Month';
  }
  private getWeekRange (date: Date) {
    return 'Week';
  }
  private getDayRange (date: Date) {
    return 'Day';
  }
}
