import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class HistoryTransactionService {

  constructor(private http: HttpClient) {}

  id = window.localStorage.getItem('id');

  fetchDriverData() {
    return this.http.get(`http://localhost:8080/driverTransaction/tr/${this.id}`);
  }

  fetchUserData() {
    return this.http.get(`http://localhost:8080/userTransaction/tr/${this.id}`);
  }

  fetchAllTrasactions(){
    return this.http.get(`http://localhost:8080/userTransaction/tr/`);
  }

  doneTransaction(data){
    return this.http.post<any>(`http://localhost:8080/driverTransaction/donetransaction`, data);
  }
}
