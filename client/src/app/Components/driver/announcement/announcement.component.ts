import { TransactionService } from './../../../services/transaction.service';
import { Component, OnInit } from '@angular/core';
import { HistoryTransactionService } from '../../../services/history-transaction.service';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { SocketIoService } from '../../../services/socket-io.service';
import { DriverProfileService } from "../../../services/driver-profile.service";
 
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
  driver;

  constructor(private historyTransactionService : HistoryTransactionService,
    private transactionService : TransactionService,    
    private modalService: NgbModal,
    private socketIoService : SocketIoService,
    private driverProfileService : DriverProfileService) { }

  ngOnInit(): void {
    this.socket = this.socketIoService.setupSocketConnection().on('notification', (data)=>{
      this.getAnnouncement();
    });
    this.getAnnouncement()
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
    this.driverProfileService.fetchData().subscribe(response =>{
      this.driver = response;
      this.driver = this.driver.driver;
      if(this.driver.state === "available"){
        this.transactionService.acceptTransaction(idTransaction).subscribe(response => {
          response.role = "driver";
          this.socketIoService.acceptTransaction(response).subscribe(response =>{})
          this.getAnnouncement()
        })
      } else{
        alert('You are already delivrering');
      }
    })
    
  }
}
