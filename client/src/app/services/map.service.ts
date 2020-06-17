import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class MapService {
  constructor(private http: HttpClient) {}

  getLocation(address, city, zip) {
    return this.http.get(
      "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAbBRHFCr2ZmQxNUCF52VRKjUb3XEGzGg8"
    );
  }
}
