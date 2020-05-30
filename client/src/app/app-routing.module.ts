import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SignUpDriverComponent} from './components/auth/sign-up-driver/sign-up-driver.component';
import {LoginDriverComponent} from './components/auth/login-driver/login-driver.component';
import {SignupUserComponent} from './components/auth/signup-user/signup-user.component';
import {LoginComponent} from './components/auth/login/login-user.component';
import {HomeComponent} from './components/home/home.component';
const routes: Routes = [
  {path: '', component:HomeComponent},
  {path : 'signup/driver', component: SignUpDriverComponent},
  {path : 'login', component: LoginComponent},
  {path : 'signup/user', component: SignupUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
