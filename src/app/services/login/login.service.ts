import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  status = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  login(loginform){
    return this.http.post('http://localhost:5000/login',loginform);
  }

  register(registerform){
    return this.http.post('http://localhost:5000/register',registerform);
  }

  createPost(post){
    return this.http.post('http://localhost:5000/posts',post);
  }

  notifyNavbar(loggedIn:boolean){
    this.status.next(loggedIn);
  }

  checkUserStatus(){
    return sessionStorage.token;
  }

  getPosts(){
    return this.http.get(`http://localhost:5000/posts/${sessionStorage.user.username}`);
  }

}
