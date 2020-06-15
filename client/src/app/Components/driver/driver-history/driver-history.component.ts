import { Component, OnInit } from "@angular/core";
import { HistoryTransactionService } from "../../../services/history-transaction.service";
import { HistoryDriver } from "../../../interfaces/history-driver";
import { SocketIoService } from "../../../services/socket-io.service";

@Component({
  selector: "app-driver-history",
  templateUrl: "./driver-history.component.html",
  styleUrls: ["./driver-history.component.css"],
})
export class DriverHistoryComponent implements OnInit {
  history;
  socket;

  constructor(private historyTransactionService : HistoryTransactionService,
              private socketIoService : SocketIoService) {
              }

  ngOnInit(): void {
    this.historyTransactionService.fetchDriverData().subscribe(response =>{
      this.history = response;
    });
  }
}
