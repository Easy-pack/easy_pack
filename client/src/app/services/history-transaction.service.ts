import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class HistoryTransactionService {
  constructor(private http: HttpClient) {}
  fetchData(id, role) {
    let type = role === "driver" ? "driverTransaction" : "userTransaction";
    return this.http.get(`http://localhost:8080/${type}/tr/${id}`);
  }
}
