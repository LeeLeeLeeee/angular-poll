import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IndexRoutes } from './index.routing';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index.component';
import { LoginModule } from './login/login.module';



@NgModule({
  declarations: [LoginComponent, IndexComponent],
  schemas: [NO_ERRORS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule.forChild(IndexRoutes),
    LoginModule,
  ]
})
export class IndexModule { }
