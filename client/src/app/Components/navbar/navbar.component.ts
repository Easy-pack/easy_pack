import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
@HostListener('window:scroll', ['$event'])
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}


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
