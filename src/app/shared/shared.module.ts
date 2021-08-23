import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToggleComponent } from './components/toggle/toggle.component';
import { PagingComponent } from './components/paging/paging.component';
import { InputComponent } from './components/input/input.component';
import { InputDirective } from './directive/input.directive';
import { MonthPipe } from './pipes/month.pipe';
import { CalendarInputComponent } from './components/calendar-input/calendar-input.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [
    ToggleComponent,
    PagingComponent,
    InputComponent,
    InputDirective,
    MonthPipe,
    CalendarInputComponent,
    ButtonComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ToggleComponent,
    PagingComponent,
    InputComponent,
    CalendarInputComponent,
    ButtonComponent,
    MonthPipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[CookieService]
})
export class SharedModule { }
