import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SignUpDriverComponent } from './components/auth/sign-up-driver/sign-up-driver.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { CallToActionComponent } from './components/call to action block/call-to-action/call-to-action.component';
import { AboutComponent } from './components/about/about.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { TeamComponent } from './components/team/team.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginDriverComponent } from './components/auth/login-driver/login-driver.component';
import { LoginComponent } from './components/auth/login/login-user.component';
import { SignupUserComponent } from './components/auth/signup-user/signup-user.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpDriverComponent,
    NavbarComponent,
    CallToActionComponent,
    AboutComponent,
    HowItWorksComponent,
    TeamComponent,
    HomeComponent,
    FooterComponent,
    LoginDriverComponent,
    LoginComponent,
    SignupUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
