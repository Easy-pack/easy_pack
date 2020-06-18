import { Component, OnInit } from "@angular/core";
import { DriverInterface } from "../../../interfaces/driver-interface";
import { DriverProfileService } from "../../../services/driver-profile.service";

import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";

import * as bcrypt from "bcryptjs";
import * as moment from "moment";
import { from } from "rxjs";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-driver-profile",
  templateUrl: "./driver-profile.component.html",
  styleUrls: ["./driver-profile.component.css"],
})
export class DriverProfileComponent implements OnInit {
  id;
  data;
  rate: any;
  submitted: boolean = false;
  disableEdit: boolean = true;
  passwordInputValue: string = "";
  createdAt: string;
  stateColor: string;
  closeResult: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  stateButton: string;
  newState: string;

  DriverForm = new FormGroup({
    first_name: new FormControl(""),
    last_name: new FormControl(""),
    password: new FormControl(""),
    currentPassword: new FormControl(""),
    birth_date: new FormControl(""),
    adress: new FormControl(""),
    gender: new FormControl(""),
    email: new FormControl(""),
    phone: new FormControl(""),
    state: new FormControl(""),
    zip: new FormControl(""),
    city: new FormControl(""),
    // newPassword: new FormControl(""),
    // confirmNewPassword: new FormControl(""),
    photo: new FormControl(""),
  });

  constructor(
    private formBuilder: FormBuilder,
    private driverProfileService: DriverProfileService,
    private modalService: NgbModal
  ) {}

  open(content) {
    this.currentPassword = "";
    this.newPassword = "";
    this.confirmNewPassword = "";
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

  get verifyPassword() {
    return this.DriverForm.controls;
  }

  allowEdit() {
    this.disableEdit = false;
  }

  getDriver() {
    this.driverProfileService.fetchData().subscribe((DriverData) => {
      this.data = DriverData["driver"];
      console.log("Driver", DriverData["driver"]);
      (<FormGroup>this.DriverForm).patchValue(this.data);

      this.rate = Array(this.data.rate);
      if (this.data.state === "available") {
        this.stateColor = "green";
        this.stateButton = "green";
        this.newState = "available";
      } else if (this.data.state === "not available") {
        this.stateColor = "red";
        this.stateButton = "red";
        this.newState = "not available";
      }
      this.createdAt = moment(this.data.createdAt).format('"MMM Do YY"');
      console.log(DriverData, "this.date", this.DriverForm.value.birth_date);
    });
  }
  checkNewPassword() {
    if (this.newPassword == undefined && this.confirmNewPassword == undefined) {
      console.log("empty passwords");
      return true;
    } else {
      if (this.newPassword === this.confirmNewPassword) {
        alert("correct new password ");
        let hashNewPassword = bcrypt.hashSync(this.newPassword, 10);
        this.DriverForm.value.password = hashNewPassword;
        this.updateDriver();
      } else {
        alert("not matching password");
        return false;
      }
    }
    return false;
  }

  updatePassword() {
    if (this.currentPassword == undefined) {
      console.log("Please enter your password");
      alert("Please enter your password");
    } else {
      let comparePasswords = bcrypt.compareSync(
        this.currentPassword,
        this.data.password
      );
      if (comparePasswords) {
        console.log("correct current password");
        this.checkNewPassword();
      }
    }
  }

  updateDriver() {
    // this.submitted = true;
    if (this.currentPassword == undefined) {
      console.log("Please enter your password");
      alert("Please enter your password");
    } else {
      let comparePasswords = bcrypt.compareSync(
        this.currentPassword,
        this.data.password
      );
      if (comparePasswords) {
        console.log("currentpass", this.currentPassword);
        console.log(this.DriverForm.value, "inputs");
        this.data.state = "not available";
        this.driverProfileService
          .postData(this.id, this.DriverForm.value)
          .subscribe((res: any) => {
            this.passwordInputValue = null;
            this.disableEdit = true;
            this.getDriver();
            this.currentPassword = "";
            this.closeModal();
          });
      } else {
        alert("Please check your password and try again");
      }
    }
  }

  changeState() {
    if (this.data.state === "available") {
      this.stateColor = "red";
      this.stateButton = "red";
      this.newState = "not available";
      this.DriverForm.value.state = "not available";
      this.data.state = "not available";
    } else if (this.data.state === "not available") {
      this.stateColor = "green";
      this.stateButton = "green";
      this.newState = "available";
      this.DriverForm.value.state = "available";
      this.data.state = "available";
    }
    this.driverProfileService
      .postData(this.id, this.DriverForm.value)
      .subscribe((res: any) => {});
    console.log(this.DriverForm.value);
  }

  closeModal() {
    this.modalService.dismissAll();
  }
  updateGender(e) {
    console.log(e.target.value);
    this.data.gender = e.target.value;
  }
  cancel() {
    (<FormGroup>this.DriverForm).patchValue(this.data);
    this.passwordInputValue = null;
    this.disableEdit = true;
  }

  ngOnInit(): void {
    this.id = window.localStorage.getItem("id");
    this.getDriver();

    this.DriverForm = this.formBuilder.group({
      first_name: ["", [Validators.required]],
      last_name: [""],
      password: [""],
      currentPassword: [""],
      birth_date: [""],
      adress: [""],
      gender: [""],
      email: [""],
      phone: [""],
      state: [""],
      photo: [""],
      zip: [""],
      city: [""]
    });
  }
}
