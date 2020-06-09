import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
// import { format } from 'path';
@Component({
  selector: 'app-sign-up-driver',
  templateUrl: './sign-up-driver.component.html',
  styleUrls: ['./sign-up-driver.component.css'],
})
export class SignUpDriverComponent implements OnInit {
  newDriver= new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    birth_date: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl(''),
    cin: new FormControl(''),
  });
  uploadForm: FormGroup;
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
  onSubmit(): void {
    console.log('NewDriver', this.newDriver.value);
    this.authService.registerDriver(this.newDriver.value).subscribe((res: any) => {
      this.router.navigate(['/login']);
    });
  }
  
  ngOnInit(): void {
   
  }
}