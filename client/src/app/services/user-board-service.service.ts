import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class UserBoardServiceService {
  id = window.localStorage.getItem("id");
  constructor(private http: HttpClient) {}
  getDetails() {
    return this.http.get(`http://localhost:8080/user/board/${this.id}`);
  }
}
