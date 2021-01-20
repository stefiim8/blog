import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userForm: FormGroup;
  message: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onSignUp(form: NgForm)
  {
    const name = form.value.name;
    const email = form.value.email;
    const password = form.value.password;
    const confPass = form.value.confPassword;
    const posts = [];
    form.reset();
    this.userService.createUser(name,email,password,confPass,posts).subscribe( (result:any) => {
      this.message = result;      
      if(result.existingEmail === true){
        this.message = 'email';
      }      
      else
      {
        if(result.samePassword === false)
          this.message = 'pass';
        else
          this.message = 'ok';
      }
    });
  }

}
