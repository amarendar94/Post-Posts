import { LoginService } from './../../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login:any = {};

  constructor(private loginService:LoginService,  private router : Router) { }

  ngOnInit() {
  }

  loginFn(){
    this.loginService.login(this.login).subscribe((res:any)=>{
      if(res.loggedIn){
        sessionStorage.user = res.user;
        this.router.navigateByUrl('/home');
        this.loginService.notifyNavbar(res.loggedIn);
      }
      else{
        this.loginService.notifyNavbar(res.loggedIn);
      }
      
  });
}
}
