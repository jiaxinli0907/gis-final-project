import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { TooltipchartComponent } from './tooltipchart/tooltipchart.component';

//Use ngModel in App  
import { FormsModule,  ReactiveFormsModule} from '@angular/forms'; 
import { Ng5SliderModule } from 'ng5-slider';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    TooltipchartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,  
    Ng5SliderModule
    // ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]


})
export class AppModule { }
