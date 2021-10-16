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
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { QuestionComponent } from './survey/question/question.component';
import { TestQuestionComponent } from './survey/test-question/test-question.component';
import { QuotaComponent } from './survey/quota/quota.component';
import { SingleComponent, SingleOptionComponent } from './survey/question/single/single.component';


@NgModule({
  declarations: [
    DetailComponent,
    ProjectComponent,
    ListComponent,
    AddComponent,
    EditComponent,
    SurveyComponent,
    QuestionComponent,
    TestQuestionComponent,
    QuotaComponent,
    SingleComponent,
    SingleOptionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ProjectRoutes),
    NgxChartsModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class ProjectModule { }
