import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart.component';

@NgModule({
  imports:      [ BrowserModule, HttpModule, ChartsModule, Ng2BootstrapModule ],
  declarations: [ AppComponent, ChartComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }