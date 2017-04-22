import { Component } from '@angular/core';

import { CalendarService } from './services/calendar.service';

@Component({
  selector: 'gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: [ './gantt-chart.component.less' ],
  providers: [ CalendarService ]
})
export class GanttChartComponent { }
