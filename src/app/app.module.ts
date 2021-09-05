import { NgModule, TemplateRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexModule } from './index/index.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { SignComponent } from './index/sign/sign.component';
import { SignModule } from './index/sign/sign.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnalysisComponent } from './layouts/analysis/analysis.component';
import { ScheduleComponent } from './layouts/schedule/schedule.component';
import { TaskManageComponent } from './layouts/task-manage/task-manage.component';
import { ProjectModule } from './layouts/project/project.module';
import { ProjectComponent } from './layouts/project/project.component';


@NgModule({
  declarations: [
    AppComponent,
    SignComponent,
    AnalysisComponent,
    ScheduleComponent,
    TaskManageComponent,
    
  ],
  imports: [
    AppRoutingModule,
    IndexModule,
    SharedModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SignModule,
    BrowserAnimationsModule,
    ProjectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
