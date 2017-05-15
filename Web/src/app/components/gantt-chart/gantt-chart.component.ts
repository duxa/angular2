import { Component } from '@angular/core';

import { CalendarService } from '../../services';

@Component({
  selector: 'gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: [ './gantt-chart.component.less' ],
  providers: [ CalendarService ]
})
export class GanttChartComponent { }
