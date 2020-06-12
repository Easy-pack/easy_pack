import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class DriverProfileService {
  //id = window.localStorage.getItem("id");
  id = 1;
  constructor(private http: HttpClient) {}

  fetchData() {
    return this.http.get(`http://localhost:8080/driver/${this.id}`);
  }

  postData(id, formDriver) {
    console.log("DATA TO POST", formDriver);
    return this.http.post<any>(
      `http://localhost:8080/driver/${this.id}`,
      formDriver
    );
  }
}
