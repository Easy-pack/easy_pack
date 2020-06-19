import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MapService {
  distanceMatrixKey = "AIzaSyD4sdh0NM2UU2aazlnc4wvCVeSRuiwC5C0";
  locationGeocodingKey = "AIzaSyD4sdh0NM2UU2aazlnc4wvCVeSRuiwC5C0";
  constructor(private http: HttpClient) {}
  getDistance(departure, destination): Observable<any> {
    return this.http.get<any>(
      `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${departure}&destinations=${destination}&key=${this.distanceMatrixKey}`
    );
  }
  
  getLocation(street, city, zip): Observable<any> {
    street = street.replace(" ", "+");
    city = city.replace(" ", "+");
    return this.http.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${street},${city}+${zip}&key=${this.locationGeocodingKey}`
    );
  }

  getLocationByCoords(latitude, longitude): Observable<any> {
    return this.http.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${latitude},${longitude}&key=${this.locationGeocodingKey}`
    );
  }
}
