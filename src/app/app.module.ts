import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import {MatNativeDateModule} from '@angular/material/core';
import {DemoMaterialModule} from './rootComponent/material-module';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './header/top-bar.component';
import { DayWiseComponent } from './rootComponent/dayWiseData.component';
import { StateWiseComponent } from './state-wise/state-wise.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,

    DayWiseComponent,
     StateWiseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxChartsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    DemoMaterialModule,
    RouterModule.forRoot([
      { path: '', component: DayWiseComponent},
      { path: 'state-wise', component: StateWiseComponent}
    ])
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
