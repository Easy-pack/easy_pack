import { Component, OnInit } from '@angular/core';
import { HistoryTransactionService } from '../../../services/history-transaction.service';
import { SocketIoService } from '../../../services/socket-io.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {
  transactions;
  
  constructor(private historyTransactionService : HistoryTransactionService,
              private socketIoService : SocketIoService) { }

  getTransactions(){
    this.historyTransactionService.fetchUserData().subscribe((response)=>{
      this.transactions = response;
      console.log(this.transactions);
    });
  }
  
  ngOnInit(): void {
    this.getTransactions();
    this.socketIoService.setupSocketConnection().on('userNotification', (data)=>{
      this.getTransactions();
    })
  }

  filter(event){
    console.log(event.target.value);
    this.historyTransactionService.fetchUserData().subscribe((response)=>{
      this.transactions = response;
      if(event.target.value !== 'all'){
        this.transactions = this.transactions.filter(element => element.state === event.target.value);
      }
    });
  }

}
