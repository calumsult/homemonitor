import { Component, Input } from '@angular/core';
import { ChartData } from './chartdata';

@Component({
  selector: 'my-chart',
  template: `
    <base-chart class="chart"
        [datasets]="chartData.chartData"
        [labels]="chartData.chartLabels"
        [options]="lineChartOptions"
        [colors]="lineChartColors"
        [legend]="lineChartLegend"
        [chartType]="lineChartType">
    </base-chart>`
})
export class ChartComponent {
    @Input() chartData: ChartData; 

    private lineChartOptions:any = {
        animation: false,
        responsive: true,
        scales: {
            xAxes: [{
                ticks: {
                    autoSkip: false
                }
            }]
        }
    };
    private lineChartColors:Array<any> = [
        { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    private lineChartLegend:boolean = true;
    private lineChartType:string = 'line';

}