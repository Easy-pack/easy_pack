import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class DriverProfileService {
  id = window.localStorage.getItem('id');

  constructor(private http: HttpClient) {}

  fetchData() {
    return this.http.get(`http://localhost:8080/driverTransaction/${this.id}`);
  }

  postData(id, formDriver) {
    return this.http.post<any>(
      `http://localhost:8080/driverTransaction/${id}`,
      formDriver
    );
  }
}
