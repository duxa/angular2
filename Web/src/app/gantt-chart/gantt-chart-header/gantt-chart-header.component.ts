import { Component } from '@angular/core';

import { CalendarService, DateRangeTypes } from '../services/calendar.service';

@Component({
  selector: 'gantt-chart-header',
  templateUrl: './gantt-chart-header.component.html',
  styleUrls: [ './gantt-chart-header.component.less' ]
})
export class GanttChartHeaderComponent {
  public title: string = 'Plan concert';

  constructor (private calendar: CalendarService) {
    console.log(this.calendar.getDateRange(DateRangeTypes.Year, new Date()));
  }
}
