import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../user-sidebar/user-sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { SocketIoService } from '../../../services/socket-io.service';
import { tick } from '@angular/core/testing';

import {UserProfileService} from "../../../services/user-profile.service"

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})

export class UserNavbarComponent implements OnInit {
  private name : string = "Amir Ben Youssef"
  public focus;
  public listTitles: any[];
  public location: Location;
  public socket;
  public notifications = [];
  public notification = 0;

  constructor( location: Location,  
              private element: ElementRef, 
              private router: Router, 
              public authService: AuthService,
              private socketIoService : SocketIoService,
              public userProfileService : UserProfileService) {
      this.location = location;
  }

  getNotification(){
    this.socketIoService.getNotification().subscribe(response =>{
      this.notifications = response.notifications;
      if(this.notifications.length > 0){
        alert('driver accepted your announcement')
        alert(this.notifications.length)
      }
    });
    
  }

  ngOnInit() {
    this.getNotification();
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    
    this.socket = this.socketIoService.setupSocketConnection().on('notification', (data)=>{
      this.notification += 1;
      this.getNotification();
      console.log (this.notification);
    });
    this.getname()
  }


  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }


  logout(){
    this.authService.logout()
  }

  getname(){
    let id = localStorage.getItem('id');
    this.userProfileService.fetchData(id).subscribe(res => {
      console.log(res)
      this.name = res["user"].first_name
    })
  }

  deletNotf(){
    this.notification = 0;
  }
}
