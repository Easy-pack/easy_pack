import { AuthService } from './../../../services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginComponent implements OnInit {
  user;

  constructor(private httpClient: HttpClient,
              private authService : AuthService,
              private router : Router) { }

  ngOnInit(): void {
    this.user = new FormGroup({
      email : new FormControl(''),
      password : new FormControl('')
    })
  }

  onSubmit() {
    this.authService.login(this.user.value).subscribe((res) => {
      this.authService.setToken(res.token);
      this.authService.setId(res.id);
      this.authService.setRole(res.role);
      this.router.navigate([`/${res.role}`])
    });
  }
}
