import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup-user',
  templateUrl: './signup-user.component.html',
  styleUrls: ['./signup-user.component.css']
})
export class SignupUserComponent implements OnInit {
  newUser= new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl(''),
    vat_number: new FormControl(''),
    cin : new FormControl('')
  });
  uploadForm: FormGroup;
  
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit(): void {
    console.log('NewUser', this.newUser.value);
    this.authService.registerUser(this.newUser.value).subscribe((res: any) => {
      this.router.navigate(['/login']);
      console.log(res)
    });
  }
  
  ngOnInit(): void {
   
  }
}
