import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl : './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  isloginMode = true ;
  isloading = false;
  error:string = null;
  @ViewChild(PlaceholderDirective, {static:false}) alertHost : PlaceholderDirective;

  private closeSub : Subscription;

  constructor(
    private authService : AuthService, 
    private router : Router,
    private componentFactoryResolver : ComponentFactoryResolver
    ) {}  

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
      this.showErrorAlert(errorMessage);
      this.isloading = false;
    });
   // console.log(form.value);
    form.reset(); 
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string){
  //  const alertCmp = new AlertComponent();
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef= this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });

  }

  ngOnDestroy(){
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }
}