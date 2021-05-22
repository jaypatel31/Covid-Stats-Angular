import { Component } from "@angular/core";
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { CovidService } from "../covid19.service";
@Component({
  selector:"root-component",
  templateUrl: './dayWiseData.component.html',
  styleUrls: ['./dayWiseData.component.css']
})

export class DayWiseComponent{
  stats = [] as any;
  total = [] as any;
  daywiseData=[] as any;
  totaldaywise = [] as any; 
  value:any;
  view = ['1000', '400'] as any;
  color="heading-warn" as any;
  // options
  showXAxis = true ;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Month';
  showYAxisLabel = true;
  yAxisLabel = 'Confirmed Cases';
  animations: boolean = false;
  timeline: boolean = true;

  colorScheme = {
    domain: ['#AACEE2', '#8C65D3', '#00C590', '#413BF7']
  };

  monthwise(){
    this.daywiseData=[];
    this.total = [];
    this.stats = this.CovidService.MonthWiseData();
    this.xAxisLabel = 'Month';
    this.value="Month Wise";
    this.colorScheme.domain = ['#AACEE2', '#8C65D3', '#00C590', '#413BF7'];
  }

  colorChange(cl:any){
    this.color='heading-'+cl;
  }

  onResize(event:any) {
    this.view = [event.target.innerWidth / 1.35, 400];
  }

  daywise(){
    this.stats = [];
    this.total = this.CovidService.DayWiseData();
    this.daywiseData = this.total.timeline;
    this.totaldaywise = this.total.total;
    this.xAxisLabel = 'Dates';
    this.value="Day Wise";
    this.yAxisLabel="Covid Cases";
    this.colorScheme.domain = ['#FF0000', '#228B22', '#999999'];
  }



  constructor(
    private CovidService: CovidService
    ){
    // Object.assign(this, { this.stats })
  }

  ngOnDestroy(){
    this.stats = [];
    this.daywiseData=[];
  }
}

