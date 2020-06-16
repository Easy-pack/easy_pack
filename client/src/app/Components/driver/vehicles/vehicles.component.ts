import { Component, OnInit } from '@angular/core';
import { VehiclesService } from '../../../services/vehicles.service';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  vehicles;
  closeResult: string;

  newVehicle = new FormGroup({
    type: new FormControl(""),
    make: new FormControl(""),
    model: new FormControl(""),
    color: new FormControl(""),
    license_plate: new FormControl(""),
    reg_number: new FormControl(""),
  });
  constructor( public vehiclesService: VehiclesService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getvehicles()
  }

  getvehicles(){
    this.vehiclesService.fetchDrivervehicles().subscribe(response =>{
      this.vehicles = response;
    });
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed      this.getvehicles()
          this.close() ${this.getDismissReason(reason)}`;
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

  close(){
    this.modalService.dismissAll()
  }

  onSubmit(){
    const Veh = this.newVehicle.value;
    Veh.userId = window.localStorage.getItem('id')
    this.vehiclesService.addVehicle(Veh).subscribe(res =>{
      console.log("vehicle added")
      this.getvehicles()
    })

    this.close()
    this.newVehicle = new FormGroup({
      type: new FormControl(""),
      make: new FormControl(""),
      model: new FormControl(""),
      color: new FormControl(""),
      license_plate: new FormControl(""),
      reg_number: new FormControl(""),
    });
  }

}
