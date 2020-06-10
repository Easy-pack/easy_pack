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
  avatar;
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
  
  onChange(event){
    if(event.target.files && event.target.files.length > 0){
      const file = event.target.files[0];
      this.avatar = file;
    }
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit(): void {
    const user = this.newUser.value;
    const formData = new FormData();
    for(let key in user){
      formData.append(key, user[key]);
    }
    formData.append('avatar', this.avatar);
    this.authService.registerUser(formData).subscribe((res: any) => {
      this.router.navigate(['/login']);
    });
  }
  
  ngOnInit(): void {
   
  }
}
