import { Component, OnInit } from '@angular/core';
import { HistoryTransactionService } from '../../../services/history-transaction.service';
 
@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {
  transactions;
  constructor(private historyTransactionService  : HistoryTransactionService) { }

  ngOnInit(): void {
    this.historyTransactionService.fetchAllTrasactions().subscribe(response =>{
      this.transactions = response;
    });
  }
}
