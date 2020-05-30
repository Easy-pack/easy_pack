import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private httpClient: HttpClient
    ) { }

ngOnInit(): void {
}
user = {
email : '',
password : ''
}
onSubmit(data:any) { 
let user = data.value.user; 
fetch('http://localhost:8200/auth/signin', {
method : 'POST',
headers : {
'content-type':'application/json',
},
body : JSON.stringify(user) 
})
.then(res => {return res.json()})
.then(data => {

window.location.href = `http://localhost:4200/profile`
})
.catch(err =>{console.log(err)})
}
}
