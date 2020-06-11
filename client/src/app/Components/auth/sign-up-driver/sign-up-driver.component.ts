import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
//import { read } from 'fs';
// import { format } from 'path';
@Component({
  selector: "app-sign-up-driver",
  templateUrl: "./sign-up-driver.component.html",
  styleUrls: ["./sign-up-driver.component.css"],
})
export class SignUpDriverComponent implements OnInit {
  avatar;

  newDriver = new FormGroup({
    first_name: new FormControl(""),
    last_name: new FormControl(""),
    password: new FormControl(""),
    email: new FormControl(""),
    birth_date: new FormControl(""),
    address: new FormControl(""),
    phone: new FormControl(""),
    cin: new FormControl(""),
  });

  
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.avatar = file;
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    let driver = this.newDriver.value;
    formData.append("avatar", this.avatar);
    for (let key in driver) {
      formData.append(key, driver[key]);
    }
    this.authService.registerDriver(formData).subscribe((res: any) => {
      this.router.navigate(["/login"]);
    });
  }

  ngOnInit(): void {}
}
