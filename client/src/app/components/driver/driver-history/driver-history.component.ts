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

  filter(event) {
    console.log(event.target.value);
    this.historyTransactionService.fetchUserData().subscribe((response) => {
      this.history = response;
      if (event.target.value !== "all") {
        this.history = this.history.filter(
          (element) => element.state === event.target.value
        );
      }
    });
  }

  constructor(
    private historyTransactionService: HistoryTransactionService,
    private socketIoService: SocketIoService
  ) {}

  ngOnInit(): void {
    this.historyTransactionService.fetchDriverData().subscribe((response) => {
      this.history = response;
    });
  }

  doneTransaction(transaction) {
    let data = {
      driverId: transaction.driverId,
      transactionId: transaction.id,
      userId: transaction.userId,
    };

    this.historyTransactionService
      .doneTransaction(data)
      .subscribe((response) => {});

    this.socketIoService.doneTransaction(data);
  }
}
