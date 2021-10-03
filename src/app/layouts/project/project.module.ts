import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectRoutes } from './project.routing';
import { DetailComponent } from './detail/detail.component';
import { ProjectComponent } from './project.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SurveyComponent } from './survey/survey.component';
import { LogicComponent } from './survey/logic/logic.component';
import { ToolComponent } from './survey/tool/tool.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    DetailComponent,
    ProjectComponent,
    ListComponent,
    AddComponent,
    EditComponent,
    SurveyComponent,
    LogicComponent,
    ToolComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ProjectRoutes),
    NgxChartsModule,
    SharedModule,
    ReactiveFormsModule,
    

  ]
})
export class ProjectModule { }
