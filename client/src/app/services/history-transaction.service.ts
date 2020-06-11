import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class HistoryTransactionService {

  constructor(private http: HttpClient) {}

  id = window.localStorage.getItem('id');
  role = window.localStorage.getItem('role');

  fetchData() {
    let type = this.role === "driver" ? "driverTransaction" : "userTransaction";
    return this.http.get(`http://localhost:8080/${type}/tr/${this.id}`);
  }
}
