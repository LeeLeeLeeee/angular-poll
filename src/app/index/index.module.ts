import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { RouterModule } from '@angular/router';
import { IndexRoutes } from './index.routing';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';



@NgModule({
  declarations: [IndexComponent,  SideMenuComponent, TopNavigationComponent],
  schemas: [NO_ERRORS_SCHEMA],
  imports: [
    CommonModule,
    RouterModule.forChild(IndexRoutes),
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule
  ]
})
export class IndexModule { }
