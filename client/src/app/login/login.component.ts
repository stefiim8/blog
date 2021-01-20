import { stringify } from '@angular/compiler/src/util';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('email') emailInput: ElementRef;
  @ViewChild('password') passInput: ElementRef;
  error: any;
  isLoggedIn = false;
  

  constructor(private tokenStorageService: TokenStorageService, private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    if(this.tokenStorageService.getToken()){
      this.isLoggedIn = true;
    }
  }

  onLogin(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    return this.authService.login(email,password).subscribe( (result:any) => {
      if(result.answer !== false){
        this.tokenStorageService.saveToken(result.accesToken);
        this.tokenStorageService.saveUser(result);
        console.log(result.accesToken);

        this.isLoggedIn = true;
        this.router.navigate(['blog']).then(() => {
          window.location.reload();
        });
      }
      else{
        this.error=true;
        form.reset();
      }
      
    })
  }

}
