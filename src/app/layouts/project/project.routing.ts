import { Routes } from "@angular/router";
import { AddComponent } from "./add/add.component";
import { DetailComponent } from "./detail/detail.component";
import { EditComponent } from "./edit/edit.component";
import { ListComponent } from "./list/list.component";
import { ProjectComponent } from "./project.component";
import { SurveyComponent } from "./survey/survey.component";


export const ProjectRoutes: Routes = [
  {
    path:"",
    component:ProjectComponent,
    children: [
      {
        path: "",
        component:ListComponent
      },
      {
        path:"create",
        component:AddComponent,
      },
      {
        path:":id",
        component:DetailComponent
      },
      {
        path:":projectId/:taskId",
        component:SurveyComponent
      }
    ]
  },
  { path: '**', component: ListComponent }
];
