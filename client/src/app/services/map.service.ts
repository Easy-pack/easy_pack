import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  API_KEY = 'AIzaSyD4sdh0NM2UU2aazlnc4wvCVeSRuiwC5C0';
  constructor(private http: HttpClient) {}
  getDistance(departure, destination): Observable<any> {
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    return this.http.get<any>(
      `${proxyurl}https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${departure.lat},${departure.lng}&destinations=${destination.lat},${destination.lng}&key=${this.API_KEY}`
    );
  }
  getLocation(street, city, zip): Observable<any> {
    street = street.replace(' ', '+');
    city = city.replace(' ', '+');
    return this.http.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${street},${city}+${zip}&key=${this.API_KEY}`
    );
  }
  getLocationByCoords(latitude, longitude): Observable<any> {
    return this.http.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${latitude},${longitude}&key=${this.API_KEY}`
    );
  }
}