import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  id = window.localStorage.getItem('id');

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, public router: Router) { }

  fetchDrivervehicles() {
    return this.http.get(`http://localhost:8080/driverTransaction/vehicle/${this.id}`);
  }

  addVehicle( formVehicle) {
    console.log("DATA TO POST", formVehicle);
    return this.http.post<any>(
      `http://localhost:8080/driverTransaction/vehicle/${this.id}`,
      formVehicle
    );
  }
}
