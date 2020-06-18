import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'board', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: 'profile', title: 'User profile',  icon: 'ni-single-02 text-yellow', class: '' },
    { path: 'history', title: 'History',  icon: 'ni-books text-warning', class: '' },
    { path: 'addTransaction', title: 'Add transaction',  icon: 'ni-notification-70 text-success', class: '' }
];

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})

export class UserSidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(public authService: AuthService,private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
  logout(){
    this.authService.logout()
  }
}
