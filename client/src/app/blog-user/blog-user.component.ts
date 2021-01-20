import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BlogService } from '../services/blog.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-blog-user',
  templateUrl: './blog-user.component.html',
  styleUrls: ['./blog-user.component.css']
})
export class BlogUserComponent implements OnInit {

  currentUser: any;
  error: any;

  public items: Array<any> = [];
  constructor(private userService: UserService, private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.all().subscribe((result:Array<any>) => {
      this.items = [...result];
    })
  }

  onPost(form: NgForm){
    const post = form.value.post;
    if (post.length == 0)
    {
      this.error = "You can't post an empty string";
      return ;
    }
    this.userService.postOnBlog(post).subscribe((result:any) => {
      if(result === true){
        window.location.reload();
      }
      else{
        this.error = result.message;
        return;
      }
    })
  }

}
