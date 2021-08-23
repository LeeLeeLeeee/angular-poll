import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { SignRoutes } from './sign.routing';



@NgModule({
  declarations: [SigninComponent, SignupComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(SignRoutes),
    ReactiveFormsModule,
  ]
})
export class SignModule { }
