import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../services/login/login.service';
//import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register:any = {};

  constructor(private loginService: LoginService,  private router : Router) { }

  ngOnInit() {
  }

  registerFn() {
    this.loginService.register(this.register).subscribe(()=>{
      this.router.navigateByUrl('/login');
  });

  }

}
