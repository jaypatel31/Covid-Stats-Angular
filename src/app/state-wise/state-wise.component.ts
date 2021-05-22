import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormGroup, FormBuilder } from '@angular/forms';

import { CovidService } from "../covid19.service";
@Component({
  selector: 'app-state-wise',
  templateUrl: './state-wise.component.html',
  styleUrls: ['./state-wise.component.css']
})
export class StateWiseComponent   {
	selected="none";
	color="heading-warn" as any;
  data=[] as any;
  total = [] as any;
  statewise = [] as any;
  totalstatewise = [] as any;

    

  view= [1000, 1000] as any;
  states = ["Maharashtra","Karnataka","Kerala","Tamil Nadu","Uttar Pradesh","Andhra Pradesh","Delhi","West Bengal","Chhattisgarh","Rajasthan","Gujarat","Madhya Pradesh","Haryana","Bihar","Odisha","Telangana","Punjab","Assam","Jharkhand","Uttarakhand","Jammu and Kashmir","Himachal Pradesh","Goa","Puducherry","Chandigarh","Tripura","Manipur","Meghalaya","Arunachal Pradesh","Nagaland","Ladakh","Sikkim","Mizoram","Dadra and Nagar Haveli and Daman and Diu","Andaman and Nicobar Islands","Lakshadweep"]
  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'States';
  showYAxisLabel: boolean = true;
  animations: boolean = false;
  xAxisLabel: string = 'Confirmed Cases';
	timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  colorChange(cl:any){
  	this.color='heading-'+cl;
  }

  onResize(event:any) {
    this.view = [event.target.innerWidth / 1.35, 1000];
  }

  selectionUpdate(event:any){
  	this.selected = event.value;
  	console.log(event.value);

  	if(event.value=="All States"){
  		this.data = this.CovidService.StateWiseData();
  		this.total = [];
  		this.statewise = []
  		this.colorScheme.domain = ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'];
  		this.view = [1000,1000];
  	}
  	else if(event.value){
  		this.total = this.CovidService.singleStateTimeline(event.value);
  		this.statewise = this.total.timeline;
  		this.totalstatewise = this.total.total;
  		this.colorScheme.domain = ['#FF0000', '#228B22', '#999999'];
  		this.yAxisLabel = "Covid Cases";
  		this.xAxisLabel =event.value;
  		this.view = [1000,400];
  	}
  }
 constructor(
    private CovidService: CovidService
    ){ }


}
