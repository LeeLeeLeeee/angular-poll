import { Routes } from "@angular/router";
import { AddComponent } from "./add/add.component";
import { EditComponent } from "./edit/edit.component";
import { ListComponent } from "./list/list.component";
import { ProjectComponent } from "./project.component";


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
        component:EditComponent
      },
    ]
  },
  { path: '**', component: ListComponent }
];
