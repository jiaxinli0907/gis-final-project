import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { FeatureCollection } from 'geojson';
import { Overlay, Forestmap, Highgdp, Highpop,Lowgdp, ForestChange} from './types/map.types';
import { MapComponent } from './map/map.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  overlays: Array<Overlay> = new Array<Overlay>();

  // constructor is here only used to inject services
  constructor(private dataService: DataService) { }

  /**
   * Retrieve data from server and add it to the overlays arrays
   */
  ngOnInit(): void {

    this.dataService.getForestmap().toPromise().then((val: FeatureCollection) => {
      this.overlays.push(new Forestmap('Forest Change', val));
    });

    this.dataService.getHighgdp().toPromise().then((val: FeatureCollection) => {
      this.overlays.push(new Highgdp('High GDP', val));
    });

    this.dataService.getHighpop().toPromise().then((val: FeatureCollection) => {
      this.overlays.push(new Highpop('High Population', val));
    });

    this.dataService.getLowgdp().toPromise().then((val: FeatureCollection) => {
      this.overlays.push(new Lowgdp('Low GDP', val));
    });

    // this.dataService.getForestmap().toPromise().then((val: FeatureCollection) => {
    //   this.overlays.push(new ForestChange('Forest Coverage', val));
    // });
}}
