import { Injectable } from '@angular/core';
import {SharedData} from './sharedData';
import {HttpClient} from '@angular/common/http';
import {MapService} from './map.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculatePriceService {
  distance: number;
  dimension = this.sharedData.transactionData.package_dimension;
  weight = this.sharedData.transactionData.package_weight;

  constructor(private http: HttpClient, private sharedData: SharedData, private mapService: MapService) {
  }

/*  getTransactionDistance() {
    // tslint:disable-next-line:max-line-length
    const departure = {
      lat: this.sharedData.addMapTransactionData.latitude_start,
      lng: this.sharedData.addMapTransactionData.longitude_start
    };
    // tslint:disable-next-line:max-line-length
    const destination = {
      lat: this.sharedData.addMapTransactionData.latitude_destination,
      lng: this.sharedData.addMapTransactionData.longitude_destination
    };
    console.log('9bel el calcul ', this.sharedData.addMapTransactionData);
    // tslint:disable-next-line:no-shadowed-variable
    this.mapService.getDistance(departure, destination).subscribe(data => {
      this.distance = (data['rows'][0]['elements'][0]['distance']['value']) / 1000;
      console.log('hedhi distance ', this.distance, data);
    });
  }*/

  getTransactionDistance(): Observable<any> {
    // tslint:disable-next-line:max-line-length
    const departure = {
      lat: this.sharedData.addMapTransactionData.latitude_start,
      lng: this.sharedData.addMapTransactionData.longitude_start
    };
    // tslint:disable-next-line:max-line-length
    const destination = {
      lat: this.sharedData.addMapTransactionData.latitude_destination,
      lng: this.sharedData.addMapTransactionData.longitude_destination
    };
    // tslint:disable-next-line:no-shadowed-variable
    return this.mapService.getDistance(departure, destination);
  }
}
