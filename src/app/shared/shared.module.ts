import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToggleComponent } from './components/toggle/toggle.component';
import { PagingComponent } from './components/paging/paging.component';
import { InputComponent } from './components/input/input.component';
import { InputDirective } from './directive/input.directive';
import { MonthPipe } from './pipes/month.pipe';
import { CalendarInputComponent } from './components/calendar-input/calendar-input.component';
import { ButtonComponent } from './components/button/button.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenService } from './services/token.validation.service';
import { LoggingService } from './services/logging.service';
import { ImgButtonComponent } from './components/img-button/img-button.component';
import { ImgButtonListComponent } from './components/img-button-list/img-button-list.component';
import { SelectComponent } from './components/select/select.component';
import { IconDirective } from './directive/icon.directive';
import { ToggleBoxDirective } from './directive/toggle-box.directive';
import { TitleFormComponent } from './components/question-folder/title-form/title-form.component';
import { ExampleFormComponent } from './components/question-folder/example-form/example-form.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';

@NgModule({
  declarations: [
    ToggleComponent,
    PagingComponent,
    InputComponent,
    InputDirective,
    MonthPipe,
    CalendarInputComponent,
    ButtonComponent,
    ImgButtonComponent,
    ImgButtonListComponent,
    SelectComponent,
    IconDirective,
    ToggleBoxDirective,
    TitleFormComponent,
    ExampleFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    KeyboardShortcutsModule.forRoot()
  ],
  exports: [
    ToggleComponent,
    PagingComponent,
    InputComponent,
    CalendarInputComponent,
    ButtonComponent,
    ImgButtonComponent,
    ImgButtonListComponent,
    SelectComponent,
    MonthPipe,
    IconDirective,
    ToggleBoxDirective,
    TitleFormComponent,
    ExampleFormComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenService, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: LoggingService, multi: true},
  ]
})
export class SharedModule { }
