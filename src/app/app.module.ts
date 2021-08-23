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
import { ProjectComponent } from './layouts/project/project.component';
import { AnalysisComponent } from './layouts/analysis/analysis.component';
import { ScheduleComponent } from './layouts/schedule/schedule.component';
import { TaskManageComponent } from './layouts/task-manage/task-manage.component';
import { ListComponent } from './layouts/project/list/list.component';
import { AddComponent } from './layouts/project/add/add.component';
import { EditComponent } from './layouts/project/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    SignComponent,
    ProjectComponent,
    AnalysisComponent,
    ScheduleComponent,
    TaskManageComponent,
    ListComponent,
    AddComponent,
    EditComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
