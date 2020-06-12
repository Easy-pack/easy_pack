import { Component, OnInit } from '@angular/core';
import { HistoryTransactionService } from '../../../services/history-transaction.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {
  transactions;
  
  constructor(private historyTransactionService : HistoryTransactionService) { }

  ngOnInit(): void {
    this.historyTransactionService.fetchUserData().subscribe((response)=>{
      this.transactions = response;
      console.log(this.transactions);
    })
  }

}
