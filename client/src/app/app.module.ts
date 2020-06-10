import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { SignUpDriverComponent } from './components/auth/sign-up-driver/sign-up-driver.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CallToActionComponent } from './components/call to action block/call-to-action.component';
import { AboutComponent } from './components/about/about.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { TeamComponent } from './components/team/team.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginDriverComponent } from './components/auth/login-driver/login-driver.component';
import { LoginComponent } from './components/auth/login/login-user.component';
import { SignupUserComponent } from './components/auth/signup-user/signup-user.component';
import { HomeComponent } from './components/home/home.component';
import {AvailabilityDirective} from './directives/availability/availability.directive';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
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
    SignupUserComponent,
    AvailabilityDirective,
  ],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule { }
