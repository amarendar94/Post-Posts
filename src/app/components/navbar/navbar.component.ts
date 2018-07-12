import { LoginService } from './../../services/login/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedIn = true;

  constructor(private loginService:LoginService) { }

  ngOnInit() {
    this.loginService.status.subscribe(status=>{
      console.log(status);
      this.loggedIn=status
    });
  }

  logout(){
    sessionStorage.user = {};
    this.loggedIn = false;
  }

}
