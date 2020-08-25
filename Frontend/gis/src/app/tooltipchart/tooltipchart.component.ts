import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { DataService } from '../services/data.service';
import * as L from 'leaflet';
import * as d3 from 'd3';
import { max } from 'd3';
import { FeatureCollection } from 'geojson';
import { Overlay } from '../types/map.types';


import { Options } from 'ng5-slider';
import { MapType } from '@angular/compiler';

@Component({
  selector: 'app-tooltipchart',
  templateUrl: './tooltipchart.component.html',
  styleUrls: ['./tooltipchart.component.css']
})
export class TooltipchartComponent implements OnInit {
  // extends Overlay 
  [x: string]: any;

  name: string;
  featureCollection: FeatureCollection;

  @Input() overlays: Array<Overlay> = [];
  iterableDiffer: any;

  private layerControl: L.Control.Layers;

  
  value: number = 1990;
  highValue: number = 1995;
  min: number = 1990;
  max: number = 2015;
  options: Options = this.makeOptions();
  valueChange: EventEmitter<any> = new EventEmitter<any>();
  highValueChange: EventEmitter<any> = new EventEmitter<any>();
  enableOptionsChange: boolean = true;
  
  makeOptions() {
    return {
      animate: false, // Easier to see the single update
      floor: this.min,
      ceil: this.max,
      step : 5,
      showTicksValues: true
    };
  }

  optionsChange() {
    // Same exact options, but a new object
    this.options = this.makeOptions();
  }

  constructor(private dataService: DataService) { 

  }

  ngOnInit() {


    this.valueChange.subscribe(() => {
      this.optionsChange();
    });

    this.highValueChange.subscribe(() => {
      this.optionsChange();
    });
  

        
  }

}






 

