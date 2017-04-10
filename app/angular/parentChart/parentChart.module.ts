import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF, Location } from '@angular/common';
import { ParentChartComponent } from './parentChart.component';

@NgModule({
 
  imports: [ BrowserModule, FormsModule],
  declarations: [ParentChartComponent],
})
export class ParentChartModule { }


