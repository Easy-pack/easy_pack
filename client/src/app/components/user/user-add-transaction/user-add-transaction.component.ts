import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-add-transaction',
  templateUrl: './user-add-transaction.component.html',
  styleUrls: ['./user-add-transaction.component.css']
})
export class UserAddTransactionComponent implements OnInit {
  newTransaction= new FormGroup({
    package_dimension: new FormControl(''),
    package_weight: new FormControl(''),
    package_comments: new FormControl(''),
    address_start: new FormControl(''),
    address_destination: new FormControl(''),
    request_date: new FormControl(''),
    request_time: new FormControl(''),
  });
  
  constructor() { }

  ngOnInit(): void {
  }

}
