import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class DriverProfileService {
  constructor(private http: HttpClient) {}

  fetchData(id) {
    return this.http.get(`http://localhost:8080/driver/${id}`);
  }

  postData(id, formDriver) {
    console.log("DATA TO POST", formDriver);
    return this.http.post<any>(
      `http://localhost:8080/driver/${id}`,
      formDriver
    );
  }
}
