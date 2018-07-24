import { LoginService } from './../../services/login/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedIn = false;

  constructor(private loginService:LoginService) { }

  ngOnInit() {
    if(this.loginService.checkUserStatus()){
      this.loggedIn = true;
    }
    this.loginService.status.subscribe(status=>{
      this.loggedIn=status
    });
  }

  logout(){
    sessionStorage.clear();
    this.loginService.notifyNavbar(false);
  }

}
