import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service'


export interface SignInForm {
  user_id: string,
  password : string
}


export interface SignInValidator {
  email: boolean,
  password : boolean
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinClick : SignInValidator;

  constructor(private router: Router, private authService: AuthService) { 
    this.signinClick = {
      email: false,
      password: false
    };
  } 

  ngOnInit(): void {}

  goToSignup(e: MouseEvent) {
    e.preventDefault()
    this.router.navigate(["/login/signup"])
  }

  signInWithEmail(loginForm: NgForm) {
    const controls = loginForm.form.controls;
    
    this.signinClick.email = !controls.user_id.valid
    this.signinClick.password = !controls.password.valid
    
    if( !(this.signinClick.email || this.signinClick.password) ) {
      const signInInfo : SignInForm = loginForm.value as SignInForm;
      this.authService
        .signInService(signInInfo)
        .subscribe(msg => console.log(msg))
    }
  }
}
