import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class SharedData {
  // data to be displayed on the transaction details page;
  transactionData = {
    package_dimension: "",
    package_weight: "",
    package_comments: "",
    address_start: "",
    address_destination: "",
    request_date: "",
    request_time: "",
    price: "0$",
  };
  // data between add-transaction-component and map-component
  addMapTransactionData = {
    package_dimension: "",
    package_weight: "",
    package_comments: "",
    address_start: "",
    city_start: "",
    zip_start: 1000,
    longitude_start: 0,
    latitude_start: 0,
    address_destination: "",
    city_destination: "",
    zip_destination: 1000,
    longitude_destination: 0,
    latitude_destination: 0,
    request_date: "",
    request_time: "",
  };
  constructor() {}
}
