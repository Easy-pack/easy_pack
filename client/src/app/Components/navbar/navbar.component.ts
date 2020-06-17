import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { Router, RouterModule } from "@angular/router";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
@HostListener('window:scroll', ['$event'])
export class NavbarComponent implements OnInit {
  public isCollapsed = true;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }


  onWindowScroll(e) {
      let element = document.querySelector('.navbar');
      console.log(element)
      if (window.pageYOffset > element.clientHeight) {
        element.classList.add('navbar-inverse');
      } else {
        element.classList.remove('navbar-inverse');
      }
    }
}
