import { Component, OnInit, Input, ViewEncapsulation, IterableDiffers, DoCheck, IterableChangeRecord, EventEmitter } from '@angular/core';

import * as L from 'leaflet';
import { Overlay, Forestmap } from '../types/map.types';
import * as d3 from 'd3';
import { FeatureCollection } from 'geojson';
import { map } from 'rxjs/operators';
import { schemeDark2 } from 'd3';
import { Options } from 'ng5-slider';
//import 'leaflet-draw';
import { DataService } from '../services/data.service';
import { getLocaleDateFormat } from '@angular/common';
import 'leaflet-draw';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  // super important, otherwise the defined css doesn't get added to dynamically created elements, for example, from D3.
  encapsulation: ViewEncapsulation.None,
})
export class MapComponent implements OnInit, DoCheck  {

  // extends Overlay 
  [x: string]: any;

  name: string;
  featureCollection: FeatureCollection;

  @Input() overlays: Array<Overlay> = [];
  iterableDiffer: any;

  private layerControl: L.Control.Layers;
  mymap: L.Map;
 
  constructor(private iterable: IterableDiffers) {
    this.iterableDiffer = this.iterable.find(this.overlays).create();
  }

  ngOnInit() {

    // use osm tiles
    const basemap = L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // create map, set initial view to basemap and zoom level to center of BW
    this.mymap = L.map('main', { layers: [basemap] }).setView([48.6813312, 9.0088299], 2);

    // create maps and overlay objects for leaflet control
    const baseMaps = {
      OpenStreetMap: basemap,
    };

    // add a control which lets us toggle maps and overlays
    this.layerControl = L.control.layers(baseMaps);
    this.layerControl.addTo(this.mymap);

    function getColor(d){
      return d > 10  ? '#008000' : // green
      d > 5  ? '#228B22' : // forest green
      d > 4  ? '#32CD32' : // limegreen 
      d > 3  ? '#00FF00' : // lime
      d > 2  ? '#7CFC00' : // lawngreen
      d > 1  ? '#ADFF2F' : // green yellow
      d > 0  ? '#00FF7F' : //  spring green
      d == 0 ? '#F4F6F6 ': //gray
      d > -1  ? '#FA8072' : // salmon
      d > -2   ? '#F08080' : // red coral
      d > -3 ? '#CD5C5C' : // indian red
      d > -4 ? '#DC143C' : //crimson
      d > -5? '#FF0000' : // red
      d > -10 ? '#B22222' : // fire brick
                '#800000'; // marron
  }
    var legend = new L.Control({position: 'bottomleft'});

    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend'),
        grades = [-11,-9,-4.9,-3.9,-2.9,-1.9,-0.9,0,0.1,1.1,2.1,3.1,4.1,6,11],
        labels = [];
    
        // loop through our density intervals and generate a label with a colored square for each interval
        div.innerHTML =  '<i style="background:' + getColor(grades[0] ) + '"></i> ' + '< -10' +  '<br>' + 
        '<i style="background:' + getColor(grades[1] ) + '"></i> ' + '-5 ~ -10' +  '<br>' +
        '<i style="background:' + getColor(grades[2] ) + '"></i> ' + '-4 ~ -5' +  '<br>' +
        '<i style="background:' + getColor(grades[3] ) + '"></i> ' + '-3 ~ -4' +  '<br>' +
        '<i style="background:' + getColor(grades[4] ) + '"></i> ' + '-2 ~ -3' +  '<br>' +
        '<i style="background:' + getColor(grades[5] ) + '"></i> ' + '-1 ~ -2' +  '<br>' +
        '<i style="background:' + getColor(grades[6] ) + '"></i> ' + '0 ~ -1' +  '<br>' +
        '<i style="background:' + getColor(grades[7] ) + '"></i> ' + ' 0 ' +  '<br>' +
        '<i style="background:' + getColor(grades[8] ) + '"></i> ' + '0 ~ 1' +  '<br>' +
        '<i style="background:' + getColor(grades[9] ) + '"></i> ' + '1 ~ 2' +  '<br>' +
        '<i style="background:' + getColor(grades[10] ) + '"></i> ' + '2 ~ 3' +  '<br>' +
        '<i style="background:' + getColor(grades[11] ) + '"></i> ' + '3 ~ 4' +  '<br>' +
        '<i style="background:' + getColor(grades[12] ) + '"></i> ' + '4 ~ 5' +  '<br>' +
        '<i style="background:' + getColor(grades[13] ) + '"></i> ' + '5 ~ 10' +  '<br>' +
        '<i style="background:' + getColor(grades[14] ) + '"></i> ' + ' > 10 ' +  '<br>' 



        
        // grades[i] +  ' &ndash; ' + grades[i + 1] + '<br>';
        // for (var i = 0; i < grades.length; i++) {
        //     div.innerHTML +=
        //         '<i style="background:' + getColor(grades[i] ) + '"></i> ' +
        //         grades[i] +  ' &ndash; ' + grades[i + 1] + '<br>';

        //       }
    
    return div;
    };
    legend.addTo(this.mymap)


  
    


  }


  /**
   * If the input data changes, update the layers
   * @param changes the angular changes object
   */
  ngDoCheck(): void {
    const changes = this.iterableDiffer.diff(this.overlays);
    // const change2 = this.iterableDiffer.diff(this.featureCollection);
    if (changes ) {

        changes.forEachAddedItem((newOverlay: IterableChangeRecord<Overlay>) => {
        const overlay = newOverlay.item;
        this.layerControl.addOverlay(overlay.createOverlay(), overlay.name);
        
      });
    }
  }

  
}
