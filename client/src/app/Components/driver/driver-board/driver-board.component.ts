import { Component, OnInit, OnChanges } from "@angular/core";
import Chart from "chart.js";
import { DriverBoardService } from "../../../services/driver-board.service";
import { DriverProfileService } from "../../../services/driver-profile.service";
import { VehiclesService } from "../../../services/vehicles.service";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "../../../variables/charts";
import { getRangeIndexes } from "@syncfusion/ej2/spreadsheet";

@Component({
  selector: "app-driver-board",
  templateUrl: "./driver-board.component.html",
  styleUrls: ["./driver-board.component.css"],
})
export class DriverBoardComponent implements OnInit, OnChanges {
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked = true;
  public clicked1 = false;
  rides: number;
  earnings: number;
  rate: any;
  topTransactions: any;
  monthsArray: any;
  deliveries: any;
  incomes: any;
  monthLetter: any;
  vehicules: any;
  classVehiculeIcon: any;
  constructor(
    private driverBoardService: DriverBoardService,
    private driverProfile: DriverProfileService,
    private driverVehicule: VehiclesService
  ) {}
  getRidesAndEarning() {
    this.driverBoardService.getRidesAndEarnings().subscribe((data) => {
      this.rides = data["ridesCounter"];
      this.earnings = data["total_income"];
      this.topTransactions = data["topTransactions"];
      this.monthsArray = data["monthsArray"];
      this.deliveries = data["deliveries"];
      this.incomes = data["incomes"];
      this.monthLetter = data["monthLetter"];
      console.log("total income", data, this.incomes);
      this.datasets = [
        [0, 20, 10, 30, 15, 40, 20, 60, 60],
        [0, 20, 5, 25, 10, 30, 15, 40, 40],
      ];
      this.data = this.datasets[0];

      const chartOrders = document.getElementById("chart-orders");

      parseOptions(Chart, chartOptions());
      chartExample2.data["labels"] = this.monthLetter;
      chartExample2.data["datasets"][0]["data"] = this.deliveries;

      const ordersChart = new Chart(chartOrders, {
        type: "bar",
        options: chartExample2.options,
        data: chartExample2.data,
      });

      const chartSales = document.getElementById("chart-sales");
      chartExample1.data["labels"] = this.monthLetter;
      chartExample1.data["datasets"][0]["data"] = this.incomes;
      console.log("this.incomes", this.incomes);

      this.salesChart = new Chart(chartSales, {
        type: "line",
        options: chartExample1.options,
        data: chartExample1.data,
      });
    });

    this.driverProfile.fetchData().subscribe((data) => {
      this.rate = Array(data["driver"]["rate"]);
    });

    this.driverVehicule.fetchDrivervehicles().subscribe((data) => {
      this.vehicules = data;
    });
  }
  getVehiculeicon(index) {
    if (this.vehicules[index]["type"] === "Bicycle") {
      return "fas fa-bicycle";
    } else if (this.vehicules[index]["type"] === "Scooter") {
      return "fas fa-motorcycle";
    } else if (this.vehicules[index]["type"] === "Car") {
      return "fas fa-car-side";
    } else if (this.vehicules[index]["type"] === "Truck") {
      return "fas fa-truck";
    }
  }
  ngOnChanges() {}
  ngOnInit() {
    this.getRidesAndEarning();
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
}
