import { Component, OnInit } from '@angular/core';
import 'rxjs/Rx';
import { MonitorService } from './monitor.service';
import { ChartData } from './chartdata';
import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ MonitorService ]
})
export class AppComponent implements OnInit { 
    text: string;
    errorMessage: string;
    //chart paging button states
    firstPage: boolean = true;
    lastPage: boolean = true;
    currentPage: number;
    
    chartData: ChartData = {
        chartData: [{data: [0], label: 'Fahrenheit'}],
        chartLabels: ['']
    };

    constructor(private monitorService: MonitorService){}

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.monitorService.getData()
            .subscribe(
                text => {
                    this.text = text;
                    this.currentPage = 0;
                    this.parseTempText(text, 0);
                },
                error => this.errorMessage = <any>error);
    }

    parseTempText(text: string , daysBack: number){
        let strArray: Array<string> = text.split("\n");
        strArray.pop(); //last row is blank
        let chartLabels: Array<string> = [];
        let chartData: Array<number> = [];

        let startPosition: number = (strArray.length - 1) - (144 * daysBack);
        let endPosition: number = (strArray.length - 145) - (144 * daysBack);
        endPosition = endPosition < 0 ? 0 : endPosition;
        if (startPosition === strArray.length - 1){
            this.firstPage = false;
            this.lastPage = true;
        } else if (endPosition === 0){
            this.firstPage = true;
            this.lastPage = false;
        } else {
            this.firstPage = false;
            this.lastPage = false;
        }

        for (let i = startPosition; i > endPosition; i--) {
            if (strArray[i].length > 1) {
                let lineArray: Array<string> = strArray[i].split(" ");
                let strDatetime: string = "";
                //get timestamp for labels
                for (let k in lineArray){
                    if (+k < 2) {
                        strDatetime = strDatetime + " " + lineArray[k];
                    }
                }
                strDatetime = strDatetime.slice(6,-3);
                if (strDatetime.slice(-2) === "00"){
                    chartLabels.push(strDatetime);
                } else {
                    chartLabels.push("");
                }
                
                //get temperature in F
                chartData.push(+lineArray[3].slice(0,-1))
            }
        }
        chartLabels.reverse();
        chartData.reverse();
        //console.log(chartData);
        //console.log(chartLabels);
        this.chartData.chartData = [{data: chartData, label: 'Fahrenheit'}];
        this.chartData.chartLabels =  chartLabels;
    }

    pageChartForwards(){
        if (this.currentPage && this.text != null ){
            this.currentPage = this.currentPage - 1;
            this.parseTempText(this.text, this.currentPage);
        }
    }

    pageChartBackwards(){
        if (this.currentPage != null && this.text != null){
            this.currentPage = this.currentPage + 1;
            this.parseTempText(this.text, this.currentPage);
        }
    }
}
