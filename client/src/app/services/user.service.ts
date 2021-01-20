import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:3000'
   }
  postOnBlog(data:string):any{
    return this.http.post(`${this.ROOT_URL}/blogpost`,{data});
  }

  createUser(name: string, email:string, password: string,confPass:string,posts: any){
    return this.http.post(`${this.ROOT_URL}/signup`,{name, email, password, confPass, posts});
  }

  // metode pt useri : getUser, getUsers ...

}
