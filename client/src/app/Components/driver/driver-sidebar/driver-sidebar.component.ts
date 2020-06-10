import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'board', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: 'profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: 'history', title: 'History',  icon:'ni-cart text-warning', class: '' },
    { path: 'announcement', title: 'Announcement',  icon:'ni-delivery-fast text-success', class: '' }
];

@Component({
  selector: 'app-driver-sidebar',
  templateUrl: './driver-sidebar.component.html',
  styleUrls: ['./driver-sidebar.component.css']
})
export class DriverSidebarComponent implements OnInit {
  
  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
