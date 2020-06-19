import { Component, OnInit, OnChanges } from "@angular/core";
import Chart from "chart.js";
import { UserBoardServiceService } from "../../../services/user-board-service.service";
import { UserProfileService } from "../../../services/user-profile.service";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "../../../variables/charts";
import { from } from "rxjs";
import { getRangeIndexes } from "@syncfusion/ej2/spreadsheet";

@Component({
  selector: "app-user-board",
  templateUrl: "./user-board.component.html",
  styleUrls: ["./user-board.component.css"],
})
export class UserBoardComponent implements OnInit {
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked = true;
  public clicked1 = false;
  total_expenses: number;
  topTransactions: any;
  monthsArray: any;
  deliveries: any;
  expenses: any;
  monthLetter: any;
  pendingTransactions: number;
  ridesCounter:number;
  id = window.localStorage.getItem("id");

  constructor(
    private userBoardService: UserBoardServiceService,
    private userProfile: UserProfileService
  ) {}
  getDetails() {
    this.userBoardService.getDetails().subscribe((data) => {
      this.total_expenses = data["total_expenses"];
      this.topTransactions = data["topTransactions"];
      this.monthsArray = data["monthsArray"];
      this.deliveries = data["deliveries"];
      this.expenses = data["expenses"];
      this.monthLetter = data["monthLetter"];
      this.ridesCounter = data["ridesCounter"];
      console.log("total expenses", data, this.expenses);
      this.datasets = [
        [0, 20, 10, 30, 15, 40, 20, 60, 60],
        [0, 20, 5, 25, 10, 30, 15, 40, 40],
      ];
      this.pendingTransactions = data["pending"];
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
      chartExample1.data["datasets"][0]["data"] = this.expenses;
      console.log("this.incomes", this.expenses);

      this.salesChart = new Chart(chartSales, {
        type: "line",
        options: chartExample1.options,
        data: chartExample1.data,
      });
    });
  }
  ngOnInit() {
    this.getDetails();
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
}
