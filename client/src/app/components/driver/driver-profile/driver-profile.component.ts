import { Component, OnInit } from "@angular/core";
import { DriverInterface } from "../../../interfaces/driver-interface";
import { DriverProfileService } from "../../../services/driver-profile.service";
import { HttpClient } from "@angular/common/http";

import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";

import * as bcrypt from "bcryptjs";
import * as moment from "moment";
import { from } from "rxjs";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DialogPasswordConfirmationComponent } from "../dialog-password-confirmation/dialog-password-confirmation.component";

@Component({
  selector: "app-driver-profile",
  templateUrl: "./driver-profile.component.html",
  styleUrls: ["./driver-profile.component.css"],
})
export class DriverProfileComponent implements OnInit {
  id: number;
  data: DriverInterface;
  rate: any;
  submitted: boolean = false;
  disableEdit: boolean = true;
  passwordInputValue: string = "";
  createdAt: string;
  stateColor: string;

  driverForm = new FormGroup({
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
    state: new FormControl(""),
    photo: new FormControl(""),
  });

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private driverService: DriverProfileService,
    private matDialog: MatDialog
  ) {}

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    this.matDialog.open(DialogPasswordConfirmationComponent, dialogConfig);
  }

  get verifyPassword() {
    return this.driverForm.controls;
  }
  allowEdit() {
    this.disableEdit = false;
  }

  getDriver() {
    this.driverService.fetchData(this.id).subscribe((driverData) => {
      console.log("fetchedDATA2", driverData);
      this.data = driverData["driver"];
      console.log("this.DATAIN", this.data);
      (<FormGroup>this.driverForm).patchValue(this.data);
      //this.driverForm.setValue({ value: this.data });
      this.rate = Array(this.data.rate);
      if (this.data.state === "available") {
        this.stateColor = "green";
      } else {
        this.stateColor = "red";
      }
      this.createdAt = moment(this.data.createdAt).format('"MMM Do YY"');
      console.log("this.driverForm.valueUpdated ", this.driverForm.value);
    });
  }

  checkNewPassword() {
    if (
      !this.driverForm.value.newPassword &&
      !this.driverForm.value.confirmNewPassword
    ) {
      //alert(' empty passwords values');
      return true;
    } else {
      if (
        this.driverForm.value.newPassword ===
        this.driverForm.value.confirmNewPassword
      ) {
        alert("correct new password ");
        let hashNewPassword = bcrypt.hashSync(
          this.driverForm.value.newPassword,
          10
        );
        this.driverForm.value.password = hashNewPassword;
        return true;
      } else {
        alert("not matching password");
        return false;
      }
    }
    return false;
  }

  changeState() {
    if (this.data.state === "available") {
      this.stateColor = "red";
      this.data.state = "absent";
    } else if (this.data.state === "absent") {
      this.data.state = "available";
      this.stateColor = "green";
      console.log(this.data.state);
    }
  }

  updateDriver() {
    // this.submitted = true;
    // if (this.driverForm.value.currentPassword == null) {
    //   alert("Please enter your password");
    // } else {
    //   let comparePasswords = bcrypt.compareSync(
    //     this.driverForm.value.currentPassword,
    //     this.data.password
    //   );
    //   if (comparePasswords) {
    //     if (this.checkNewPassword()) {
    //       formDriver.id = 1;
    //       formDriver.state = this.data.state;
    //       console.log("state", formDriver.state);
    // e.preventDefault();
    console.log(this.driverForm.value, "inputs");
    this.driverService
      .postData(this.id, this.driverForm.value)
      .subscribe((res: any) => {
        console.log("res", res);
        // console.log("formDriver", this.id, this.data);
        // document.getElementById("fullName").innerHTML =
        //   this.driverForm.value.first_name +
        //   " " +
        //   this.driverForm.value.last_name;
        this.passwordInputValue = null;
        this.disableEdit = true;

        console.log("state2", this.driverForm.value.state);
        this.allowEdit();
        this.getDriver();
      });
  }
  //   } else {
  //     alert("Please check your password and try again");
  //   //   }
  //   }
  // }

  updateGender(e) {
    console.log(e.target.value);
    this.data.gender = e.target.value;
  }

  ngOnInit(): void {
    this.id = 1;
    console.log("driverID", this.id);
    this.getDriver();

    this.driverForm = this.formBuilder.group({
      first_name: ["NNN", [Validators.required]],
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
      state: [""],
      photo: [""],
    });
    this.driverForm.valueChanges.subscribe((newVal) =>
      console.log("newval", newVal)
    );
  }
}
