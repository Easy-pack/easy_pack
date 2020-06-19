import { Component, OnInit } from "@angular/core";
import { User } from "../../../interfaces/user";
import { UserProfileService } from "../../../services/user-profile.service";

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
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit {
  id;
  data;
  rate: any;
  submitted = false;
  disableEdit = true;
  passwordInputValue = "";
  createdAt: string;
  stateColor: string;
  closeResult: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;

  UserForm = new FormGroup({
    first_name: new FormControl(""),
    last_name: new FormControl(""),
    password: new FormControl(""),
    currentPassword: new FormControl(""),
    birth_date: new FormControl(""),
    adress: new FormControl(""),
    city: new FormControl(""),
    zip: new FormControl(""),
    gender: new FormControl(""),
    email: new FormControl(""),
    phone: new FormControl(""),
    newPassword: new FormControl(""),
    confirmNewPassword: new FormControl(""),
    photo: new FormControl(""),
  });

  constructor(
    private formBuilder: FormBuilder,
    private UserService: UserProfileService,
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
    return this.UserForm.controls;
  }
  allowEdit() {
    this.disableEdit = false;
  }

  getUser() {
    this.UserService.fetchData(this.id).subscribe((UserData) => {
      this.data = UserData;

      (<FormGroup>this.UserForm).patchValue(this.data);
      this.rate = Array(this.data.rate);
      this.createdAt = moment(this.data.createdAt).format('"MMM Do YY"');
      console.log(UserData);
    });
  }
  checkNewPassword() {
    if (this.newPassword == undefined && this.confirmNewPassword == undefined) {
      console.log("empty passwords");
      return true;
    } else {
      if (this.newPassword === this.confirmNewPassword) {
       
        let hashNewPassword = bcrypt.hashSync(this.newPassword, 10);
        this.UserForm.value.password = hashNewPassword;
        this.updateUser();
      } else {
     
        return false;
      }
    }
    return false;
  }

  updatePassword() {
    if (this.currentPassword == undefined) {
      console.log("Please enter your password");
     
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

  updateUser() {
    if (this.currentPassword == undefined) {
      console.log("Please enter your password");
    
    } else {
      let comparePasswords = bcrypt.compareSync(
        this.currentPassword,
        this.data.password
      );
      if (comparePasswords) {
        console.log("currentpass", this.currentPassword);
        console.log(this.UserForm.value, "inputs");
        this.data.state = "not available";
        this.UserService.postData(this.id, this.UserForm.value).subscribe(
          (res: any) => {
            this.passwordInputValue = null;
            this.disableEdit = true;
            this.getUser();
            this.currentPassword = "";
            this.closeModal();
          }
        );
      } else {
        
      }
    }
  }
  closeModal() {
    this.modalService.dismissAll();
  }

  updateGender(e) {
    console.log(e.target.value);
    this.data.gender = e.target.value;
  }
  cancel() {
    (<FormGroup>this.UserForm).patchValue(this.data);
    this.passwordInputValue = null;
    this.disableEdit = true;
  }
  ngOnInit(): void {
    this.id = window.localStorage.getItem("id");
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
