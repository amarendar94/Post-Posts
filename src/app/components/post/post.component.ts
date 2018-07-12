import { PostService } from './../../services/post/post.service';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post:any = {}

  constructor(private postService: PostService, private router : Router) { }

  ngOnInit() {
  }

  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  postFn() {
    if (this.post.title && this.post.description) {
        this.post.username = "amarendar94";
        this.postService.createPost(this.post).subscribe((post)=>{
          this.router.navigateByUrl('/posts');
      });
    }
  }

}
