import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  id: string;
  isLoggedIn: boolean;
  email:string;
  name:string;
  posts: Array<any>;
  authChanged: EventEmitter<any> = new EventEmitter();


  readonly ROOT_URL;

  constructor(private http: HttpClient,private tokenStorageService: TokenStorageService,private router: Router) {
    this.ROOT_URL = 'http://localhost:3000'
   }


  getData(){
    return this;
  }

  onLogout(){
    this.id = this.isLoggedIn = this.email = this.name = null;
    this.posts = [];
  }

  logout(){
    this.authChanged.emit(false);
    this.tokenStorageService.clear();
    this.router.navigate(['/login'])
    return this.http.post(`${this.ROOT_URL}/logout`,null);
  }


  login(email:string , password: string){
    this.authChanged.emit(true);
    return this.http.post(`${this.ROOT_URL}/login`,{email,password})
  }

  verifyUser(id:string){
    return this.http.post(`${this.ROOT_URL}/verify`,null);
  }
  
}
