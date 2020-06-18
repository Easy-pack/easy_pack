import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TransactionService } from '../../../services/transaction.service'
import { SocketIoService } from '../../../services/socket-io.service';

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
  
  socket;

  constructor(private transactionService:TransactionService,
              private authService : AuthService,
              private socketIoService : SocketIoService) { 
                this.socket = socketIoService;              
              }

  ngOnInit(): void {
  }
  

  onSubmit(){
    const transaction = this.newTransaction.value;
    transaction.userId = this.authService.getId();
    this.transactionService.postTransaction(transaction).subscribe(res =>{
     
    })

    // socket db
    transaction.role = this.authService.getRole();
    this.socketIoService.emmitTransaction(transaction).subscribe(response =>{
      
    });
  }
}