import { LoginService } from './login/login.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor,HttpHeaders } from '@angular/common/http'

@Injectable()
export class AuthinterceptorService implements HttpInterceptor {

  constructor(private loginService : LoginService) { }

  intercept(req, next){
    var token = this.loginService.checkUserStatus() || "invalid token";
    console.log("token value" ,token)
    var authRequest = req.clone({
      headers : new HttpHeaders().set('authtoken',token)
    });
    console.log("auth req" , authRequest)
    return next.handle(authRequest);
  }
}
