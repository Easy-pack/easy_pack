import { TransactionService } from './../../../services/transaction.service';
import { Component, OnInit } from '@angular/core';
import { HistoryTransactionService } from '../../../services/history-transaction.service';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { SocketIoService } from '../../../services/socket-io.service';
 
@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {
  transactions;
  transaction;
  closeResult: string;
  index;
  socket;

  constructor(private historyTransactionService : HistoryTransactionService,
    private transactionService : TransactionService,    
    private modalService: NgbModal,
    public socketIoService : SocketIoService) { }

  ngOnInit(): void {
    this.socket = this.socketIoService.setupSocketConnection().on('notification', (data)=>{
      this.getAnnouncement();
    });
  }

  getAnnouncement(){
    this.historyTransactionService.fetchAllTrasactions().subscribe(response =>{
      this.transactions = response;
    });
  }

  open(content, i) {
    this.transaction = this.transactions[i]
    console.log(this.transaction)
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

  confirmDelivrery(){
    let idTransaction = this.transaction.id;
    this.transactionService.acceptTransaction(idTransaction).subscribe(response => {
      console.log('hi');
      console.log(response);
    });
  }
}
