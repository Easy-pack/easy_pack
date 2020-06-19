import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { SharedData } from "../../../services/sharedData";
import { SocketIoService } from '../../../services/socket-io.service';
import { Router } from "@angular/router";

import { TransactionService } from "../../../services/transaction.service";

@Component({
  selector: "app-shipping",
  templateUrl: "./shipping.component.html",
  styleUrls: ["./shipping.component.css"],
})
export class ShippingComponent implements OnInit {
  public socket;

  constructor(
    private transactionDetails: SharedData,
    private transactionService: TransactionService,
    private socketIoService : SocketIoService,
    private router: Router
  ) {}
  get details() {
    console.log(this.transactionDetails.addMapTransactionData);
    
    return this.transactionDetails.transactionData;
  }
  newTransaction = new FormGroup({
    package_dimension: new FormControl(""),
    package_weight: new FormControl(""),
    package_comments: new FormControl(""),
    address_start: new FormControl(""),
    address_destination: new FormControl(""),
    request_date: new FormControl(""),
    request_time: new FormControl(""),
    price: new FormControl(""),
  });

  transaction = this.details;
  onSubmit() {
    const id = window.localStorage.getItem("id");
    this.transactionDetails.transactionData.address_start = this.transactionDetails.addMapTransactionData.address_start;
    this.transactionDetails.transactionData.latitude_start = this.transactionDetails.addMapTransactionData.latitude_start;
    this.transactionDetails.transactionData.longitude_start = this.transactionDetails.addMapTransactionData.longitude_start;
    this.transactionDetails.transactionData.address_destination = this.transactionDetails.addMapTransactionData.address_destination;
    this.transactionDetails.transactionData.latitude_destination = this.transactionDetails.addMapTransactionData.latitude_destination;
    this.transactionDetails.transactionData.longitude_destination = this.transactionDetails.addMapTransactionData.longitude_destination;
    this.transactionDetails.transactionData.userId = id;
    console.log("transaction confirmed", this.transactionDetails);
    this.transactionService
      .postTransaction(this.transactionDetails.transactionData)
      .subscribe((data) => {
        this.socketIoService
        .emmitTransaction(this.transactionDetails.transactionData)
        .subscribe((response) => {});
        this.router.navigate(["/user/history"]);
      });
      
  }
  ngOnInit(): void {
    (<FormGroup>this.newTransaction).patchValue(this.transaction);
    this.socket = this.socketIoService.setupSocketConnection().on('userNotification', (data) =>{})
  }
}
