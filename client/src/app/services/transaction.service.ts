import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, public router: Router) { }

  
  postTransaction( formTransaction) {
    console.log("DATA TO POST", formTransaction);
    return this.http.post<any>(
      `http://localhost:8080/userTransaction`,
      formTransaction
    );
  }

}
