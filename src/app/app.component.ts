import { Component, OnInit } from '@angular/core';

import { CovidService } from "./covid19.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'covid-stats';
  temp = [] as any;
  temp2 = [] as any;
  temp3 = [] as any;
  temp4 = [] as any;
  constructor(
    private CovidService: CovidService
    ){
    // Object.assign(this, { this.stats })
  }
  ngOnInit() {
    this.temp = this.CovidService.getCovidData();
    this.temp2 = this.CovidService.activeTimeline();
    this.temp3 = this.CovidService.curedTimeline();
    this.temp4 = this.CovidService.deseasedTimeline();
  }
}
