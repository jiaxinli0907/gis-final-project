import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FeatureCollection } from 'geojson';
import { stringify } from 'querystring';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class DataService {

  [x: string]: any;

  constructor(private http: HttpClient) 
     {  }



  getForestmap(): Observable<FeatureCollection> {
    const url = 'http://localhost:5000/api/data/forestmap';

    return this.http.post<FeatureCollection>(url, {minDate: 1990, maxDate: 2016}, httpOptions);
  }
  getHighgdp(): Observable<FeatureCollection> {
    const url = 'http://localhost:5000/api/data/highgdp';

    return this.http.post<FeatureCollection>(url, null, httpOptions);
  }

  getHighpop(): Observable<FeatureCollection> {
    const url = 'http://localhost:5000/api/data/highpop';

    return this.http.post<FeatureCollection>(url, null, httpOptions);
  }
  getLowgdp(): Observable<FeatureCollection> {
    const url = 'http://localhost:5000/api/data/lowgdp';

    return this.http.post<FeatureCollection>(url, null, httpOptions);
  }

  // getForestChange(): Observable<FeatureCollection> {
  //   const url = 'http://localhost:5000/api/data/lowgdp';

  //   return this.http.post<FeatureCollection>(url, null, httpOptions);
  // }
  
 
  /**
   * Retrieves the data and constructs a FeatureCollection object from the received data
   */
  getFeatureCollection(url): Observable<FeatureCollection> {
    return this.http.post<any>(url, null, httpOptions).pipe(map(unparsed => {

      const f: FeatureCollection = {

        type: 'FeatureCollection',
        features: unparsed.map((u: any) => {
          return {
            type: 'Feature',
            geometry: u.geojson,
            properties: { name: u.name, code: u.code, 
              y1990: u.y1990,y1995: u.y1995,y2000: u.y2000, y2005: u.y2005, y2010: u.y2010, y2015: u.y2015, 
              g1990: u.g1990,g1995: u.g1995,g2000: u.g2000, g2005: u.g2005, g2010: u.g2010, g2015: u.g2015, 
              e1990: u.e1990,e1995: u.e1995,e2000: u.e2000, e2005: u.e2005, e2010: u.e2010, e2015: u.e2015, 
              co1990: u.co1990,co1995: u.co1995,co2000: u.co2000, co2005: u.co2005, co2010: u.co2010, co2015: u.co2015,
              p1990: u.p1990,p1995: u.p1995,p2000: u.p2000, p2005: u.p2005, p2010: u.p2010, p2015: u.p2015},
          };
        })
        
      };

      return f;
    }));
  }

}


