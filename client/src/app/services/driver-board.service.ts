import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class DriverBoardService {
  id = window.localStorage.getItem("id");
  constructor(private http: HttpClient) {}
  getRidesAndEarnings() {
    return this.http.get(`http://localhost:8080/driver/board/${this.id}`);
  }
}
