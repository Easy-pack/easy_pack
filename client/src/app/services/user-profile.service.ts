import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  constructor(private http: HttpClient) {}

  fetchData(id) {
    return this.http.get(`http://localhost:8080/user/profile/${id}`);
  }

  postData(id, formUser) {
    console.log("DATA TO POST", formUser);
    return this.http.post<any>(
      `http://localhost:8080/user/profile/${id}`,
      formUser
    );
  }
}
