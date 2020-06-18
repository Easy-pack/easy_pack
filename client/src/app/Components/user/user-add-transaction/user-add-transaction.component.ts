import { AuthService } from "./../../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { TransactionService } from "../../../services/transaction.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { UserProfileService } from "../../../services/user-profile.service";
import { SharedData } from "../../../services/sharedData";
import { ej } from "@syncfusion/ej2/dist/ej2";
import data = ej.data;

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
  id = localStorage.getItem("id");
  constructor(
    private transactionService: TransactionService,
    private authService: AuthService,
    private modalService: NgbModal,
    private userService: UserProfileService, // private map: MapComponent
    private sharedData: SharedData,
    private router: Router
  ) {}
  yelkekzemzmi(e) {
    console.log("yehelkek", e);
  }
  ngOnInit(): void {
    // tslint:disable-next-line:no-shadowed-variable
    this.userService.fetchData(this.id).subscribe((data) => {
      console.log(data);
      this.sharedData.addMapTransactionData.address_start = data["address"];
      this.sharedData.addMapTransactionData.city_start = data["city"];
      this.sharedData.addMapTransactionData.zip_start = data["zip"];
      this.sharedData.transactionData.address_start = `${data["address"]}, ${data["city"]}`;
    });
  }

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
  bindData(value) {
    this.sharedData.addMapTransactionData = value;
    console.log("binding done", this.sharedData.addMapTransactionData);
  }
  onSubmit() {
    this.sharedData.transactionData.address_start = `${this.sharedData.addMapTransactionData.address_start}, ${this.sharedData.addMapTransactionData.city_start}`;
    this.sharedData.transactionData.address_destination = `${this.sharedData.addMapTransactionData.address_destination}, ${this.sharedData.addMapTransactionData.city_destination}`;
    this.sharedData.transactionData.package_comments = this.newTransaction.value.package_comments;
    this.sharedData.transactionData.package_dimension = this.newTransaction.value.package_dimension;
    this.sharedData.transactionData.package_weight = this.newTransaction.value.package_weight;
    this.sharedData.transactionData.request_date = this.newTransaction.value.request_date;
    this.sharedData.transactionData.request_time = this.newTransaction.value.request_time;
    console.log(
      this.sharedData.transactionData,
      this.sharedData.addMapTransactionData
    );

    this.router.navigate(["/user/shippingDetails"]);
  }
}
