import { Component } from '@angular/core';

@Component({
  selector: 'gantt-chart-header',
  templateUrl: './gantt-chart-header.component.html',
  styleUrls: [ './gantt-chart-header.component.less' ]
})
export class GanttChartHeaderComponent {
  public title: string = 'Plan concert';
}
