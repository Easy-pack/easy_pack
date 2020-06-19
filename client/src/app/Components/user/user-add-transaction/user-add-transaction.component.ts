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
import { SocketIoService } from "../../../services/socket-io.service";
import {MapService} from '../../../services/map.service';
import {CalculatePriceService} from '../../../services/calculate-price.service';

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
  distance: number;
  id = localStorage.getItem("id");
  socket;
  constructor(
    private transactionService: TransactionService,
    private authService: AuthService,
    private modalService: NgbModal,
    private userService: UserProfileService, // private map: MapComponent
    private sharedData: SharedData,
    private socketIoService: SocketIoService,
    private router: Router,
    private mapService: MapService,
    private priceService: CalculatePriceService
  ) {
    this.socket = socketIoService;
  }
  yelkekzemzmi(e) {
    console.log("yehelkek", e);
  }
  ngOnInit(): void {
    // tslint:disable-next-line:no-shadowed-variable
    this.userService.fetchData(this.id).subscribe((data) => {
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
    this.sharedData.transactionData.city_start = this.sharedData.addMapTransactionData.city_start;
    this.sharedData.transactionData.city_destination = this.sharedData.addMapTransactionData.city_destination;

    this.priceService.getTransactionDistance().subscribe(data => {
      console.log('za3ma wa9teh', typeof (data['rows'][0]['elements'][0]['distance']['value']));
      this.distance = (data['rows'][0]['elements'][0]['distance']['value']) / 1000;
      console.log(this.distance);
      const dimension = this.sharedData.transactionData.package_dimension;
      const weight = this.sharedData.transactionData.package_weight;
      let price = 0;
      if (this.distance < 10) {
        if (dimension === 'xl') {
          console.log('<10', typeof(weight), weight);
          if (weight === '1') {
            console.log('<10');
            price = 30;
          } else {
            price = 25;
          }
        } else if (dimension === 'l') {
          if (weight === '1') {
            price = 20;
          } else {
            price = 15;
          }
        } else if (dimension === 'm') {
          if (weight === '3') {
            price = 13;
          } else {
            price = 10;
          }
        } else if (dimension === 's') {
          if (weight === '4') {
            price = 7;
          } else {
            price = 3;
          }
        }
      } else if (this.distance >= 10 && this.distance < 40) {
        if (dimension === 'xl') {
          if (weight === '1') {
            price = 45;
          } else {
            price = 40;
          }
        } else if (dimension === 'l') {
          if (weight === '1') {
            price = 40;
          } else {
            price = 35;
          }
        } else if (dimension === 'm') {
          if (weight === '3') {
            price = 30;
          } else {
            price = 25;
          }
        } else if (dimension === 's') {
          if (weight === '4') {
            price = 15;
          } else {
            price = 10;
          }
        }
      } else if (this.distance >= 40) {
        if (dimension === 'xl') {
          if (weight === '1') {
            price = this.distance * 1.5 + 20;
          } else {
            price = this.distance * 1.5 + 10;
          }
        } else if (dimension === 'l') {
          price = this.distance * 1.25 + 10;
        } else if (dimension === 'm') {
          price = this.distance;
        } else if (dimension === 's') {
          if (weight === '4') {
            price = this.distance / 3;
          } else {
            price = this.distance / 4;
          }
        }
      }
      this.sharedData.transactionData.price = price;
      console.log('fel shared', this.sharedData.transactionData.price, ' hedhi fel fonction', price);
    });

    const transaction = this.newTransaction.value;
    transaction.userId = this.authService.getId();
    transaction.role = this.authService.getRole();
    

      setTimeout(() => {
        this.router.navigate(['/user/shippingDetails']);
      } , 1800 );
  }
}
