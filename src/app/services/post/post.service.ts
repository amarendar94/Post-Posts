import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  createPost(post){
    return this.http.post('http://localhost:5000/posts',post)
  }

  getPosts(){
    return this.http.get('http://localhost:5000/posts/'+'amarendar94');
  }
}
