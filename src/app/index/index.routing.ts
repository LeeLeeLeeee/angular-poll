import { SignComponent } from "./sign/sign.component";
import { Routes } from "@angular/router";

import { MainComponent } from "../layouts/main/main.component";
import { IndexComponent } from "./index.component";
import { ProjectComponent } from "../layouts/project/project.component";
import { AnalysisComponent } from "../layouts/analysis/analysis.component";
import { ScheduleComponent } from "../layouts/schedule/schedule.component";
import { TaskManageComponent } from "../layouts/task-manage/task-manage.component";

export const IndexRoutes: Routes = [
  {
    path: "",
    component:IndexComponent,
    children: [
      {
        path: "",
        pathMatch:"full",
        redirectTo: "dashboard"
      },
      {
        path: "dashboard",
        component: MainComponent
      },
      {
        path: "project",
        loadChildren: () => import('../layouts/project/project.module').then(m => m.ProjectModule)
      },
      {
        path: "analysis",
        component: AnalysisComponent
      },
      {
        path: "schedule",
        component: ScheduleComponent
      },
      {
        path: "taskManage",
        component: TaskManageComponent
      },
    ]
  }
];
