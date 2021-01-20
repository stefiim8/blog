import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  isLoggedIn = false;
  name: string;
  token: any;
  subscription: Subscription;

  constructor(private tokenStorageService: TokenStorageService,private authService: AuthService){

  }

  ngOnInit(){
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if(this.isLoggedIn){
      const user = this.tokenStorageService.getUser();
      this.name = user.name;
      this.token = this.tokenStorageService.getToken();
    }
    this.authService.authChanged.subscribe(data => {
      this.isLoggedIn = data;
    })
  }
  onLogout(){
    this.authService.logout();
  }

}
