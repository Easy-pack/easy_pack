import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SignUpDriverComponent } from './components/auth/sign-up-driver/sign-up-driver.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VerticalNavbarComponent } from './components/vertical-navbar/vertical-navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpDriverComponent,
    VerticalNavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
