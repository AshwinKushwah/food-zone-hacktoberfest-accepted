import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl : './auth.component.html',
})
export class AuthComponent {
  isloginMode = true ;
  isloading = false;
  error:string = null;


  constructor(private authService : AuthService, private router : Router) {}  
  onSwitchMode() {
    this.isloginMode = !this.isloginMode;
  }

  onSubmit(form : NgForm) {
    if(!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.isloading = true;

    let authObs : Observable<AuthResponseData>;

    if(this.isloginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.singup(email, password);
    }
    authObs.subscribe(resData => {
      console.log(resData);
      this.isloading = false;
      this.router.navigate(['./recipes']);
    }, errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage;
      this.isloading = false;
    });
   // console.log(form.value);
    form.reset(); 
  }
}