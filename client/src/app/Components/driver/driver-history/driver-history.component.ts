import { Component, OnInit } from "@angular/core";
import { HistoryTransactionService } from "../../../services/history-transaction.service";
import { HistoryDriver } from "../../../interfaces/history-driver";

@Component({
  selector: "app-driver-history",
  templateUrl: "./driver-history.component.html",
  styleUrls: ["./driver-history.component.css"],
})
export class DriverHistoryComponent implements OnInit {
  history;
  constructor(private historyTransactionService : HistoryTransactionService) {}

  ngOnInit(): void {
    this.historyTransactionService.fetchData().subscribe(response =>{
      this.history = response;
    })
  }
}
