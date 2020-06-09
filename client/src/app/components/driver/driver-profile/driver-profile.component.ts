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
  stateCOlor: string;

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
    // cin: String,
    // rate: Number,
    state: new FormControl(""),
    photo: new FormControl(""),
  });

  get verifyPassword() {
    return this.driverForm.controls;
  }
  allowEdit() {
    this.disableEdit = false;
  }
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private driverService: DriverProfileService
  ) {}

  getDriver() {
    this.driverService.fetchData(this.id).subscribe((driverData) => {
      console.log("fetchedDATA", driverData);
      this.data = driverData["driver"];
      console.log("driver VALUE", this.data);
      (<FormGroup>this.driverForm).patchValue(this.data);
      //this.driverForm.setValue({ value: this.data });
      this.rate = Array(this.data.rate);
      if (this.data.state === "available") {
        this.stateCOlor = "green";
      } else {
        this.stateCOlor = "red";
      }
      this.createdAt = moment(this.data.createdAt).format('"MMM Do YY"');
      console.log("this.driverForm.value", this.driverForm.value);
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
      this.stateCOlor = "red";
      this.data.state = "absent";
    } else if (this.data.state === "absent") {
      this.data.state = "available";
      this.stateCOlor = "green";
      console.log(this.data.state);
    }
  }

  updateDriver(formDriver, e) {
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
    e.preventDefault();
    this.driverService.postData(this.id, formDriver).subscribe((res: any) => {
      console.log("res", res);
      console.log("formDriver", this.id, this.data);
      // document.getElementById("fullName").innerHTML =
      //   this.driverForm.value.first_name +
      //   " " +
      //   this.driverForm.value.last_name;
      this.passwordInputValue = null;
      this.disableEdit = true;

      console.log("state2", formDriver.state);
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
      // cin: String,
      // rate: Number,
      state: [""],
      photo: [""],
    });
    this.driverForm.valueChanges.subscribe((newVal) =>
      console.log("newval", newVal)
    );
  }
}
