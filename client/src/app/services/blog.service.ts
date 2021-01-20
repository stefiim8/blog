import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:3000/posts'
   }

  
  all (){
    return this.http.get(`${this.ROOT_URL}`);
  }

  get (id: string){
    return this.http.get(`${this.ROOT_URL}/${id}`);
  }

  post(data){
    return this.http.post(`${this.ROOT_URL}`, data);
  }

  patch(id: string, data){
    return this.http.put(`${this.ROOT_URL}/${id}`, data);
  }

  delete(id: string){
    return this.http.delete(`${this.ROOT_URL}/${id}`);
  }
}
