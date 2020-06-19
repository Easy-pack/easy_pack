import { Component, OnInit } from '@angular/core';
import { HistoryTransactionService } from '../../../services/history-transaction.service';
import { SocketIoService } from '../../../services/socket-io.service';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { DriverProfileService } from '../../../services/driver-profile.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {
  public contactInfo;
  public transactions;
  closeResult: string;

  constructor(private historyTransactionService : HistoryTransactionService,
              private socketIoService : SocketIoService,
              private driverProfileService : DriverProfileService,
              private modalService : NgbModal) { }

  getTransactions(){
    this.historyTransactionService.fetchUserData().subscribe((response)=>{
      this.transactions = response;
    });
  }
  
  ngOnInit(): void {
    this.getTransactions();
    this.socketIoService.setupSocketConnection().on('userNotification', (data)=>{
      this.getTransactions();
    })
  }

  filter(event){
    this.historyTransactionService.fetchUserData().subscribe((response)=>{
      this.transactions = response;
      if(event.target.value !== 'all'){
        this.transactions = this.transactions.filter(element => element.state === event.target.value);
      }
    });
  }

  open(content, i) {
    this.driverProfileService.checkSpecificDriver(i).subscribe((DriverData) => {
      this.contactInfo = DriverData["driver"];
    })
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
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


}
