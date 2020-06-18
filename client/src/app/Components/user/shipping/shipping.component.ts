import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { SharedData } from "../../../services/sharedData";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-shipping",
  templateUrl: "./shipping.component.html",
  styleUrls: ["./shipping.component.css"],
})
export class ShippingComponent implements OnInit {
  constructor(private transactionDetails: SharedData) {}
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
    console.log("transaction confirmed", this.transactionDetails);
  }
  ngOnInit(): void {
    (<FormGroup>this.newTransaction).patchValue(this.transaction);
  }
}
