import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CovidService{
	items = {} as any;
    confirmedCases = [] as any;
    curedCases = [] as any;
    deseasedCases = [] as any;
	constructor(
		private http: HttpClient
		){}

	getCovidData(){
		 fetch('https://api.covid19india.org/data.json').then(res =>
            res.json()).then(d => {
                this.items = d;
                console.log(d)

                return d;
            });  
	}
    activeTimeline(){
         fetch('https://covid-india-cases.herokuapp.com/statetimeline/').then(res =>
            res.json()).then(d => {
                console.log(d);
                var entries:any;
                let i:any;
                let arr = [] as any;
                let old= 0 as any;
                let old_key = "2020-01-30" as any;
                let current:any;
                let state:any;
                let key:any;
                let value:any;
                for(i=0;i<d.length;i++){
                    entries =  Object.entries(d[i]);
                    state = d[i]['State UT'];
                    arr[state] = [];
                    for ([key, value] of entries) {
                        if(state == "Maharashtra"){
                            if(key == "2020-10-09"){
                                value="1493880";
                            }
                        }
                        current = value-old;
                        arr[state].push({name:old_key,value:current});
                        old = value;
                        old_key =key; 
                    }
                    old_key = "2020-01-30";
                    old = 0;
                }
                this.confirmedCases = arr;
                return arr;
            });  
    }
    curedTimeline(){
         fetch('https://covid-india-cases.herokuapp.com/curedtimeline/').then(res =>
            res.json()).then(d => {
                var entries:any;
                let i:any;
                let arr = [] as any;
                let old= 0 as any;
                let old_key = "2020-01-30" as any;
                let current:any;
                let state:any;
                let key:any;
                let value:any;
                for(i=0;i<d.length;i++){
                    entries =  Object.entries(d[i]);
                    state = d[i]['State UT'];
                    arr[state] = [];
                    for ([key, value] of entries) {
                        current = value-old;
                        arr[state].push({name:old_key,value:current});
                        old = value;
                        old_key =key; 
                    }
                    old_key = "2020-01-30";
                    old = 0;
                }
                console.log(arr);
                this.curedCases = arr;
                return arr;
            });  
    }
    deseasedTimeline(){
         fetch('https://covid-india-cases.herokuapp.com/deathtimeline/').then(res =>
            res.json()).then(d => {
                var entries:any;
                let i:any;
                let arr = [] as any;
                let old= 0 as any;
                let old_key = "2020-01-30" as any;
                let current:any;
                let state:any;
                let key:any;
                let value:any;
                for(i=0;i<d.length;i++){
                    entries =  Object.entries(d[i]);
                    state = d[i]['State UT'];
                    arr[state] = [];
                    for ([key, value] of entries) {
                        current = value-old;
                        arr[state].push({name:old_key,value:current});
                        old = value;
                        old_key =key; 
                    }
                    old_key = "2020-01-30";
                    old = 0;
                }
                console.log(arr);
                this.deseasedCases = arr;
                return arr;
            });  
    }
    singleStateTimeline(state:any){
         let d:any;
         d=this.items
         let arr = [] as any;
         let stateConfirmed=this.confirmedCases[state] as any;
         let stateCured = this.curedCases[state] as any;
         let stateDeseased= this.deseasedCases[state] as any;
         let i:any;
         arr['timeline'] = [];
         arr['total'] = {totalConfirmed:0,totalRecovered:0,totalDeseased:0,totalActive:0};
         arr['timeline'].push({name:"Daily Confirmed Cases",series:[]});
         arr['timeline'].push({name:"Daily Recoverd Cases",series:[]});
         arr['timeline'].push({name:"Daily Deceased Cases",series:[]});
         for(i=0;i<this.deseasedCases[state].length-1;i++){
            arr['timeline'][0].series.push({name:stateConfirmed[i]['name'],value:stateConfirmed[i]['value']})
            arr['timeline'][1].series.push({name:stateConfirmed[i]['name'],value:stateCured[i]['value']})
            arr['timeline'][2].series.push({name:stateConfirmed[i]['name'],value:stateDeseased[i]['value']})
         }
         for(i=1;i<d.statewise.length;i++){
            if(d.statewise[i].state == state){
                arr['total'].totalConfirmed = d.statewise[i].confirmed;
                arr['total'].totalActive = d.statewise[i].active;
                arr['total'].totalRecovered = d.statewise[i].recovered;
                arr['total'].totalDeseased = d.statewise[i].deaths;
            }
         }
         console.log(arr);
         return arr;
    }
    MonthWiseData(){
                let d:any;
                d=this.items
                console.log(d);
                let i:any;
                let arr = [] as any;
                let date1:any;
                let date2:any;
                date1 = d.cases_time_series[0].dateymd.slice(0,7);
                let total:any;
                total=0;
                for(i=0;i<d.cases_time_series.length;i++){  
                    date2 = d.cases_time_series[i].dateymd.slice(0,7);
                    if(date1!=date2){
                         date1 = d.cases_time_series[i].dateymd.slice(0,7);
                         arr.push({name:d.cases_time_series[i-1].date.slice(2),value:total});
                         total=0
                    }
                    total += Number(d.cases_time_series[i].dailyconfirmed);

                }
                arr.push({name:d.cases_time_series[d.cases_time_series.length-1].date.slice(2),value:total});
                console.log(arr);
                return arr;
    }
	StateWiseData(){
		let d:any;
                d=this.items
                let i:any;
                let arr = [] as any;
               for(i=1;i<d.statewise.length;i++){
                arr.push({name:d.statewise[i].state,value:d.statewise[i].confirmed});
               }
                
                let j:any; 
                let k:any;
                let tmp:any;        
                arr.sort((a:any, b:any) => {
                    return b.value - a.value;
                });
                console.log(arr);
                return arr;
    }
    DayWiseData(){
        let d:any;
        d=this.items;
        let i:any;
        let arr = [] as any;
         arr['timeline'] = [];
         arr['total'] = {totalConfirmed:0,totalRecovered:0,totalDeseased:0,totalActive:0};
        arr['timeline'].push({name:"Daily Confirmed Cases",series:[]});
        arr['timeline'].push({name:"Daily Recoverd Cases",series:[]});
        arr['timeline'].push({name:"Daily Deceased Cases",series:[]});
        for(i=0;i<d.cases_time_series.length;i++){
            arr['timeline'][0].series.push({name:d.cases_time_series[i].dateymd,value:d.cases_time_series[i].dailyconfirmed})
            arr['timeline'][1].series.push({name:d.cases_time_series[i].dateymd,value:d.cases_time_series[i].dailyrecovered})
            arr['timeline'][2].series.push({name:d.cases_time_series[i].dateymd,value:d.cases_time_series[i].dailydeceased})
        }
        arr['total'].totalConfirmed = d.cases_time_series[d.cases_time_series.length-1].totalconfirmed;
        arr['total'].totalActive = d.cases_time_series[d.cases_time_series.length-1].totalconfirmed - d.cases_time_series[d.cases_time_series.length-1].totalrecovered;
        arr['total'].totalRecovered = d.cases_time_series[d.cases_time_series.length-1].totalrecovered;
        arr['total'].totalDeseased = d.cases_time_series[d.cases_time_series.length-1].totaldeceased;
        console.log(arr);
        return arr;
    }
}