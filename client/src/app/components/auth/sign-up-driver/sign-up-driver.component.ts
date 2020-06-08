import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-sign-up-driver',
  templateUrl: './sign-up-driver.component.html',
  styleUrls: ['./sign-up-driver.component.css']
})
export class SignUpDriverComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }
  user = {
    first_name : '',
    last_name : '',
    email : '',
    password : '',
    gender : ''
  };

  ngOnInit(): void {
  }
  onSubmit(data: any): void {
    const user = data.user;
    fetch('http://localhost:8200/auth/signup', {
      method : 'POST',
      headers : {
        'content-type': 'application/json',
      },
      body : JSON.stringify(user)
    })
    .then(res => res.json())
      // tslint:disable-next-line:no-shadowed-variable
    .then(data => {
      window.location.href = `http://localhost:4200/login`;
    })
    .catch(err => {console.log(err); });

  }
}
