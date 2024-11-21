import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  menuOpen: boolean = false; // Variable to control the state of the list


  toggleMenu() {
    this.menuOpen = !this.menuOpen;// Switch state between true and false
  }

}
