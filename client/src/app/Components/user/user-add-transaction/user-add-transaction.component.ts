import { AuthService } from "./../../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { TransactionService } from "../../../services/transaction.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
//import { MapComponent } from "../map/map.component";

@Component({
  selector: "app-user-add-transaction",
  templateUrl: "./user-add-transaction.component.html",
  styleUrls: ["./user-add-transaction.component.css"],
})
export class UserAddTransactionComponent implements OnInit {
  newTransaction = new FormGroup({
    package_dimension: new FormControl(""),
    package_weight: new FormControl(""),
    package_comments: new FormControl(""),
    address_start: new FormControl(""),
    city_start: new FormControl(""),
    zip_start: new FormControl(""),
    longitude_start: new FormControl(""),
    latitude_start: new FormControl(""),
    address_destination: new FormControl(""),
    city_destination: new FormControl(""),
    zip_destination: new FormControl(""),
    longitude_destination: new FormControl(""),
    latitude_destination: new FormControl(""),
    request_date: new FormControl(""),
    request_time: new FormControl(""),
  });

  closeResult: string;
  departure_latitude: number = 36.7899655;
  departure_longitude: number = 10.1714251;

  destination_longitude: number = 36.8099113426508;
  destination_latitude: number = 10.074214044819838;
  loc = {
    longitude: this.departure_longitude,
    latitude: this.departure_latitude,
    update_longitude: 37.07007538620692,
    update_latitude: 10.112363560719228,
  };
  //myMap = "<app-map [location]=loc></app-map>";
  constructor(
    private transactionService: TransactionService,
    private authService: AuthService,
    private modalService: NgbModal //private map: MapComponent
  ) {}
  yelkekzemzmi(e) {
    console.log("yehelkek", e);
  }
  ngOnInit(): void {}

  open(content) {
    this.modalService.open(content, { size: "lg" }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit() {
    const transaction = this.newTransaction.value;
    transaction.userId = this.authService.getId();
    this.transactionService.postTransaction(transaction).subscribe((res) => {
      console.log("Transaction added");
    });
  }
}
