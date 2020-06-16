import { Component, OnInit } from "@angular/core";
import { User } from "../../../interfaces/user";
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
  id: number;
  data
  rate: any;
  submitted: boolean = false;
  disableEdit: boolean = true;
  passwordInputValue: string = "";
  createdAt: string;
  stateColor: string;
  closeResult: string;

  UserForm = new FormGroup({
    first_name: new FormControl(""),
    last_name: new FormControl(""),
    password: new FormControl(""),
    currentPassword: new FormControl(""),
    birth_date: new FormControl(""),
    adress: new FormControl(""),
    gender: new FormControl(""),
    email: new FormControl(""),
    phone: new FormControl(""),
    newPassword: new FormControl(""),
    confirmNewPassword: new FormControl(""),

    photo: new FormControl(""),
  });

  constructor(
    private formBuilder: FormBuilder,
    private driverProfileService: DriverProfileService,
    private modalService: NgbModal
  ) {}
  open(content) {
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
    return this.UserForm.controls;
  }
  allowEdit() {
    this.disableEdit = false;
  }

  getUser() {
    this.driverProfileService.fetchData().subscribe((UserData) => {
      this.data = UserData;
      this.data = this.data.driver;
      console.log(this.data);
      (<FormGroup>this.UserForm).patchValue(this.data);
      this.rate = Array(this.data.rate);
      this.createdAt = moment(this.data.createdAt).format('"MMM Do YY"');
      console.log(UserData);
    });
  }

  checkNewPassword() {
    if (
      !this.UserForm.value.newPassword &&
      !this.UserForm.value.confirmNewPassword
    ) {
      return true;
    } else {
      if (
        this.UserForm.value.newPassword ===
        this.UserForm.value.confirmNewPassword
      ) {
        alert("correct new password ");
        let hashNewPassword = bcrypt.hashSync(
          this.UserForm.value.newPassword,
          10
        );
        this.UserForm.value.password = hashNewPassword;
        return true;
      } else {
        alert("not matching password");
        return false;
      }
    }
    return false;
  }


  updateUser() {
    this.driverProfileService
      .postData(this.id, this.UserForm.value)
      .subscribe((res: any) => {
        this.passwordInputValue = null;
        this.disableEdit = true;
        this.getUser();
      });
  }

  updateGender(e) {
    console.log(e.target.value);
    this.data.gender = e.target.value;
  }

  ngOnInit(): void {
    this.getUser();

    this.UserForm = this.formBuilder.group({
      first_name: ["", [Validators.required]],
      last_name: [""],
      password: [""],
      currentPassword: [""],
      birth_date: [""],
      adress: [""],
      gender: [""],
      email: [""],
      phone: [""],
      newPassword: [""],
      confirmNewPassword: [""],
      photo: [""],
    });

  }
}
